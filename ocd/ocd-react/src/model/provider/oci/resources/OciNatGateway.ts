/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciNatGateway"

export interface OciNatGateway extends AutoGenerated.OciNatGateway {}

export namespace OciNatGateway {
    export function newResource(type?: string): OciNatGateway {
        return {
            ...AutoGenerated.OciNatGateway.newResource('nat_gateway'),
        }
    }
    export function cloneResource(resource: OciNatGateway, type?: string): OciNatGateway {
        return {
            ...AutoGenerated.OciNatGateway.cloneResource(resource, 'nat_gateway'),
        }
    }
    
}

export class OciNatGatewayClient {
    static new(): OciNatGateway {
        return OciNatGateway.newResource()
    }
    static clone(resource: OciNatGateway): OciNatGateway {
        return OciNatGateway.cloneResource(resource)
    }
}

export default OciNatGatewayClient
