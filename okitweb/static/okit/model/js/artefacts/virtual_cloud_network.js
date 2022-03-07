/*
** Copyright (c) 2020, 2021, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded Virtual Cloud Network Javascript');

/*
** Define Virtual Cloud Network Artifact Class
 */
class VirtualCloudNetwork extends OkitArtifact {
    /*
    ** Create
     */
    constructor (data={}, okitjson={}) {
        super(okitjson);
        // Configure default values
        // this.display_name = this.generateDefaultName(okitjson.virtual_cloud_networks.length + 1);
        this.compartment_id = data.parent_id;
        // Generate Cidr
        this.cidr_blocks = [''];
        this.dns_label = `vcn${this.display_name.toLowerCase().slice(-6)}`;
        this.is_ipv6enabled = false;
        this.ipv6cidr_blocks = [''];
        // Update with any passed data
        this.merge(data);
        this.convert();
        Object.defineProperty(this, 'cidr_block', {get: function() {return this.cidr_blocks[0];}, set: function(cidr) {this.cidr_blocks[0] = cidr;}, enumerable: false });

    }

    /*
    ** Conversion Routine allowing loading of old json
     */
    convert() {
        super.convert();
        if (this.cidr_block !== undefined && this.cidr_block !== '') {
            if (this.cidr_blocks === undefined || this.cidr_blocks.length === 0 || (this.cidr_blocks.length === 1 && this.cidr_blocks[0] === '')) this.cidr_blocks = [this.cidr_block];
            else if (this.cidr_blocks.indexOf(this.cidr_block) < 0) this.cidr_blocks.push(this.cidr_block);
            delete this.cidr_block;
        }
        if (this.ipv6cidr_block !== undefined && this.ipv6cidr_block !== '') {
            if (this.ipv6cidr_blocks === undefined || this.ipv6cidr_blocks.length === 0 || (this.ipv6cidr_blocks.length === 1 && this.ipv6cidr_blocks[0] === '')) this.ipv6cidr_blocks = [this.ipv6cidr_block];
            else if (this.ipv6cidr_blocks.indexOf(this.ipv6cidr_block) < 0) this.ipv6cidr_blocks.push(this.ipv6cidr_block);
            delete this.ipv6cidr_block;
        }
    }

    /*
    ** Delete Processing
     */
    deleteChildren() {
        console.log('Deleting Children of ' + this.getArtifactReference() + ' : ' + this.display_name);
        // Remove Subnets
        this.getOkitJson().getSubnets().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Remove Route_tables
        this.getOkitJson().getRouteTables().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Remove Security Lists
        this.getOkitJson().getSecurityLists().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Remove Internet Gateways
        this.getOkitJson().getInternetGateways().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Remove NAT Gateways
        this.getOkitJson().getNatGateways().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Remove Service Gateways
        this.getOkitJson().getServiceGateways().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Local Peering Gateways
        this.getOkitJson().getLocalPeeringGateways().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // Network Security Groups
        this.getOkitJson().getNetworkSecurityGroups().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        // DHCP Options
        this.getOkitJson().getDhcpOptions().filter((d) => d.vcn_id === this.id).forEach((c) => c.delete())
        console.log();
    }

    /*
    ** Artifact Specific Functions
     */
    hasUnattachedSecurityList() {
        const self = this
        return this.getOkitJson().getSecurityLists().filter((r) => r.vcn_id === self.id).length > 0
    }

    hasUnattachedRouteTable() {
        const self = this
        return this.getOkitJson().getRouteTables().filter((r) => r.vcn_id === self.id).length > 0
    }

    getGateways() {
        return [...this.getInternetGateways(), ...this.getNatGateways(), ...this.getLocalPeeringGateways(), ...this.getServiceGateways(), ...this.getDynamicRoutingGateways()]
        // let gateways = [];
        // // Internet Gateways
        // gateways.push(...this.getInternetGateways());
        // // NAT Gateways
        // gateways.push(...this.getNatGateways());
        // // Local Peering Gateways
        // gateways.push(...this.getLocalPeeringGateways());
        // // Service Gateways
        // gateways.push(...this.getServiceGateways());
        // // Dynamic Routing Gateways
        // gateways.push(...this.getDynamicRoutingGateways());
        // return gateways;
    }

    getInternetGateways() {
        const self = this
        return this.getOkitJson().getInternetGateways().filter((r) => r.vcn_id === self.id)
    }

    getNatGateways() {
        const self = this
        return this.getOkitJson().getNatGateways().filter((r) => r.vcn_id === self.id)
    }

    getLocalPeeringGateways() {
        const self = this
        return this.getOkitJson().getLocalPeeringGateways().filter((r) => r.vcn_id === self.id)
    }

    getServiceGateways() {
        const self = this
        return this.getOkitJson().getServiceGateways().filter((r) => r.vcn_id === self.id)
    }

    getDynamicRoutingGateways() {
        const self = this
        return this.getOkitJson().getDynamicRoutingGateways().filter((r) => r.vcn_id === self.id)
    }

    getNamePrefix() {
        return super.getNamePrefix() + 'vcn';
    }

    /*
    ** Utility Methods
     */
    generateCIDR() {
        let vcn_cidr = '10.0.0.0/16';
        let vcn_octets = vcn_cidr.split('/')[0].split('.');
        let vcn_cidrs = [];
        for (let vcn of this.getOkitJson().getVirtualCloudNetworks()) {
            if (this.id !== vcn.id) {
                vcn.cidr_blocks.forEach((cidr_block) => {vcn_cidrs.push(cidr_block.split('/')[0])});
            }
        }
        let second_octet = 0;
        let ip = '';
        do {
            ip = `${vcn_octets[0]}.${second_octet}.${vcn_octets[2]}.${vcn_octets[3]}`
            second_octet += 1;
        } while (vcn_cidrs.includes(ip));

        this.cidr_blocks = [`${ip}/16`];
        return this.cidr_blocks;
    }

    /*
    ** Static Functionality
     */
    static getArtifactReference() {
        return 'Virtual Cloud Network';
    }
}
/*
** Dynamically Add Model Functions
*/
OkitJson.prototype.newVirtualCloudNetwork = function(data) {
    console.info('New Virtual Cloud Network');
    this.getVirtualCloudNetworks().push(new VirtualCloudNetwork(data, this));
    return this.getVirtualCloudNetworks()[this.getVirtualCloudNetworks().length - 1];
}
OkitJson.prototype.getVirtualCloudNetworks = function() {
    if (!this.virtual_cloud_networks) this.virtual_cloud_networks = [];
    return this.virtual_cloud_networks;
}
OkitJson.prototype.getVirtualCloudNetwork = function(id='') {
    for (let artefact of this.virtual_cloud_networks) {
        if (artefact.id === id) {
            return artefact;
        }
    }
    return undefined;
}
OkitJson.prototype.getVcn = function(id='') {
    return this.getVirtualCloudNetwork(id);
}
OkitJson.prototype.deleteVirtualCloudNetwork = function(id) {
    this.virtual_cloud_networks = this.virtual_cloud_networks ? this.virtual_cloud_networks.filter((r) => r.id !== id) : []
}
