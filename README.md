
# What is this ?
İleti Yönetim Sistemi Entegrasyonunu kolaylaştırır.


# Installation
```
npm i iys --save
```

# Usage
```
const iys = require('iys');

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
        "recipient": "+9055xxxxxxxx", // sample: +9055xxxxxxxx
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
        "recipient": "+9055xxxxxxxx", // sample: +9055xxxxxxxx
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
```



# Options

Bu modülde iki metot kullanılır.

* set_status ile durum, ONAY ya da RET olarak ayarlanır.
* get_status ile son durum görüntülenir.


Not: 
* Durum ilk defa girilecekse RET olamaz.
* Varsayılan olarak demo bilgileri ile çalışır. Canlıya almak için gerçek api bilgileri girilmeli ve status "LIVE olarak değiştirilmelidir".


# Sample Response
```
{
  get_status: {
    type: 'MESAJ',
    source: 'HS_WEB',
    recipient: '+9055xxxxxxxx',
    status: 'RET',
    consentDate: '2021-09-04 19:59:58',
    recipientType: 'BIREYSEL',
    creationDate: '2021-09-04 20:59:11',
    retailerAccessCount: 0,
    transactionId: '1cd1e05fb8393773ab8ffbe38869738cd2309ec89b1c24905e707c0475a348fe'
  }
}
{
  set_status: {
    transactionId: 'f90b6c9c7ff30e485f630b066720c20bdbab5fa7d4482a1a3ec1106f9aef4a08',
    creationDate: '2021-09-04 21:36:49'
  }
}
```
