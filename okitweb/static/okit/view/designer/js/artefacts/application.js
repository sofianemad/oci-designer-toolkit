/*
** Copyright (c) 2020, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded Application View Javascript');

/*
** Define Application View Class
*/
class ApplicationView extends OkitArtefactView {
    constructor(artefact=null, json_view) {
        super(artefact, json_view);
    }
    // TODO: Return Artefact Parent id Compartment
    get parent_id() {return this.artefact.compartment_id;}
    // TODO: Return Artefact Parent Object 
    get parent() {return this.getJsonView().getCompartment(this.parent_id);}
    /*
     ** SVG Processing
     */
     // Add Specific Mouse Events
    addAssociationHighlighting() {
    	for (let instance of this.getOkitJson().getInstances()) {
        	if (instance.application_ids.includes(this.id)) {
			$(jqId(instance.id)).addClass('highlight-association');
		}
        }
	$(jqId(this.artefact_id)).addClass('highlight-association');
    }
    removeAssociationHighlighting() {
    	for (let instance of this.getOkitJson().getInstances()) {
		if (instance.application_ids.includes(this.id)) {
			$(jqId(instance.id)).removeClass('highlight-association');
            	}
	}
	$(jqId(this.artefact_id)).removeClass('highlight-association');
    }

    /*
    ** SVG Processing
    */
    /*
    ** Property Sheet Load function
    */
    loadProperties() {
        const self = this;
        $(jqId(PROPERTIES_PANEL)).load("propertysheets/application.html", () => {loadPropertiesSheet(self.artefact);});
    }
    /*
    ** Load and display Value Proposition
    */
    loadValueProposition() {
        $(jqId(VALUE_PROPOSITION_PANEL)).load("valueproposition/application.html");
    }
    /*
    ** Static Functionality
    */
    static getArtifactReference() {
        return Application.getArtifactReference();
    }
    static getDropTargets() {
        // TODO: Return List of Artefact Drop Targets Parent Object Reference Names e.g. VirtualCloudNetwork for a Internet Gateway
        return [Compartment.getArtifactReference()];
    }
}
/*
** Dynamically Add View Functions
*/

OkitJsonView.prototype.dropApplicationView = function(target) {
    let view_artefact = this.newApplication();
    if (target.type === Compartment.getArtifactReference()) {
        view_artefact.artefact.compartment_id = target.id;
    } else {
        view_artefact.artefact.compartment_id = target.compartment_id;
    }
    view_artefact.recalculate_dimensions = true;
    return view_artefact;
}
OkitJsonView.prototype.newApplication = function(obj) {
    this.getApplications().push(obj ? new ApplicationView(obj, this) : new ApplicationView(this.okitjson.newApplication(), this));
    return this.getApplications()[this.getApplications().length - 1];
}
OkitJsonView.prototype.getApplications = function() {
    if (!this.applications) {
        this.applications = [];
    }
    return this.applications;
}
OkitJsonView.prototype.getApplication = function(id='') {
    for (let artefact of this.getApplications()) {
        if (artefact.id === id) {
            return artefact;
        }
    }
    return undefined;
}
OkitJsonView.prototype.loadApplications = function(applications) {
    for (const artefact of applications) {
        this.getApplications().push(new ApplicationView(new Application(artefact, this.okitjson), this));
    }
}
OkitJsonView.prototype.moveApplication = function(id) {
    // Build Dialog
    const self = this;
    let application = this.getApplication(id);
    $(jqId('modal_dialog_title')).text('Move ' + application.display_name);
    $(jqId('modal_dialog_body')).empty();
    $(jqId('modal_dialog_footer')).empty();
    const table = d3.select(d3Id('modal_dialog_body')).append('div')
        .attr('class', 'table okit-table');
    const tbody = table.append('div')
        .attr('class', 'tbody');
    // Application
    let tr = tbody.append('div')
        .attr('class', 'tr');
    tr.append('div')
        .attr('class', 'td')
        .text('Application');
    tr.append('div')
        .attr('class', 'td')
        .append('select')
        .attr('id', 'move_application_id');
    // Load Applications
    this.loadApplications('move_application_id');
    $(jqId("move_application_id")).val(application.artefact.application_id);
    // Submit Button
    const submit = d3.select(d3Id('modal_dialog_footer')).append('div').append('button')
        .attr('id', 'submit_query_btn')
        .attr('type', 'button')
        .text('Move')
        .on('click', function () {
            $(jqId('modal_dialog_wrapper')).addClass('hidden');
            if (application.artefact.application_id !== $(jqId("move_application_id")).val()) {
                self.getApplication(application.artefact.application_id).recalculate_dimensions = true;
                self.getApplication($(jqId("move_application_id")).val()).recalculate_dimensions = true;
                application.artefact.application_id = $(jqId("move_application_id")).val();
                application.artefact.compartment_id = self.getApplication(application.artefact.application).artefact.compartment_id;
            }
            self.update(this.okitjson);
        });
    $(jqId('modal_dialog_wrapper')).removeClass('hidden');
}
OkitJsonView.prototype.pasteApplication = function(drop_target) {
    const clone = this.copied_artefact.artefact.clone();
    clone.display_name += 'Copy';
    if (this.paste_count) {clone.display_name += `-${this.paste_count}`;}
    this.paste_count += 1;
    clone.id = clone.okit_id;
    if (drop_target.getArtifactReference() === Application.getArtifactReference()) {
        clone.application_id = drop_target.id;
        clone.compartment_id = drop_target.compartment_id;
    }
    this.okitjson.applications.push(clone);
    this.update(this.okitjson);
}
OkitJsonView.prototype.loadApplicationsSelect = function(select_id, empty_option=false) {
    $(jqId(select_id)).empty();
    const application_select = $(jqId(select_id));
    if (empty_option) {
        application_select.append($('<option>').attr('value', '').text(''));
    }
    for (let application of this.getApplications()) {
        application_select.append($('<option>').attr('value', application.id).text(application.display_name));
    }
}
OkitJsonView.prototype.loadApplicationsMultiSelect = function(select_id) {
    $(jqId(select_id)).empty();
    const multi_select = d3.select(d3Id(select_id));
    for (let application of this.getApplications()) {
        const div = multi_select.append('div');
        div.append('input')
            .attr('type', 'checkbox')
            .attr('id', safeId(application.id))
            .attr('value', application.id);
        div.append('label')
            .attr('for', safeId(application.id))
            .text(application.display_name);
    }
}
