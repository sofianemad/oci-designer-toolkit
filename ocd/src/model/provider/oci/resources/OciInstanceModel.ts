/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciInstanceModel"

export interface OciInstanceModel extends AutoGenerated.OciInstanceModel {}

export interface OciAgentConfigModel extends AutoGenerated.OciAgentConfigModel {}

export interface OciPluginsConfigModel extends AutoGenerated.OciPluginsConfigModel {}

export interface OciAvailabilityConfigModel extends AutoGenerated.OciAvailabilityConfigModel {}

export interface OciCreateVnicDetailsModel extends AutoGenerated.OciCreateVnicDetailsModel {}

export interface OciInstanceOptionsModel extends AutoGenerated.OciInstanceOptionsModel {}

export interface OciLaunchOptionsModel extends AutoGenerated.OciLaunchOptionsModel {}

export interface OciPlatformConfigModel extends AutoGenerated.OciPlatformConfigModel {}

export interface OciPreemptibleInstanceConfigModel extends AutoGenerated.OciPreemptibleInstanceConfigModel {}

export interface OciPreemptionActionModel extends AutoGenerated.OciPreemptionActionModel {}

export interface OciShapeConfigModel extends AutoGenerated.OciShapeConfigModel {}

export interface OciSourceDetailsModel extends AutoGenerated.OciSourceDetailsModel {}

export namespace OciInstanceModel {
    export function newResource(type?: string): OciInstanceModel {
        return {
            ...AutoGenerated.OciInstanceModel.newResource('instance'),
        }
    }
    
    export function newOciAgentConfigModel(): OciAgentConfigModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciAgentConfigModel(),
        }
    }

    export function newOciPluginsConfigModel(): OciPluginsConfigModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciPluginsConfigModel(),
        }
    }

    export function newOciAvailabilityConfigModel(): OciAvailabilityConfigModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciAvailabilityConfigModel(),
        }
    }

    export function newOciCreateVnicDetailsModel(): OciCreateVnicDetailsModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciCreateVnicDetailsModel(),
        }
    }

    export function newOciInstanceOptionsModel(): OciInstanceOptionsModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciInstanceOptionsModel(),
        }
    }

    export function newOciLaunchOptionsModel(): OciLaunchOptionsModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciLaunchOptionsModel(),
        }
    }

    export function newOciPlatformConfigModel(): OciPlatformConfigModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciPlatformConfigModel(),
        }
    }

    export function newOciPreemptibleInstanceConfigModel(): OciPreemptibleInstanceConfigModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciPreemptibleInstanceConfigModel(),
        }
    }

    export function newOciPreemptionActionModel(): OciPreemptionActionModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciPreemptionActionModel(),
        }
    }

    export function newOciShapeConfigModel(): OciShapeConfigModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciShapeConfigModel(),
        }
    }

    export function newOciSourceDetailsModel(): OciSourceDetailsModel {
        return {
            ...AutoGenerated.OciInstanceModel.newOciSourceDetailsModel(),
        }
    }

}

export class OciInstanceModelClient {
    static new(): OciInstanceModel {
        return OciInstanceModel.newResource()
    }
}

export default OciInstanceModelClient
