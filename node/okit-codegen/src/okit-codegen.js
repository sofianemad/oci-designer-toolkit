/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

/*
** Author: Andrew Hopkinson
*/

import fs from 'fs'
import path from 'path'
import { OkitData } from 'okit-node/src/data/okit_data.js'
import { OkitModelGenerator } from './code_generation/okit_model_generator.js'
import { OkitPropertiesGenerator } from './code_generation/okit_properties_generator.js'
import { OkitTerraformGenerator } from './code_generation/okit_terraform_generator.js'
import { OkitTerraformSchemaImporter } from './schema_import/okit_terraform_schema_importer.js'

const args = process.argv.splice(2)

console.info('')

// Read command as first argument
const command = args[0]
const subcommand = args[1]
if (command.toLocaleLowerCase() === 'generate') {
    if (subcommand.toLocaleLowerCase() === 'okit-model-js' || subcommand.toLocaleLowerCase() === 'okit-properties-js' || subcommand.toLocaleLowerCase() === 'okit-terraform-js') {
        // Source Schema file will be first in the list after command
        const input_filename = args[2]
        const input_data = fs.readFileSync(input_filename, 'utf-8')
        // Generated root directory will be second in the list after command
        const output_dir = args[3]
        const schema = JSON.parse(input_data)
        let resources = []
        let generator = undefined
        if (subcommand.toLocaleLowerCase() === 'okit-model-js') generator = new OkitModelGenerator()
        else if (subcommand.toLocaleLowerCase() === 'okit-properties-js') generator = new OkitPropertiesGenerator()
        else if (subcommand.toLocaleLowerCase() === 'okit-terraform-js') generator = new OkitTerraformGenerator()
        Object.entries(schema).forEach(([key, value]) => {
            generator.generate(key, value)
            const file_dir = path.join(output_dir, generator.generateClassDir(key))
            const super_file_dir = path.join(output_dir, generator.generateClassDir(key), generator.generateSuperClassDir(key))
            const file_name = path.join(file_dir, generator.generateClassFilename(key))
            const super_file_name = path.join(super_file_dir, generator.generateSuperClassFilename(key))
            if (!fs.existsSync(file_dir)) fs.mkdirSync(file_dir, {recursive: true})
            if (!fs.existsSync(super_file_dir)) fs.mkdirSync(super_file_dir, {recursive: true})
            fs.writeFileSync(super_file_name, generator.resource_class_file)
            if (!fs.existsSync(file_name)) fs.writeFileSync(file_name, generator.resource_custom_class_file)
        })
        if (generator.resources.length > 0) {
            const resource_file_name = path.join(output_dir, 'resources.js')
            fs.writeFileSync(resource_file_name, generator.resource_file)
        }
    } 
} else if (command.toLocaleLowerCase() === 'import') {
        // Source Schema file will be first in the list after command
        const input_filename = args[2]
        const input_data = fs.readFileSync(input_filename, 'utf-8')
        // Generated root directory will be second in the list after command
        const output_filename = args[3]
        const source_schema = JSON.parse(input_data)
        let importer = undefined
        if (subcommand.toLocaleLowerCase() === 'terraform-schema') importer = new OkitTerraformSchemaImporter()
        importer.convert(source_schema)
        fs.writeFileSync(output_filename, JSON.stringify(importer.okit_schema, null, 2))
}
