module.exports = {

  friendlyName: 'Set Settings',

  description: 'Set specific setting value.',

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
    name: {
      typeclass: '*',
      required: true
    },
    value: {
      typeclass: '*',
      required: true
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
      's': inputs.name,
      'v': inputs.value
    };
    client.call('setsetting', options, function (err, data) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(data);
    });

  },

};
