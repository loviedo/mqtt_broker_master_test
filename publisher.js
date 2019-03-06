var mqtt = require('mqtt');

//var client  = mqtt.connect('mqtt://216.70.112.44')
var client  = mqtt.connect('mqtt://localhost')

var message = {
    topic: '/hello/world',
    payload: 'DATOS ', // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
};




client.on('connect', function (connack) { 
setInterval(function() {
    client.publish(message, function() 
        {console.log('done!'); }
    );
    }, 10000);
});