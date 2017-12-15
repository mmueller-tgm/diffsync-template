console.log('starting sync service!');

let DiffSyncClient = require('diffsync').Client;

let socket = require('socket.io-client');

let client = new DiffSyncClient(socket('http://localhost:3002'), 'form-data');

let data;
client.on('connected', function(){
    // Die Datenreferenz, welche zum synchronisieren verwendet wird.
    data = client.getData();
    console.log('Verbunden!');
    console.log('Daten akutell:');
    console.log(data);

    // Hier können listener erstellt werden
    // Tipp: document.getElementById('xxx').addEventListener(...)
    document.getElementById('submit').addEventListener('click', function () {
        data['fname'] = document.getElementById('form-firstname').value
        data['lname'] = document.getElementById('form-lastname').value
        data['addr'] = document.getElementById('form-address').value
        data['city'] = document.getElementById('form-city').value
        data['postal'] = document.getElementById('form-postalcode').value
        client.sync()
    })

});

client.on('synced', function(){
    // Wird aufgerufen, wenn neue Daten vom Server reinkommen
    console.log('Neue Daten vom Server!');
    console.log('Synchronisierte Daten akutell:');
    console.log(data);
    document.getElementById('form-firstname').value = data['fname']
    document.getElementById('form-lastname').value = data['lname']
    document.getElementById('form-address').value = data['addr']
    document.getElementById('form-city').value = data['city']
    document.getElementById('form-postalcode').value = data['postal']

});

client.initialize();


