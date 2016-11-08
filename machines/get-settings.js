  module.exports = {

  friendlyName: 'Get Settings',

  description: 'Get all settings from the uTorrent client.',

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
    // console.log(client, typeof client.call, client.call);
    client.call("getsettings", function(err, data) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(data);
      /*
      {
      	"build": BUILD NUMBER (integer),
      	"settings": [
      	[
      	OPTION NAME (string),
      	TYPE* (integer),
      	VALUE (string)	],
      	...
      	]
      }
      */
    });
  },

};
