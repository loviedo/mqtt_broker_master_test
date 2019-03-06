var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://216.70.112.44')
//var client  = mqtt.connect('mqtt://192.168.0.19')


client.on('connect', function () {
setInterval(function() {
client.publish('pepito', 'NAVECITAS HULE');//topic 
console.log('Mensaje enviado');
}, 5000);
});