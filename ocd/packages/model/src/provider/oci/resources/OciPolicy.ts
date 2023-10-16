/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciPolicy"

export interface OciPolicy extends AutoGenerated.OciPolicy {}

export namespace OciPolicy {
    
    export function newResource(type?: string): OciPolicy {
        return {
            ...AutoGenerated.OciPolicy.newResource('policy'),
        }
    }
    export function cloneResource(resource: OciPolicy, type?: string): OciPolicy {
        return AutoGenerated.OciPolicy.cloneResource(resource, 'policy') as OciPolicy
    }
    export function allowedParentTypes(): string[] {
        console.debug('OciPolicy: Allowed Parent Types')
        return []
    }
    export function getParentId(resource: OciPolicy): string {
        console.debug('OciPolicy: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.compartmentId
    }
    export function setParentId(resource: OciPolicy, parentId: string): OciPolicy {
        console.debug('OciPolicy: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        return resource
    }
    export function getConnectionIds(resource: OciPolicy): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        console.debug('OciPolicy: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
}

export class OciPolicyClient {
    static new(): OciPolicy {
        return OciPolicy.newResource()
    }
    static clone(resource: OciPolicy): OciPolicy {
        return OciPolicy.cloneResource(resource)
    }
}

export default OciPolicyClient