module.exports = {

  friendlyName: 'Start Torrent',

  description: 'Start downloading the torrent specified by the hash parameter.',

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
    },
    force: {
      example: false,
      required: false
    }
  },

  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },

  fn: function (inputs, exits) {
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
    var action = 'start';
    if (inputs.force) action = 'forcestart';
    client.call(action, options, function (err, data) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(data);
    });

  },

};
