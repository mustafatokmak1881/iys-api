var axios = require('axios');


class Iys {
    constructor(){
        this.api_host = 'https://api.sandbox.iys.org.tr';
    }
    get_access_token = () => {
        return new Promise((resolve, reject) => {
                let config = {
                    method:'POST',
                    url: this.api_host+'/oauth2/token',
                    headers: {
                        'content-type': 'application/json'
                    },
                    data:this.api_info
                }
                axios(config).then(response=>{
                    resolve( response.data.access_token );
                });
        });
    }
    init = ( api_info ) => {
        this.api_info = api_info;
        if ( this.api_info.status == "DEMO" ){
            this.api_host = 'https://api.sandbox.iys.org.tr';
        }
        else if( this.api_info.status == "LIVE" ){
            this.api_host = 'https://api.iys.org.tr';
        }
        return new Promise((resolve, reject) => {
            (async()=>{
                this.get_access_token().then(access_token=>{
                    this.access_token = access_token;
                    resolve( access_token );
                });
            })();
        });
    }
    add_zero = ( number ) => {
        if ( number < 10 ){
            return '0'+number;
        }
        else{
            return number;
        }
    }
    convertToConsentDateFormat = () => {
        let t = new Date();
        return t.getFullYear()+'-'
            +this.add_zero( t.getUTCMonth()+1 )+'-'
            +this.add_zero( t.getUTCDate() )+' '
            +this.add_zero( t.getUTCHours())+':'
            +this.add_zero( t.getUTCMinutes() )+':'
            +this.add_zero( t.getUTCSeconds() )
    }
    get_status = ( data ) => {
        let pr = new Promise((resolve, reject) =>{
            var config = {
                method: 'POST',
                url: this.api_host+'/sps/'+this.api_info.iysCode+'/brands/'+this.api_info.brandCode+'/consents/status',
                headers: { 
                  'authorization': 'Bearer '+this.access_token, 
                  'content-type': 'application/json'
                },
                data
            };

            axios(config)
            .then(function (response) {
                resolve( response );
            })
            .catch(function (error) {
                reject( error );
            });
        
        });
        return pr;
    }
    set_status = ( data ) => {
        let pr = new Promise((resolve, reject) =>{
            var config = {
                method: 'POST',
                url: this.api_host+'/sps/'+this.api_info.iysCode+'/brands/'+this.api_info.brandCode+'/consents',
                headers: { 
                'authorization': 'Bearer '+this.access_token,  
                  'content-type': 'application/json'
                },
                data
            };

            axios(config)
            .then(function (response) {
                resolve( response );
            })
            .catch(function (error) {
                reject( error );
            });
        
        });
        return pr;
    }
}


const iys = new Iys;

iys.init({
    "username": "de806b85-8c7f-4fc2-8610-4450abe55ba3",
    "password": "Te)?xn|lVv?0",
    "grant_type": "password",
    "iysCode":669563,
    "brandCode": 669563,
    "status": "DEMO"// DEMO or LIVE
}).then(r => {
    //Durumu değiştirir.
    iys.set_status({
        "type": "MESAJ",
        "source": "HS_WEB",
        "recipient": "+905535554433", // sample: +905532123812
        "status": "ONAY", // sample: ONAY or RET
        "consentDate": iys.convertToConsentDateFormat(), //Sample "2021-09-04 19:46:56"
        "recipientType": "BIREYSEL"
    })
    .then(response => {
        console.log( {set_status:response.data} );
    })
    .catch(response=>{
        console.log( response.response.data.errors);
    });

    //Son durumu görüntüler
    iys.get_status({
        "type": "MESAJ",
        "recipient": "+905532123812", // sample: +905532123812
        "recipientType": "BIREYSEL"
    }) 
    .then(response => {
        console.log( {get_status:response.data} );
    })
    .catch(response => {
        console.log( response.response.data.errors );
    });
}).catch(response => {
    console.log( response );
});





//module.exports = App;





