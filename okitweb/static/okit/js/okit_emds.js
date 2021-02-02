class emdsApplications {
    constructor() {
        this.applications = []
        this.loadApplications();

    }

    loadApplications(){
        let me = this;
        $.ajax({
            type: 'get',
            url: 'https://emds-stage.appoci.oraclecorp.com/ords/eams/amds/app_data',
            dataType: 'text',
            contentType: 'application/json',
            success: function(resp) {
                console.info(resp);
                const json_resp = JSON.parse(resp);
                me.applications=json_resp.items;
            },
            error: function(xhr, status, error) {
                console.warn('Status : '+ status);
                console.warn('Error  : '+ error);
            }
        });
    }

}

const emds = new emdsApplications();