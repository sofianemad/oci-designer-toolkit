/*
** Copyright (c) 2020, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded Application Javascript');

/*
** Define Application Class
*/
class Application extends OkitArtifact {
    /*
    ** Create
    */
    constructor (data={}, okitjson={}) {
        super(okitjson);
        // Configure default values
        this.display_name = this.generateDefaultName(okitjson.applications.length + 1);
        this.compartment_id = data.parent_id;
        this.app_id = null;
        this.app_short_name = null;
	this.app_tenancy = null;
	this.app_description = null;
	this.app_lob = null;
	this.app_owner = null;
	this.app_legal_hold = null;
	this.app_cost_center = null;
	this.app_environment = null;

	/*
        ** TODO: Add Resource / Artefact specific parameters and default
        */
        // Update with any passed data
        this.merge(data);
        this.convert();
        // TODO: If the Resource is within a Subnet but the subnet_iss is not at the top level then raise it with the following functions if not required delete them.
        // Expose subnet_id at the top level
        Object.defineProperty(this, 'subnet_id', {get: function() {return this.primary_mount_target.subnet_id;}, set: function(id) {this.primary_mount_target.subnet_id = id;}, enumerable: false });
    }
    /*
    ** Clone Functionality
    */
    clone() {
        return new Application(JSON.clone(this), this.getOkitJson());
    }
    /*
    ** Name Generation
    */
    getNamePrefix() {
        return super.getNamePrefix() + 'a';
    }
    /*
    ** Static Functionality
    */
    static getArtifactReference() {
        return 'Application';
    }
}
/*
** Dynamically Add Model Functions
*/
OkitJson.prototype.newApplication = function(data) {
    this.getApplications().push(new Application(data, this));
    return this.getApplications()[this.getApplications().length - 1];
}
OkitJson.prototype.getApplications = function() {
    if (!this.applications) {
        this.applications = [];
    }
    return this.applications;
}
OkitJson.prototype.getApplication = function(id='') {
    for (let artefact of this.getApplications()) {
        if (artefact.id === id) {
            return artefact;
        }
    }
return undefined;
}
OkitJson.prototype.deleteApplication = function(id) {
    for (let i = 0; i < this.applications.length; i++) {
        if (this.applications[i].id === id) {
            this.applications[i].delete();
            this.applications.splice(i, 1);
            break;
        }
    }
}

