/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciDhcpOptions"

export interface OciDhcpOptions extends AutoGenerated.OciDhcpOptions {}

export interface OciOptions extends AutoGenerated.OciOptions {}

export namespace OciDhcpOptions {
    export function newResource(type?: string): OciDhcpOptions {
        return {
            ...AutoGenerated.OciDhcpOptions.newResource('dhcp_options'),
        }
    }
    export function cloneResource(resource: OciDhcpOptions, type?: string): OciDhcpOptions {
        return {
            ...AutoGenerated.OciDhcpOptions.cloneResource(resource, 'dhcp_options'),
        }
    }
    
    export function newOciOptions(): OciOptions {
        return {
            ...AutoGenerated.OciDhcpOptions.newOciOptions(),
        }
    }

}

export class OciDhcpOptionsClient {
    static new(): OciDhcpOptions {
        return OciDhcpOptions.newResource()
    }
    static clone(resource: OciDhcpOptions): OciDhcpOptions {
        return OciDhcpOptions.cloneResource(resource)
    }
}

export default OciDhcpOptionsClient
