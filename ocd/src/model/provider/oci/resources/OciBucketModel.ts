/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciBucketModel"

export interface OciBucketModel extends AutoGenerated.OciBucketModel {}

export interface OciRetentionRulesModel extends AutoGenerated.OciRetentionRulesModel {}

export interface OciDurationModel extends AutoGenerated.OciDurationModel {}

export namespace OciBucketModel {
    export function newResource(type?: string): OciBucketModel {
        return {
            ...AutoGenerated.OciBucketModel.newResource('bucket'),
        }
    }
    
    export function newOciRetentionRulesModel(): OciRetentionRulesModel {
        return {
            ...AutoGenerated.OciBucketModel.newOciRetentionRulesModel(),
        }
    }

    export function newOciDurationModel(): OciDurationModel {
        return {
            ...AutoGenerated.OciBucketModel.newOciDurationModel(),
        }
    }

}

export class OciBucketModelClient {
    static new(): OciBucketModel {
        return OciBucketModel.newResource()
    }
}

export default OciBucketModelClient
