module.exports = {


  friendlyName: 'Get Torrent Details',


  description: 'Get details of a Torrent from uTorrent client.',


  cacheable: false,


  sync: false,


  inputs: {
    host: {
      example: 'localhost',
      required: true
    },
    port: {
      example: 26085,
      required: true
    },
    username: {
      example: 'admin',
      required: true
    },
    password: {
      example: '12345',
      required: true
    },
    hash: {
      example: '',
      required: true
    }


  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits) {
    var Machine = require('machine');
    var createClient = Machine.build(require('./create-client'));
    var client = createClient({
      host: inputs.host,
      port: inputs.port,
      username: inputs.username,
      password: inputs.password,
    }).execSync();
    var options = {
      'hash': inputs.hash
    };
    client.call("getfiles", options, function(err, data) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(data);
      /*
      {
      	"build": BUILD NUMBER (integer),
      	"files": [
      	HASH (string),
      	[
      	[
      	FILE NAME (string),
      	FILE SIZE (integer in bytes),
      	DOWNLOADED (integer in bytes),
      	PRIORITY* (integer)	],
      	...
      	]
      	]
      }
      */
    });
  }


};
