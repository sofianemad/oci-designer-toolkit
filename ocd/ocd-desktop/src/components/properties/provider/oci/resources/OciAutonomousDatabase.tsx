/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import OcdDocument from '../../../../OcdDocument'
import { ResourceElementConfig, ResourceProperties } from '../../../OcdPropertyTypes'
import * as AutoGenerated from './generated/OciAutonomousDatabase'
import { OciAutonomousDatabaseConfigs } from './configs/OciAutonomousDatabase'

export const OciAutonomousDatabase = ({ ocdDocument, setOcdDocument, resource }: ResourceProperties): JSX.Element => {
    const configs: ResourceElementConfig[] = OciAutonomousDatabaseConfigs.configs()
    return (
        <AutoGenerated.OciAutonomousDatabase ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} />
    )
}
