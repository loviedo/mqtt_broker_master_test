var mqtt = require('mqtt')


var client  = mqtt.connect('mqtt://localhost')


client.on('connect', function () {
    client.subscribe('topico')
})

client.on('message', function (topic, message) {
context = message.toString();//mensaje leido
console.log(context)
})