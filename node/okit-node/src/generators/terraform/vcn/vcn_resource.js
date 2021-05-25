/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

/*
** Author: Andrew Hopkinson
*/

/*
** ======================================================================
** === Auto Generated Code All Edits Will Be Lost During Regeneration ===
** ======================================================================
**
** Generated : 25/05/2021 10:59:32
**
*/

import { OkitResourceTerraform } from '../okit_resource_terraform.js'

class VcnResource extends OkitResourceTerraform {
    static model = {
        type: {
                required: false,
                editable: true,
                type: 'datalist',
                label: 'Type'
            },
        subtype: {
                required: false,
                editable: true,
                type: 'datalist',
                label: 'Subtype'
            },
        attributes: {
                required: false,
                editable: true,
                type: 'datalist',
                label: 'Attributes'
            },
    }

    constructor(resource) {
        super(resource)
        this.tf_resource_name = 'oci_core_vcn'
        this.resource_list = 'vcn'
    }

    toResource() {
        let cmd = []
        cmd.push('resource "oci_core_vcn" "${this.resource_name}" {')
        cmd.push('    #Required')
        cmd.push(`    compartment_id = ${this.varValOrRef('compartment_id', this.resource.compartment_id)}`)
        cmd.push('    #Optional')
        cmd.push(`    cidr_block = ${this.varValOrRef('cidr_block', this.resource.cidr_block)}`)

        cmd.push(`    defined_tags = ${this.varValOrRef('defined_tags', this.resource.defined_tags)}`)
        cmd.push(`    display_name = ${this.varValOrRef('display_name', this.resource.display_name)}`)
        cmd.push(`    dns_label = ${this.varValOrRef('dns_label', this.resource.dns_label)}`)
        cmd.push(`    freeform_tags = ${this.varValOrRef('freeform_tags', this.resource.freeform_tags)}`)
        cmd.push(`    ipv6cidr_block = ${this.varValOrRef('ipv6cidr_block', this.resource.ipv6cidr_block)}`)
        cmd.push(`    is_ipv6enabled = ${this.varValOrRef('is_ipv6enabled', this.resource.is_ipv6enabled)}`)
        cmd.push('    #Tags')
        cmd.push('}')
        return cmd.join('\n')
    }

    toData() {
        let cmd = []
        cmd.push('data "oci_core_vcn" "${this.resource_name}" {')
        cmd.push('    #Required')
        cmd.push('    vcn_id = ${this.resource_id}')
        cmd.push('}')
        return cmd.join('\n')
   }

}

export default VcnResource
export { VcnResource }
