var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://216.70.112.44')
var client  = mqtt.connect('mqtt://localhost')

//error de invalid topic: https://stackoverflow.com/questions/49907529/google-cloud-iot-invalid-mqtt-publish-topic


var payload = "user:'usuario', pass:'admin1', accion: 'autenticame'";


client.on('connect', function () {
    client.subscribe('test/mqtt/');
    console.log('cliente subscripto');
});

client.on('connect', function(){
    client.publish('test/mqtt/',payload);
    console.log('mensaje enviado');
    /*setInterval(function(){
        client.publish('test/mqtt/',payload);
        console.log('mensaje enviado');
    },10000); */
});

client.on('message', function (topic, message) {
    var context = message.toString();//mensaje leido
    console.log("sads "+ context)
    })
