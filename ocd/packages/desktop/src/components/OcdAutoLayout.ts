/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { v4 as uuidv4 } from 'uuid'
import { OcdDesign, OcdViewCoords, OcdResources, OciResources, OcdResource, OciResource } from '@ocd/model'
import { OcdUtils } from '@ocd/core'

export class OcdAutoLayout {
    coords: OcdViewCoords[]
    design: OcdDesign
    maxColumns = 5
    spacing = 32
    detailedWidth = 150
    simpleWidth = 32
    simpleHeight = 32
    containerWidth = 200
    containerHeight = 200
    // Specify Contains and their hierarchy. i.e. compartment -> vcn -> subnet
    containers: string[] = ['vcn', 'subnet']
    ignore: string[] = ['compartment']
    containerResources: OcdResources = {}
    simpleResources: OcdResources = {}
    uuid = () => `gid-${uuidv4()}`

    constructor(design: OcdDesign) {
        this.design = design
        this.coords = []
        this.containerResources = this.getContainerResources()
        // console.debug('OcdAutoLayout: Container Resources',this.containerResources)
        this.simpleResources = this.getSimpleResources()
        this.addContainerCoords()
        console.debug('OcdAutoLayout: Container Coords',this.coords)
        this.addSimpleCoords()
        console.debug('OcdAutoLayout: Added Simple Coords', this.coords)
    }

    // getResources(): OcdResource[] {return [...this.getOciResources()]}
    getResources() {return [...this.getOciResources()]}
    getResource(id='') {return this.getResources().find((r: OcdResource) => r.id === id)}
    getContainerResources(): OcdResources {return {...this.getOciContainerResources(this.design.model.oci.resources)}}
    getSimpleResources(): OcdResources {return {...this.getOciSimpleResources(this.design.model.oci.resources)}}

    getOciResources(): OciResource[] {return Object.values(this.design.model.oci.resources).filter((val) => Array.isArray(val)).reduce((a, v) => [...a, ...v], [])}
    getOciContainerResources(resources: OciResources): OciResources {return Object.keys(resources).filter(k => this.containers.includes(k) && !this.ignore.includes(k)).reduce((obj, key) => {return {...obj, [key]: resources[key]}}, {})}
    getOciSimpleResources(resources: OciResources): OciResources {return Object.keys(resources).filter(k => !this.containers.includes(k) && !this.ignore.includes(k)).reduce((obj, key) => {return {...obj, [key]: resources[key]}}, {})}

    addContainerCoords() {
        this.containers.forEach((c) => {
            const resources = this.containerResources[c]
            this.coords = resources ? [...this.coords, ...resources.map((r: OcdResource) => {
                const coords: OcdViewCoords = OcdDesign.newCoords()
                coords.ocid = r.id
                coords.pocid = this.getParentId(r.id)
                coords.w = this.containerWidth
                coords.h = this.containerHeight
                coords.title = OcdUtils.toTitle(c)
                coords.class = OcdUtils.toCssClassName(r.provider, c)
                coords.container = true
                return coords
            })] : this.coords
        })
    }

    addSimpleCoords() {
        this.coords = [...this.coords, ...Object.entries(this.simpleResources).reduce((a, [c, v]) => {
            return [...a, ...v.map((r) => {
                const coords: OcdViewCoords = OcdDesign.newCoords()
                coords.ocid = r.id
                coords.pocid = this.getParentId(r.id)
                coords.w = this.simpleWidth
                coords.h = this.simpleHeight
                coords.title = OcdUtils.toTitle(c)
                coords.class = OcdUtils.toCssClassName(r.provider, c)
                coords.container = false
                return coords
            })]
        }, [] as OcdViewCoords[])]
    }

    getParentId(ocid: string): string {
        const resource = this.getResource(ocid)
        const parentId: string = !resource ? 'Undefined' : (resource.provider === 'oci') ? OciResource.getParentId(resource) : ''
        return parentId
    }

    getChildren = (pocid: string) => this.coords.filter((c) => c.pocid === pocid)

    layout(detailed: boolean = true): OcdViewCoords[] {
        // Position Children in Container
        this.coords.filter((c) => c.container).reverse().forEach((coords) => {
            const children = this.getChildren(coords.ocid)
            let childX = this.spacing
            let childY = this.spacing + this.simpleHeight
            let childCount = 0
            children.filter((c) => !c.container).forEach((child) => {
                childCount += 1
                if (childCount > this.maxColumns) {
                    childX = this.spacing
                    childY += (this.spacing + this.simpleHeight)
                    childCount = 0
                }
                child.x = childX
                child.y = childY
                // Add Spacing
                childX += (this.spacing + (detailed ? this.detailedWidth : this.simpleWidth) as number)
                // Size Container
                coords.w = Math.max(coords.w, (childX + this.spacing))
                coords.h = childY + this.spacing + this.simpleHeight
            })
            childX = this.spacing
            childY += (this.spacing + this.simpleHeight)
            children.filter((c) => c.container).forEach((child) => {
                child.x = childX
                child.y = childY
                // Add Spacing
                childY += (this.spacing + child.h)
                // Size Container
                coords.w = Math.max(coords.w, (child.w + (2 * this.spacing)))
                coords.h += (this.spacing + child.h)
            })
        })
        // Add Children to Parent Coords
        // console.debug('OcdAutoLayout: Coords', this.coords)
        this.coords.filter((c) => c.container).forEach((parent) => {
            const children = this.getChildren(parent.ocid)
            children.forEach((child) => {
                child.pgid = parent.id
                parent.coords ? parent.coords.push(child) : parent.coords = [child]
            })
        })
        // console.debug('OcdAutoLayout: Coords - Post Child Shuffle', this.coords)
        this.coords = this.coords.filter(c => c.pgid === '')
        // console.debug('OcdAutoLayout: Coords - Post Filter', this.coords)
        // Position Root Containers
        let childX = this.spacing
        let childY = this.spacing
        this.coords.reverse().forEach((child) => {
            child.x = childX
            child.y = childY
            // Add Spacing
            childY += (this.spacing + child.h)
        })
        // console.debug('OcdAutoLayout: Coords - Post Filter', this.coords)

        return this.coords
    }
}