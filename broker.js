
//https://medium.com/@alifabdullah/setting-up-private-mqtt-broker-using-mosca-in-node-js-c61a3c74f952
//https://www.npmjs.com/package/
//https://www.npmjs.com/package/mqtt-connection

//mas links de interes
//http://www.mosca.io/docs/lib/server.js.html
//https://github.com/mcollina/mosca/wiki/Authentication-&-Authorization
//http://www.steves-internet-guide.com/using-node-mqtt-client/

/* El broker */
var mosca = require('mosca');
var mysql = require('mysql');//instaciamos mysql
var autenticado = false;

//conexion al mongo
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

//cliente conectadoW
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

  //insertamos el mensaje
  var sql = "INSERT INTO test_mqtt (campo1,campo2,campo3) VALUES ('" + client +  "','" + packet.topic +  "','" + JSON.stringify(packet.payload.toString()) + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("insertado mensaje auth");
  });


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


// Aceptamos la conexion si las credenciales son validas
var auth_inicial = function(client, username, password, callback) {

  //el cliente espera a ver si esta autorizado o no
  console.log('viene> ' + username + ' / ' + password);
  var authorized = (username === 'admin' && password.toString() === 'admin123');
  if (authorized && !autenticado) {
    autenticado = true;
    client.user = username;
    console.log('autenticado: usuario ' + client.user + ' pass:' + password.toString());//debug

    //insertamos que esta autenticado
    var sql = "INSERT INTO test_mqtt (campo1,campo2,campo3) VALUES ('" + client.id +  "','" + client.user +  "','" + password.toString() + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("insertado mensaje auth");
    });
  }

  callback(null, authorized);//return si esta o no autenticado.
}

// In this case the client authorized as admin can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var auth_pub = function(client, topic, payload, callback) {
  callback(null, client.user == topic.split('/')[1]);

}

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var auth_sub = function(client, topic, callback) {
  callback(null, client.user == topic.split('/')[1]);

}

//mensaje cuando el server mqtt esta arriba
function setup() {
  console.log('Mosca levantado');

  //cargamos las confs de permisos
  server.authenticate = auth_inicial;
  //server.authorizePublish = auth_pub;
  //server.authorizeSubscribe = auth_sub;

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