/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciServiceGatewayModel"

export interface OciServiceGatewayModel extends AutoGenerated.OciServiceGatewayModel {}

export interface OciServicesModel extends AutoGenerated.OciServicesModel {}

export namespace OciServiceGatewayModel {
    export function newResource(type?: string): OciServiceGatewayModel {
        return {
            ...AutoGenerated.OciServiceGatewayModel.newResource('service_gateway'),
        }
    }
    
    export function newOciServicesModel(): OciServicesModel {
        return {
            ...AutoGenerated.OciServiceGatewayModel.newOciServicesModel(),
        }
    }

}

export class OciServiceGatewayModelClient {
    static new(): OciServiceGatewayModel {
        return OciServiceGatewayModel.newResource()
    }
}

export default OciServiceGatewayModelClient
