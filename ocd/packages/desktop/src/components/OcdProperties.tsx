/*
** Copyright (c) 2021, Andrew Hopkinson.
** Licensed under the GNU GENERAL PUBLIC LICENSE v 3.0 as shown at https://www.gnu.org/licenses/.
*/

import { useRef, useState } from 'react'
import { OcdResource, OcdViewCoordsStyle, OcdViewPage } from '@ocd/model'
import { DesignerColourPicker, DesignerResourceProperties } from '../types/DesignerResourceProperties'
import { OcdUtils } from '@ocd/core'
import OcdDocument from './OcdDocument'
import { OcdLookupProperty, OcdTextProperty, ResourceElementConfig, ResourceProperties } from './properties/OcdPropertyTypes'
import * as ociResources from './properties/provider/oci/resources'
import { HexColorPicker, HexColorInput } from 'react-colorful'

const OcdResourcePropertiesHeader = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const selectedResource = ocdDocument.getSelectedResource()
    const padlock: string = selectedResource ? selectedResource.locked ? 'padlock-closed' : 'padlock-open' : 'padlock-open'
    const title: string = selectedResource ? `${selectedResource.resourceTypeName} (${ocdDocument.getDisplayName(ocdDocument.selectedResource.modelId)})` : ''
    return (
        <div className='ocd-properties-header'>
            <div className={`property-editor-title ${ocdDocument.selectedResource.class}`}>
                <div className={`heading-background ${padlock}`}>{title}</div>
            </div>
        </div>
    )
}

const OciCommonResourceProperties = ({ocdDocument, setOcdDocument, resource}: ResourceProperties): JSX.Element => {
    const config: ResourceElementConfig | undefined = undefined
    const displayName = {"provider": "oci", "key": "displayName", "name": "displayName", "type": "string", "subtype": "", "required": true, "label": "Name", "id": "displayName"}
    const compartmentId = {"provider": "oci", "key": "compartmentId", "name": "compartmentId", "type": "string", "subtype": "", "required": true, "label": "Compartment", "id": "compartmentId", "lookupResource": "compartment"}
    return (
        <div>
            <details open={true}>
                <summary className='summary-background'>Core</summary>
                <div>
                <OcdTextProperty  ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={config} attribute={displayName} />
                <OcdLookupProperty  ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={config} attribute={compartmentId} />
                </div>
            </details>
        </div>
    )
}

const OcdResourceProperties = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const selectedResource: OcdResource = ocdDocument.getSelectedResource()
    const resourceJSXMethod = selectedResource ? `${OcdUtils.toTitleCase(selectedResource.provider)}${selectedResource.resourceType}` : ''
    // @ts-ignore 
    const ResourceProperties = ociResources[resourceJSXMethod]
    return (
        <div className={`ocd-properties-panel ocd-properties-panel-theme`}>
            {selectedResource && selectedResource.provider === 'oci' && <OciCommonResourceProperties 
                ocdDocument={ocdDocument} 
                setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} 
                resource={selectedResource}
            />}
            {selectedResource && ResourceProperties && <ResourceProperties 
                ocdDocument={ocdDocument} 
                setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} 
                resource={selectedResource}
            />}
        </div>
    )
}

const OcdResourceDocumentation = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const selectedResource = ocdDocument.getSelectedResource()
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        selectedResource.documentation = e.target.value
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    return (
        <div className={`ocd-properties-panel ocd-properties-panel-theme ocd-properties-documentation-panel`}>
            <textarea onChange={onChange}></textarea>
        </div>
    )
}

