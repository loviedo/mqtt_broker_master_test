
//https://medium.com/@alifabdullah/setting-up-private-mqtt-broker-using-mosca-in-node-js-c61a3c74f952
//https://www.npmjs.com/package/
//https://www.npmjs.com/package/mqtt-connection

/* El broker */
var mosca = require('mosca');
var mysql = require('mysql');//instaciamos mysql

var mongodb = {
  //using
  type: 'mongo',		
  //url: 'mongodb://test:test123@localhost:27017/agenda_demo',
  url: 'mongodb://localhost:27017',
  pubsubCollection: 'test',
  //user: 'test',
  //password: 'test123',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  //sacamos el mongo para test
  /*backend: mongodb,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/'
  }*/
};


/* SETTING MySQL */
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Super123",
  port: 3306,
  database: "test"
});

var server = new mosca.Server(moscaSettings);

//funcion ejecutada al levantar el server
server.on('ready', setup);

server.on('clientConnected', function(client) {
  console.log('cliente conectado', client.id);	

  //aqui debe ir la logica segun el mensaje que recibamos
  //console.log("cliente conectdo --- datos");
  /*var sql = "INSERT INTO test_mqtt (campo1, campo2) VALUES ('CONECTADO CLIENTE','" + client.user + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("insertado conexion inicial");
  });*/
});




//accion cuando recibimos mensaje
server.on('published', function(packet, client) {
  //let json = JSON.stringify(packet);
  //console.log('payload:', packet);
  //console.log('payload:', json);
  console.log('cliente:', client,'TOPICO:', packet.topic, ' payload: ', JSON.stringify(packet.payload.toString()));

  //ENVIANDO DATOS DEL SERVER A LOS CLIENTES -- CUANDO RECIBIMOS MENSAJE Y ES CIERTO TOPICO
 /*
 var message = {
    topic: '/test/mqtt',
    payload: 'abcde', // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
  };

  server.publish(message, function() {
    console.log('enviado mensaje');
  });*/

  //console.log('cliente', client);
  /*var sql = "INSERT INTO test_mqtt (campo1,campo2) VALUES ('mensaje','" + packet.payload +  "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("insertado mensaje");
  });*/
  //insertamos lo publicado

});


//mensaje cuando el server mqtt esta arriba
function setup() {
  console.log('Mosca levantado');

  //al levantar insertamos en el mysql
  con.connect(function(err) {
    if (err) throw err;
      
    /*console.log("Connected!");

    var sql = "INSERT INTO test_mqtt (campo1,campo2) VALUES ('levantado server','timestamp')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("insertado test");
    });
  */
  });
}