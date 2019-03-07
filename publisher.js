var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://216.70.112.44')


//error de invalid topic: https://stackoverflow.com/questions/49907529/google-cloud-iot-invalid-mqtt-publish-topic


var payload = "user:'usuario', pass:'admin1', accion: 'autenticame'";

var opciones={
    clientId:"mqttjs01",
    username:"admin",
    password:"admin123",
    clean:true
};

//conectamos al mqtt, pasamos las opciones de conexion
var client  = mqtt.connect('mqtt://localhost',opciones)

client.on('connect', function () {
    client.subscribe('test/mqtt/');
    console.log('cliente subscripto');

    /*setInterval(function(){
        client.publish('test/mqtt/',payload);
        console.log('mensaje enviado');
    },10000); */
});


client.on('connect', function(){
    client.publish('test/mqtt/',payload);
    console.log('mensaje enviado');
    /*setInterval(function(){
        client.publish('test/mqtt/',payload);
        console.log('mensaje enviado');
    },10000); */
});

//cuando el server envia un mensaje
client.on('message', function (topic, message) {
    var context = message.toString();//mensaje leido
    console.log("sads "+ context)
})
