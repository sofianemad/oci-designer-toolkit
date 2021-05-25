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

class CompartmentResource extends OkitResourceTerraform {
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
        this.tf_resource_name = 'oci_identity_compartment'
        this.resource_list = 'compartment'
    }

    toResource() {
        let cmd = []
        cmd.push('resource "oci_identity_compartment" "${this.resource_name}" {')
        cmd.push('    #Required')
        cmd.push(`    description = ${this.varValOrRef('description', this.resource.description)}`)
        cmd.push(`    name = ${this.varValOrRef('name', this.resource.name)}`)
        cmd.push('    #Optional')
        cmd.push(`    compartment_id = ${this.varValOrRef('compartment_id', this.resource.compartment_id)}`)
        cmd.push(`    defined_tags = ${this.varValOrRef('defined_tags', this.resource.defined_tags)}`)
        cmd.push(`    enable_delete = ${this.varValOrRef('enable_delete', this.resource.enable_delete)}`)
        cmd.push(`    freeform_tags = ${this.varValOrRef('freeform_tags', this.resource.freeform_tags)}`)
        cmd.push('    #Tags')
        cmd.push('}')
        return cmd.join('\n')
    }

    toData() {
        let cmd = []
        cmd.push('data "oci_identity_compartment" "${this.resource_name}" {')
        cmd.push('    #Required')
        cmd.push('    compartment_id = ${this.resource_id}')
        cmd.push('}')
        return cmd.join('\n')
   }

}

export default CompartmentResource
export { CompartmentResource }
