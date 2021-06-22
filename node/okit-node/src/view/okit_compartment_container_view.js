'use babel'
/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

/*
** Author: Andrew Hopkinson
*/

import * as okit_resources from '../resources/resources.js'
import OkitView from './okit_view.js'

class OkitCompartmentContainerView extends OkitView {
    container_children = {}
    container_child_offset = {}
    // ---- Padding
    padding_top = 60
    padding_right = 60
    padding_bottom = 60
    padding_left = 60
    // ---- Spacing
    spacing_dx = 20
    spacing_dy = 20
    icon_height = 45
    icon_width = 45

    autoLayout() {
        // Reset Coordinates
        this.newCoords()
        // Find Container Resources
        const containers = this.all_resources.filter(r => r instanceof okit_resources.OkitContainerResource)
        const simple = this.all_resources.filter(r => !(r instanceof okit_resources.OkitContainerResource) && r instanceof okit_resources.OkitResource)
        // Process Simple Resource first to calculate Width & Height
        simple.forEach(resource => this.coords[resource.id] = {x: 0, y: 0, width: this.icon_width, height: this.icon_height, parent_id: resource.parent_id})
        // Process Container Resources
        containers.forEach(resource => this.coords[resource.id] = {x: 0, y: 0, ...resource.dimensions, parent_id: resource.parent_id})
        // Build Container Children Arrays
        containers.forEach(resource => this.buildChildrenArrays(resource))
        // Calculate First Offset for Container
        containers.forEach(resource => this.getFirstOffsets(resource))
        // Calculate Simple Offsets within Container
        simple.forEach(resource => this.getChildOffset(resource))

        console.info(this.coords)
    }

    buildChildrenArrays(resource) {
        const children = resource.children
        const resource_children = this.container_children[resource.id] ? this.container_children[resource.id] : {
            top_edge_children: children.filter(child => resource.top_edge_children.includes(child.constructor.name)),
            top_children: children.filter(child => resource.top_children.includes(child.constructor.name)),
            container_children: children.filter(child => resource.container_children.includes(child.constructor.name)),
            bottom_children: children.filter(child => resource.bottom_children.includes(child.constructor.name)),
            bottom_edge_children: children.filter(child => resource.bottom_edge_children.includes(child.constructor.name)),
            left_edge_children: children.filter(child => resource.left_edge_children.includes(child.constructor.name)),
            left_children: children.filter(child => resource.left_children.includes(child.constructor.name)),
            right_children: children.filter(child => resource.right_children.includes(child.constructor.name)),
            right_edge_children: children.filter(child => resource.right_edge_children.includes(child.constructor.name))
        }
        this.container_children[resource.id] = resource_children
        // console.info(resource.constructor.name, resource.display_name, this.container_children[resource.id])
    }

    getFirstOffsets(resource) {
        const children = this.container_children[resource.id]
        const child_offsets = this.container_child_offset[resource.id] ? this.container_child_offset[resource.id] : {
            top_edge_offset: {
                dx: this.padding_left * 2, 
                dy: 0
            },
            top_offset: {
                dx: children.left_children.length > 0 ? (this.padding_left + this.icon_width + this.spacing_dx) : this.padding_left, 
                dy: this.padding_top
            },
            container_offset: {
                dx: children.left_children.length > 0 ? (this.padding_left + this.icon_width + this.spacing_dx) : this.padding_left,
                dy: children.top_children.length > 0 ? (this.padding_top + this.icon_height + this.spacing_dy) : this.padding_top
            },
            bottom_offset: resource.first_bottom_offset,
            bottom_edge_offset: resource.first_bottom_edge_offset,
            left_edge_offset: {
                dx: 0, 
                dy: this.padding_top * 2
            },
            left_offset: {
                dx: this.padding_left, 
                dy: this.padding_top * 2
            },
            right_offset: resource.first_right_offset,
            right_edge_offset: resource.first_right_edge_offset
        }
        this.container_child_offset[resource.id] = child_offsets
        console.info(resource.constructor.name, resource.display_name, this.container_child_offset[resource.id])
    }

    getChildOffset(resource) {
        const parent_id = resource.parent_id
        const id = resource.id
        const coords = this.coords[resource.id]
        const parent_children = this.container_children[parent_id]
        const child_offsets = this.container_child_offset[parent_id]
        if (parent_children.top_edge_children.filter(child => child.id === id)) {
            coords.x = child_offsets.top_edge_offset.dx
            coords.y = child_offsets.top_edge_offset.dy
            // Increment Offset
            child_offsets.top_edge_offset.dx += (coords.width + resource.spacing_dx)
        }
        else if (parent_children.top_children.filter(child => child.id === id)) {
            coords.x = child_offsets.top_offset.dx
            coords.y = child_offsets.top_offset.dy
            // Increment Offset
            child_offsets.top_offset.dx += (coords.width + resource.spacing_dx)
        }
        else if (parent_children.container_children.filter(child => child.id === id)) {
            coords.x = child_offsets.container_offset.dx
            coords.y = child_offsets.container_offset.dy
            // Increment Offset
            child_offsets.container_offset.dy += (coords.height + resource.spacing_dy)
        }
        else if (parent_children.bottom_children.filter(child => child.id === id)) {
            coords.x = child_offsets.bottom_offset.dx
            coords.y = child_offsets.bottom_offset.dy
            // Increment Offset
            child_offsets.bottom_offset.dx += (coords.width + resource.spacing_dx)
        }
        else if (parent_children.bottom_edge_children.filter(child => child.id === id)) {
            coords.x = child_offsets.bottom_edge_children.dx
            coords.y = child_offsets.bottom_edge_children.dy
            // Increment Offset
            child_offsets.bottom_edge_children.dx += (coords.width + resource.spacing_dx)
        }
        else if (parent_children.left_edge_children.filter(child => child.id === id)) {
            coords.x = child_offsets.left_edge_offset.dx
            coords.y = child_offsets.left_edge_offset.dy
            // Increment Offset
            child_offsets.left_edge_offset.dy += (coords.height + resource.spacing_dy)
        }
        else if (parent_children.left_children.filter(child => child.id === id)) {
            coords.x = child_offsets.left_offset.dx
            coords.y = child_offsets.left_offset.dy
            // Increment Offset
            child_offsets.left_offset.dy += (coords.height + resource.spacing_dy)
        }
        else if (parent_children.right_children.filter(child => child.id === id)) {
            coords.x = child_offsets.right_offset.dx
            coords.y = child_offsets.right_offset.dy
            // Increment Offset
            child_offsets.right_offset.dy += (coords.height + resource.spacing_dy)
        }
        else if (parent_children.right_edge_children.filter(child => child.id === id)) {
            coords.x = child_offsets.right_edge_offset.dx
            coords.y = child_offsets.right_edge_offset.dy
            // Increment Offset
            child_offsets.right_edge_offset.dy += (coords.height + resource.spacing_dy)
        }
    }
}

export default OkitCompartmentContainerView
// export { OkitCompartmentContainerView }
