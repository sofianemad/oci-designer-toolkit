/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciNosqlTable"

export interface OciNosqlTable extends AutoGenerated.OciNosqlTable {}

export interface OciTableLimits extends AutoGenerated.OciTableLimits {}

export namespace OciNosqlTable {
    export function newResource(type?: string): OciNosqlTable {
        return {
            ...AutoGenerated.OciNosqlTable.newResource('nosql_table'),
        }
    }
    export function cloneResource(resource: OciNosqlTable, type?: string): OciNosqlTable {
        return {
            ...AutoGenerated.OciNosqlTable.cloneResource(resource, 'nosql_table'),
        }
    }
    
    export function newOciTableLimits(): OciTableLimits {
        return {
            ...AutoGenerated.OciNosqlTable.newOciTableLimits(),
        }
    }

}

export class OciNosqlTableClient {
    static new(): OciNosqlTable {
        return OciNosqlTable.newResource()
    }
    static clone(resource: OciNosqlTable): OciNosqlTable {
        return OciNosqlTable.cloneResource(resource)
    }
}

export default OciNosqlTableClient
