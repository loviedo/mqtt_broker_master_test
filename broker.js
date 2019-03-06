
//https://medium.com/@alifabdullah/setting-up-private-mqtt-broker-using-mosca-in-node-js-c61a3c74f952

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

server.on('ready', setup);

server.on('clientConnected', function(client) {
  console.log('cliente conectado', client.id);	

  //aqui debe ir la logica segun el mensaje que recibamos
  console.log("Connected!");
  var sql = "INSERT INTO test_mqtt (campo1) VALUES ('CONECTADO CLIENTE')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("insertado test");
  });
});


//accion cuando recibimos mensaje
server.on('published', function(packet, client) {
  console.log('Publicado', packet.payload);
  //insertamos lo publicado


});


//mensaje cuando el server mqtt esta arriba
function setup() {
  console.log('Mosca levantado');
  //al levantar insertamos en el mysql
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO test_mqtt (campo1) VALUES ('levantado server')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("insertado test");
    });
  });
}