const OcdResourceArrangement = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const selectedResource = ocdDocument.selectedResource
    const page: OcdViewPage = ocdDocument.getActivePage()
    // console.info('Selected Resource', selectedResource)
    // @ts-ignore
    // const coords = ocdDocument.design.view.pages.find((p => p.selected)).coords.find(c => c.id === selectedResource.coordsId)
    const coords = ocdDocument.getCoords(selectedResource.coordsId)
    const width = coords ? coords.w : 0
    const height = coords ? coords.h : 0
    const left = coords ? coords.x : 0
    const top = coords ? coords.y : 0
    const container = coords ? coords.container : false
    const onWidthChange = (value: string) => {
        // ocdDocument.design.view.pages.find((p => p.selected)).coords.find(c => c.id === coordsId).w = parseInt(value)
        if (coords) {ocdDocument.updateCoords({...coords, w: parseInt(value)}, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const onHeightChange = (value: string) => {
        // ocdDocument.design.view.pages.find((p => p.selected)).coords.find(c => c.id === coordsId).h = parseInt(value)
        if (coords) {ocdDocument.updateCoords({...coords, h: parseInt(value)}, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const onLeftChange = (value: string) => {
        // ocdDocument.design.view.pages.find((p => p.selected)).coords.find(c => c.id === coordsId).x = parseInt(value)
        if (coords) {ocdDocument.updateCoords({...coords, x: parseInt(value)}, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const onTopChange = (value: string) => {
        // @ts-ignore 
        // ocdDocument.design.view.pages.find((p => p.selected)).coords.find(c => c.id === coordsId).y = parseInt(value)
        if (coords) {ocdDocument.updateCoords({...coords, y: parseInt(value)}, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const toFrontClick = () => {
        if (coords) {ocdDocument.toFront(coords, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const toBackClick = () => {
        if (coords) {ocdDocument.toBack(coords, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const bringForwardClick = () => {
        if (coords) {ocdDocument.bringForward(coords, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const sendBackwardClick = () => {
        if (coords) {ocdDocument.sendBackward(coords, page.id)}
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    return (
        <div className={`ocd-properties-panel ocd-properties-panel-theme ocd-properties-arrangement-panel`}>
            <div className={`ocd-arrangement-z-positioning`}>
                <div onClick={() => toFrontClick()}><span>To Front</span></div>
                <div onClick={() => toBackClick()}><span>To Back</span></div>
                <div onClick={() => bringForwardClick()}><span>Bring Forward</span></div>
                <div onClick={() => sendBackwardClick()}><span>Send Backward</span></div>
            </div>
            <div className={`ocd-arrangement-size ${!container ? 'hidden' : ''}`}>
                <div><span>Size</span></div>
                <div><input type={'number'} min={40} value={width} onChange={(e) => onWidthChange(e.target.value)}></input></div>
                <div><input type={'number'} min={40} value={height} onChange={(e) => onHeightChange(e.target.value)}></input></div>
                <div></div>
                <div><span>Width</span></div>
                <div><span>Height</span></div>
            </div>
            <div className={`ocd-arrangement-xy-positioning`}>
                <div><span>Position</span></div>
                <div><input type={'number'} min={0} value={left} onChange={(e) => onLeftChange(e.target.value)}></input></div>
                <div><input type={'number'} min={0} value={top} onChange={(e) => onTopChange(e.target.value)}></input></div>
                <div></div>
                <div><span>Left</span></div>
                <div><span>Top</span></div>
            </div>
        </div>
    )
}
const OcdResourceStyle = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const selectedResource = ocdDocument.selectedResource
    console.debug('OcdProperties: Selected Resource', selectedResource)
    const page: OcdViewPage = ocdDocument.getActivePage()
    const coords = ocdDocument.getCoords(selectedResource.coordsId)
    const coordsStyle = (coords !== undefined && coords.style !== undefined ) ? coords.style : undefined
    // style.fill
    const coordsFill = (coordsStyle !== undefined && coordsStyle.fill !== undefined) ? coordsStyle.fill : undefined
    const fillChecked = (coordsFill !== undefined) as boolean
    const fill = coordsFill !== undefined ? coordsFill : '#aabbcc'
    // style.stroke
    const coordsStroke = (coordsStyle !== undefined && coordsStyle.stroke !== undefined) ? coordsStyle.stroke : undefined
    const strokeChecked = (coordsStroke !== undefined) as boolean
    const stroke = coordsStroke !== undefined ? coordsStroke : '#aabbcc'
    // style.strokeDasharray
    const coordsStrokeDasharray = (coordsStyle !== undefined && coordsStyle.strokeDasharray !== undefined) ? coordsStyle.strokeDasharray : undefined
    const strokeDasharray = coordsStrokeDasharray !== undefined ? coordsStrokeDasharray : 'default'
    // style.strokeWidth
    const coordsStrokeWidth = (coordsStyle !== undefined && coordsStyle.strokeWidth !== undefined) ? coordsStyle.strokeWidth : undefined
    const strokeWidth = coordsStrokeWidth !== undefined ? coordsStrokeWidth : 'default'

    const fillCheckedChanged = () => {
        console.debug('OcdProperties: fillCheckedChanged', fillChecked, coords)
        const style = coordsStyle !== undefined ? JSON.parse(JSON.stringify(coordsStyle)) : {} as OcdViewCoordsStyle
        // Need to not fill because it is currently the previous state
        if (!fillChecked) {
            // Fill Specified
            style.fill = fill
        } else {
            delete style.fill
        }
        if (coords) {ocdDocument.updateCoords({...coords, style: style}, page.id)}
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    const setFillColour = (colour: string) => {
        // const style = coords !== undefined && coords.style !== undefined ? JSON.parse(JSON.stringify(coords.style)) : {} as OcdViewCoordsStyle
        const style = coordsStyle !== undefined ? JSON.parse(JSON.stringify(coordsStyle)) : {} as OcdViewCoordsStyle
        style.fill = colour
        console.debug('OcdProperties: Set Fill Colour', coords)
        if (coords) {ocdDocument.updateCoords({...coords, style: style}, page.id)}
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    const strokeCheckedChanged = () => {
        console.debug('OcdProperties: strokeCheckedChanged', strokeChecked, coords)
        const style = coordsStyle !== undefined ? JSON.parse(JSON.stringify(coordsStyle)) : {} as OcdViewCoordsStyle
        // Need to not stroke because it is currently the previous state
        if (!strokeChecked) {
            // Fill Specified
            style.stroke = stroke
        } else {
            delete style.stroke
            delete style.strokeDasharray
            delete style.strokeWidth
            delete style.strokeOpacity
        }
        if (coords) {ocdDocument.updateCoords({...coords, style: style}, page.id)}
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    const setStrokeColour = (colour: string) => {
        // const style = coords !== undefined && coords.style !== undefined ? JSON.parse(JSON.stringify(coords.style)) : {} as OcdViewCoordsStyle
        const style = coordsStyle !== undefined ? JSON.parse(JSON.stringify(coordsStyle)) : {} as OcdViewCoordsStyle
        style.stroke = colour
        console.debug('OcdProperties: Set Stroke Colour', coords)
        if (coords) {ocdDocument.updateCoords({...coords, style: style}, page.id)}
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    const onStrokeDashArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const style = coordsStyle !== undefined ? JSON.parse(JSON.stringify(coordsStyle)) : {} as OcdViewCoordsStyle
        if (e.currentTarget.value === 'default') {
            delete style.strokeDasharray
        } else {
            style.strokeDasharray = e.currentTarget.value
        }
        if (coords) {ocdDocument.updateCoords({...coords, style: style}, page.id)}
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    const onStrokeWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const style = coordsStyle !== undefined ? JSON.parse(JSON.stringify(coordsStyle)) : {} as OcdViewCoordsStyle
        if (e.currentTarget.value === 'default') {
            delete style.strokeWidth
        } else {
            style.strokeWidth = e.currentTarget.value
        }
        if (coords) {ocdDocument.updateCoords({...coords, style: style}, page.id)}
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    return (
        <div className={`ocd-properties-panel ocd-properties-panel-theme ocd-properties-style-panel`}>
            <div className={`ocd-style-fill`}>
                <div><input id='resourceStyleFill' type='checkbox' onChange={fillCheckedChanged} checked={fillChecked}/><span>Fill</span></div>
                {fillChecked && <div><OcdColourPicker colour={fill} setColour={setFillColour} /></div>}
                {!fillChecked && <div></div>}
            </div>
            <div className={`ocd-style-stroke`}>
                <div>
                    <input id='resourceStyleStroke' type='checkbox' onChange={strokeCheckedChanged} checked={strokeChecked}/><span>Line</span>
                </div>
                {strokeChecked && <div><OcdColourPicker colour={stroke} setColour={setStrokeColour} /></div>}
                {!strokeChecked && <div></div>}
                {strokeChecked && <div>
                    <div className='ocd-radio-buttons-vertical ocd-stroke-dasharray-radio'>
                        <label className='ocd-style-stroke-dasharray'><input type='radio' name='stroke-dasharray' value='default' checked={strokeDasharray === 'default'} onChange={onStrokeDashArrayChange}></input>Default Line</label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-none'><input type='radio' name='stroke-dasharray' value='none' checked={strokeDasharray === 'none'} onChange={onStrokeDashArrayChange}></input></label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-3-2'><input type='radio' name='stroke-dasharray' value='3,2' checked={strokeDasharray === '3,2'} onChange={onStrokeDashArrayChange}></input></label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-3-2-1'><input type='radio' name='stroke-dasharray' value='3,2,1' checked={strokeDasharray === '3,2,1'} onChange={onStrokeDashArrayChange}></input></label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-3-1-2-1'><input type='radio' name='stroke-dasharray' value='3,1,2,1' checked={strokeDasharray === '3,1,2,1'} onChange={onStrokeDashArrayChange}></input></label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-3-3'><input type='radio' name='stroke-dasharray' value='3,3' checked={strokeDasharray === '3,3'} onChange={onStrokeDashArrayChange}></input></label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-2-2'><input type='radio' name='stroke-dasharray' value='2,2' checked={strokeDasharray === '2,2'} onChange={onStrokeDashArrayChange}></input></label>
                        <label className='ocd-style-stroke-dasharray ocd-style-stroke-dasharray-1-1'><input type='radio' name='stroke-dasharray' value='1,1' checked={strokeDasharray === '1,1'} onChange={onStrokeDashArrayChange}></input></label>
                    </div>
                </div>}
                {strokeChecked && <div className='ocd-style-stroke-width'>
                    <select value={strokeWidth} onChange={onStrokeWidthChange}>
                        <option value={'default'}>Default Width</option>
                        <option value={'1'}>1pt</option>
                        <option value={'2'}>2pt</option>
                        <option value={'3'}>3pt</option>
                        <option value={'4'}>4pt</option>
                        <option value={'5'}>5pt</option>
                        <option value={'6'}>6pt</option>
                    </select>
                </div>}
            </div>
            <div className={`ocd-style-opacity`}></div>
        </div>
    )
}
const OcdLayerStyle = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const page: OcdViewPage = ocdDocument.getActivePage()
    const layer = ocdDocument.getActiveLayer(page.id)
    const layerStyle = (layer !== undefined && layer.style !== undefined) ? layer.style : undefined
    const layerFill = (layerStyle !== undefined && layerStyle.fill !== undefined) ? layerStyle.fill : undefined
    const fillChecked = (layerFill !== undefined) as boolean
    const fill = layerFill !== undefined ? layerFill : '#aabbcc'

    const fillCheckedChanged = () => {
        console.debug('OcdProperties: fillCheckedChanged', fillChecked, layer)
        const style = layerStyle !== undefined ? JSON.parse(JSON.stringify(layerStyle)) : {} as OcdViewCoordsStyle
        // Need to not fill because it is currently the previous state
        if (!fillChecked) {
            // Fill Specified
            style.fill = fill
        } else {
            delete style.fill
        }
        ocdDocument.updateLayerStyle(layer.id, style)
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    const setFillColour = (colour: string) => {
        const style = layerStyle !== undefined ? JSON.parse(JSON.stringify(layerStyle)) : {} as OcdViewCoordsStyle
        style.fill = colour
        console.debug('OcdProperties: Set Fill Colour', layer)
        ocdDocument.updateLayerStyle(layer.id, style)
        const clone = OcdDocument.clone(ocdDocument)
        setOcdDocument(clone)
    }
    return (
        <div className={`ocd-properties-panel ocd-properties-panel-theme ocd-properties-style-panel`}>
            <div className={`ocd-style-fill`}>
                <div><input id='resourceStyleFill' type='checkbox' onChange={fillCheckedChanged} checked={fillChecked}/><span>Fill</span></div>
                {fillChecked && <div><OcdColourPicker colour={fill} setColour={setFillColour} /></div>}
            </div>
            <div className={`ocd-style-stroke`}></div>
            <div className={`ocd-style-opacity`}></div>
        </div>
    )
}
const OcdColourPicker = ({colour, setColour}: DesignerColourPicker): JSX.Element => {
    console.debug('OcdProperties: Colour', colour)
    const [pickerOpen, setPickerOpen] = useState(false)
    const colourChanged = (colour: string) => {
        console.debug('OcdProperties: Colour Changed', colour)
        setColour(colour)
    }
    return (
        <div className='ocd-colour-picker'
            onMouseLeave={() => setPickerOpen(false)}>
            <div className='ocd-colour-picker-swatch'
                style={{ backgroundColor: colour }}
                onClick={() => setPickerOpen(!pickerOpen)}
            ></div>
            {pickerOpen && <div className='ocd-colour-picker-popup'>
                <div><HexColorPicker color={colour} onChange={colourChanged} /></div>
                <div><HexColorInput color={colour} onChange={colourChanged} /></div>
            </div>}
        </div>
    )
}

const OcdProperties = ({ocdDocument, setOcdDocument}: DesignerResourceProperties): JSX.Element => {
    const selectedResource = ocdDocument.selectedResource
    const [activeTab, setActivieTab] = useState('properties')
    const onPropertiesTabClick = (tab: string) => {
        setActivieTab(tab.toLowerCase())
    }
    const ActiveTab = activeTab === 'properties' ? OcdResourceProperties :
                      activeTab === 'documentation' ? OcdResourceDocumentation :
                      activeTab === 'arrange' ? OcdResourceArrangement :
                      activeTab === 'style' && selectedResource.coordsId !== '' ? OcdResourceStyle :
                      activeTab === 'style' ? OcdLayerStyle :
                      OcdResourceProperties
    return (
        <div className='ocd-designer-properties'>
            <div className={`ocd-designer-tab-bar ocd-designer-tab-bar-theme`}>
                <div className={`ocd-designer-tab ocd-designer-tab-theme ${activeTab === 'properties' ? 'ocd-designer-active-tab-theme' : ''}`} onClick={() => onPropertiesTabClick('Properties')}><span>Properties</span></div>
                <div className={`ocd-designer-tab ocd-designer-tab-theme ${activeTab === 'documentation' ? 'ocd-designer-active-tab-theme' : ''}`} onClick={() => onPropertiesTabClick('Documentation')}><span>Documentation</span></div>
                <div className={`ocd-designer-tab ocd-designer-tab-theme ${activeTab === 'style' ? 'ocd-designer-active-tab-theme' : ''}`} onClick={() => onPropertiesTabClick('Style')}><span>Style</span></div>
                <div className={`ocd-designer-tab ocd-designer-tab-theme ${activeTab === 'arrange' ? 'ocd-designer-active-tab-theme' : ''} ${ocdDocument.selectedResource.coordsId === '' ? 'hidden' : ''}`} onClick={() => onPropertiesTabClick('Arrange')}><span>Arrange</span></div>
            </div>
            <OcdResourcePropertiesHeader
                ocdDocument={ocdDocument} 
                setOcdDocument={(ocdDocument: OcdDocument) => setOcdDocument(ocdDocument)} 
            />
            <ActiveTab
                ocdDocument={ocdDocument} 
                setOcdDocument={(ocdDocument: OcdDocument) => setOcdDocument(ocdDocument)} 
            />
        </div>
    )
}

export default OcdProperties