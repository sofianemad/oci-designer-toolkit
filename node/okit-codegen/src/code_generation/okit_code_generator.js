/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

/*
** Author: Andrew Hopkinson
*/

class OkitCodeGenerator {
    common_elements = [
        'compartment_id', // Common Element
        'defined_tags',   // Common Element
        'display_name',   // Common Element
        'freeform_tags',  // Common Element
        'id',             // Common Element
        'name',           // Common Element
    ]
    ignore_elements = [
        'inactive_state', 
        'is_accessible',
        'state', 
        'time_created',
        'system_tags'
    ]
    resource_map = {}
    get reverse_resource_map() {return Object.entries(this.resource_map).sort(([k1,v1], [k2, v2]) => v1<v2 ? -1 : v1>v2 ? 1 : 0).reduce((r, [k, v]) => {r[v] = k; return r}, {})}
 
    constructor(resource, definition) {
        this.resources = []
        // this.resource = resource
        // this.definition = definition
        // this.createSchema()
        // this.generate()
    }

    getRequiredAttributes(attributes) {
        return Object.entries(attributes).reduce((r, [k, v]) => {
            if (v.required) r[k] = v
            return r
        }, {})
    }

    getOptionalAttributes(attributes) {
        return Object.entries(attributes).reduce((r, [k, v]) => {
            if (!v.required) r[k] = v
            return r
        }, {})
    }

    get today() {
        const today = new Date()
        return `${today.getDate() < 10 ? '0' : ''}${today.getDate()}/${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}/${today.getFullYear()}`
    }

    get now() {
        const today = new Date()
        // return `${today.getDate() < 10 ? '0' : ''}${today.getDate()}/${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}/${today.getFullYear()} `
        return `${this.today} ${today.getHours()}:${today.getMinutes() < 10 ? '0' : ''}${today.getMinutes()}:${today.getSeconds() < 10 ? '0' : ''}${today.getSeconds()}`
    }

    get copyright() {
        return `/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/`
    }

    get author() {
        return `
/*
** Author: Andrew Hopkinson
*/`
    }

    get auto_generated_warning() {
        return `
/*
** ======================================================================
** === Auto Generated Code All Edits Will Be Lost During Regeneration ===
** ======================================================================
**
** Generated : ${this.now}
**
*/`
    }

    createSchema(definition) {
        return this.getAttributes(definition.block)
    }

    generate(resource, definition) {
        this.resources.push(resource)
        // const schema = this.createSchema(definition)
        const schema = definition
        this.resource_file = this.generateResourcesFile(this.resources)
        this.resource_class_file = this.generateResourceClass(resource, schema)
        this.resource_custom_class_file = this.generateCustomResourceClass(resource, schema)
    }

    generateResourcesFile(resources) {
        const contents = `${this.copyright}
${this.author}
${this.auto_generated_warning}
        
export { ${this.root_class} } from './${this.root_class_js}'
${resources.map((r) => 'export { ' + this.titleCase(r.split('_').join(' ')).split(' ').join('') + " } from './" + r + '/' + r + ".js'").join('\n')}
    `
            return contents
    }

    generateResourceClass(resource, schema) {}

    generateCustomResourceClass(resource) {
        const super_class_name = this.generateSuperClassName(resource)
        const super_class_filename = this.generateSuperClassFilename(resource)
        const class_name = this.generateClassName(resource)
        const contents = `${this.copyright}
${this.author}

import { ${super_class_name} } from '${super_class_filename}'

class ${class_name} extends ${super_class_name} {
    constructor(resource) {
        super(resource)
    }
}

export default ${class_name}
export { ${class_name} }
`
        return contents
    }

    generateClassName(resource) {return this.titleCase(resource.split('_').join(' ')).split(' ').join('')}

    generateSuperClassName(resource) {return `${this.generateClassName(resource)}Resource`}

    generateSuperClassFilename(resource) {return `${resource}_resource.js`}

    titleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    }

    generateModel(obj) {
        return Object.entries(obj).filter(([k, v]) => !this.ignore_elements.includes(k)).map(([k, v]) => 
            `${k}: {
                required: ${v.required ? v.required : false},
                editable: true,
                type: 'datalist',
                label: '${this.titleCase(k.split('_').join(' '))}'
            },`
        )
    }

    getAttributes1(block, hierarchy=[]) {
        const ignore_block_tyoes = ['timeouts']
        // Simple attributes
        let attributes = Object.entries(block.attributes).filter(([k, v]) => !this.ignore_elements.includes(k)).reduce((r, [k, v]) => {
            r[k] = {
                definition: {
                    required: v.required ? v.required : false,
                    editable: true,
                    type: Array.isArray(v.type) ? v.type[0] : v.type,
                    label: k.endsWith('_id') || k.endsWith('_id') ? this.titleCase(k.split('_').slice(0, -1).join(' ')) : this.titleCase(k.split('_').join(' ')),
                    id: [...hierarchy, k].join('.')
                }
            }
            return r
        }, {})
        // Block / Object Attributes
        if (block.block_types) {
            attributes = Object.entries(block.block_types).filter(([k, v]) => !ignore_block_tyoes.includes(k)).reduce((r, [k, v]) => {
                r[k] = this.getAttributes(v.block, [...hierarchy, k])
                r[k].definition = {
                    required: v.required ? v.required : false,
                    editable: true,
                    type: v.nesting_mode === 'list' && v.max_items === 1 ? 'object' : v.nesting_mode,
                    label: this.titleCase(k.split('_').join(' ')),
                    id: [...hierarchy, k].join('.')
                }
                return r
            }, attributes)
        }
        return attributes
    }
}

export default OkitCodeGenerator
export { OkitCodeGenerator }

