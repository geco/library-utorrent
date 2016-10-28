module.exports = {

  friendlyName: 'List Torrents',

  description: 'List all Torrents from the uTorrent client.',

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
    client.call("list", function(err, data) {
      if (err) {
        return exits.error(err);
      }
      var torrents = data.torrents;
      torrents = torrents.map(function(info) {
        return {
          parsed: {
            hash: info[0],
            name: info[2],
            size: info[3],
            percentProgressMils: info[4],
            downloadedBytes: info[5],
            uploadedBytes: info[6],
            ratioMils: info[7],
            uploadspeedBytesSec: info[8],
            downloadspeedBytesSec: info[9],
            etaSec: info[10],
            peersConnected: info[12],
            peersSwarm: info[13],
            seedsConnected: info[14],
            seedsSwarm: info[15],
            availabilty: info[16]/65536,
            queueOrder: info[17],
            remainingBytes: info[18],            
            torrentUrl: info[19],
            status: info[21],
            downloadDir: info[26]
          },
          raw: info
        };
      });
      return exits.success(torrents);
    });
  },

};
