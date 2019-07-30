var mqtt = require('mqtt');



//error de invalid topic: https://stackoverflow.com/questions/49907529/google-cloud-iot-invalid-mqtt-publish-topic


var payload = "DATOS Y MAS DATOS //// sdfsdf 01 02";

var opciones={
    clientId:"cliente_mqtt01",
    username:"admin",
    password:"admin123",
    clean:true
};

//conectamos al mqtt, pasamos las opciones de conexion
var client  = mqtt.connect('mqtt://216.70.112.44',opciones)
//var client  = mqtt.connect('mqtt://localhost',opciones)


/*client.on('connect', function () {
    client.subscribe('test/mqtt/');
    console.log('cliente subscripto');

});*/


//conectamos al broker MQTT
if (client.connected == true){
    client.subscribe('test/mqtt/');
    console.log('cliente subscripto');
}

//si se conecta debe publicar para probar y vemos qué payload recibe, debe ser el json
setInterval(function(){
    if (client.connected == true){
        client.publish('test/mqtt/',payload);
        console.log('mensaje enviado/ topico: test/mqtt/ payload: ' + payload);
    }
},10000); 


/*client.on('connect', function(){
    client.publish('test/mqtt/',payload);
    console.log('mensaje enviado');
    setInterval(function(){
        client.publish('test/mqtt/',payload);
        console.log('mensaje enviado');
    },10000); 
});*/

//cuando el server envia un mensaje
client.on('message', function (topic, message) {
    var context = message.toString();//mensaje leido
    console.log("sads "+ context)
})
