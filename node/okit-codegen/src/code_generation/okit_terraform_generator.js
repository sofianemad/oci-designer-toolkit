/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

/*
** Author: Andrew Hopkinson
*/

import { OkitCodeGenerator } from './okit_code_generator.js'

class OkitTerraformGenerator extends OkitCodeGenerator {
    root_class = 'OkitResourceTerraform'
    root_class_js = 'okit_resource_terraform.js'
    resource_map = {
        autonomous_database: 'oci_database_autonomous_database',
        backend: 'oci_load_balancer_backend',
        backend_set: 'oci_load_balancer_backend_set',
        bucket: 'oci_objectstorage_bucket',
        cluster: 'oci_containerengine_cluster',
        compartment: 'oci_identity_compartment',
        cpe: 'oci_core_cpe',
        db_system: 'oci_database_db_system',
        dhcp_options: 'oci_core_dhcp_options',
        drg: 'oci_core_drg',
        file_system: 'oci_file_storage_file_system',
        instance: 'oci_core_instance',
        instance_pool: 'oci_core_instance_pool',
        internet_gateway: 'oci_core_internet_gateway',
        ipsec: 'oci_core_ipsec',
        load_balancer: 'oci_load_balancer_load_balancer',
        local_peering_gateway: 'oci_core_local_peering_gateway',
        mysql_db_system: 'oci_mysql_mysql_db_system',
        nat_gateway: 'oci_core_nat_gateway',
        network_security_group: 'oci_core_network_security_group',
        node_pool: 'oci_containerengine_node_pool',
        remote_peering_connection: 'oci_core_remote_peering_connection',
        route_table: 'oci_core_route_table',
        security_list: 'oci_core_security_list',
        service_gateway: 'oci_core_service_gateway',
        subnet: 'oci_core_subnet',
        vcn: 'oci_core_vcn',
        volume: 'oci_core_volume',
        volume_group: 'oci_core_volume_group'
    }

    generateResourceClass(resource, schema) {
        const class_name = this.generateSuperClassName(resource)
        const contents = `${this.copyright}
${this.author}
${this.auto_generated_warning}

import { ${this.root_class} } from '../${this.root_class_js}'

class ${class_name} extends ${this.root_class} {
    static model = {
        ${this.generateModel(schema).join('\n        ')}
    }

    constructor(resource) {
        super(resource)
        this.tf_resource_name = '${this.resource_map[resource]}'
        this.resource_list = '${resource}'
    }

    toResource() {
        let cmd = []
        cmd.push('resource "${this.resource_map[resource]}" "\${this.resource_name}" {')
        cmd.push('    #Required')
${this.generateRequired(schema.attributes)}
        cmd.push('    #Optional')
${this.generateOptional(schema.attributes)}
        cmd.push('    #Tags')
        cmd.push('}')
        return cmd.join('\\n')
    }

    toData() {
        let cmd = []
        cmd.push('data "${this.resource_map[resource]}" "\${this.resource_name}" {')
        cmd.push('    #Required')
        cmd.push('    ${resource}_id = \${this.resource_id}')
        cmd.push('}')
        return cmd.join('\\n')
   }

}

export default ${class_name}
export { ${class_name} }
`
        return contents
    }

    generateRequired(attributes, depth=1) {
        let cmd = Object.entries(this.getRequiredAttributes(attributes)).map(([key, val]) => {
            if (val.type === 'list') {

            } else if (val.type === 'object') {

            } else {
                return this.generateSimpleAssignment(key, val, depth) 
            }
        })
        return cmd.join('\n')
    }

    generateOptional(attributes, depth=1) {
        let cmd = Object.entries(this.getOptionalAttributes(attributes)).map(([key, val]) => {
            if (val.type === 'list' && (val.subtype === 'string' || val.subtype === '')) {
                return this.generateListAssignment(key, val, depth) 
            } else if (val.type === 'object') {

            } else {
                return this.generateSimpleAssignment(key, val, depth) 
            }
        })
        return cmd.join('\n')
    }

    generateSimpleAssignment(key, val, depth) {
        console.info('Assignment:', key, '=', val.id)
        let optional = ''
        if (!val.required) optional = `if (this.resource.${val.id} && this.resource.${val.id} !== '') `
        return `        ${optional}cmd.push(\`${this.indent(depth)}${key} = \${this.varValOrRef('${key}', this.resource.${val.id})}\`)`
    }

    generateListAssignment(key, val, depth) {
        console.info('Assignment:', key, '=', val.id)
        let optional = ''
        if (!val.required) optional = `if (this.resource.${val.id} && this.resource.${val.id}.length > 0) `
        return `        ${optional}cmd.push(\`${this.indent(depth)}${key} = [\${this.varValOrRef('${key}', this.resource.${val.id})}]\`)`
    }

    indent(depth) {
        return depth > 0 ? `    ${Array((depth-1)*2).fill(' ').join('')}` : '    '
    }

}

export default OkitTerraformGenerator
export { OkitTerraformGenerator }

