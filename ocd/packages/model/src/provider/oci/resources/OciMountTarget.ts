/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciMountTarget"

export interface OciMountTarget extends AutoGenerated.OciMountTarget {}

export namespace OciMountTarget {
    
    export function newResource(type?: string): OciMountTarget {
        return {
            ...AutoGenerated.OciMountTarget.newResource('mount_target'),
        }
    }
    export function cloneResource(resource: OciMountTarget, type?: string): OciMountTarget {
        return AutoGenerated.OciMountTarget.cloneResource(resource, 'mount_target') as OciMountTarget
    }
    export function allowedParentTypes(): string[] {
        console.debug('OciMountTarget: Allowed Parent Types')
        return []
    }
    export function getParentId(resource: OciMountTarget): string {
        console.debug('OciMountTarget: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.compartmentId
    }
    export function setParentId(resource: OciMountTarget, parentId: string): OciMountTarget {
        console.debug('OciMountTarget: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        return resource
    }
    export function getConnectionIds(resource: OciMountTarget): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        console.debug('OciMountTarget: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
}

export class OciMountTargetClient {
    static new(): OciMountTarget {
        return OciMountTarget.newResource()
    }
    static clone(resource: OciMountTarget): OciMountTarget {
        return OciMountTarget.cloneResource(resource)
    }
}

export default OciMountTargetClient
