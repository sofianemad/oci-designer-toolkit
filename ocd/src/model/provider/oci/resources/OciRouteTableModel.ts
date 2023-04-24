/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciRouteTableModel"

export interface OciRouteTableModel extends AutoGenerated.OciRouteTableModel {}

export interface OciRouteRulesModel extends AutoGenerated.OciRouteRulesModel {}

export namespace OciRouteTableModel {
    export function newResource(type?: string): OciRouteTableModel {
        return {
            ...AutoGenerated.OciRouteTableModel.newResource('route_table'),
        }
    }
    
    export function newOciRouteRulesModel(): OciRouteRulesModel {
        return {
            ...AutoGenerated.OciRouteTableModel.newOciRouteRulesModel(),
        }
    }

}

export class OciRouteTableModelClient {
    static new(): OciRouteTableModel {
        return OciRouteTableModel.newResource()
    }
}

export default OciRouteTableModelClient
