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
** Generated : 24/05/2021 16:08:37
**
*/

import { OkitResourceModel } from '../okit_resource_model.js'

class SecurityListResource extends OkitResourceModel {
    constructor() {
        super()
        vcn_id = ''
        egress_security_rules = [{
          description: '',
          destination: '',
          destination_type: '',
          protocol: '',
          stateless: false,
          icmp_options: {
            code: 0,
            type: 0
          },
          tcp_options: {
            max: 0,
            min: 0,
            source_port_range: {
              max: 0,
              min: 0
            }
          },
          udp_options: {
            max: 0,
            min: 0,
            source_port_range: {
              max: 0,
              min: 0
            }
          }
        }]
        ingress_security_rules = [{
          description: '',
          protocol: '',
          source: '',
          source_type: '',
          stateless: false,
          icmp_options: {
            code: 0,
            type: 0
          },
          tcp_options: {
            max: 0,
            min: 0,
            source_port_range: {
              max: 0,
              min: 0
            }
          },
          udp_options: {
            max: 0,
            min: 0,
            source_port_range: {
              max: 0,
              min: 0
            }
          }
        }]
    }
}

export default SecurityListResource
export { SecurityListResource }
