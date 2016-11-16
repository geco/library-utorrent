
# library-utorrent

Communicate with uTorrent Web API to list and add torrents, wraps the uTorrent Web API: __<a href="http://help.utorrent.com/customer/portal/topics/664593/articles" title="uTorrent Web API"  target="_blank">http://help.utorrent.com/customer/portal/topics/664593/articles</a>__


## Installation

```sh
$ npm install library-utorrent --save
```

## Usage

Load the library:
```javascript
var UTorrent = require('library-utorrent');
```

#### Add a Torrent file:
```javascript
UTorrent.addTorrent({
  host: 'localhost',
  port: 26085,
  username: 'admin',
  password: '12345',
  torrentContents: fileBufferWithTorrentContent,
  downloadDir: 0,
  path: '/dir/path/',
}).exec({
  // An unexpected error occurred.
  error: function (err){

  },
  // OK.
  success: function (){

  }
});
```
#### Add a Torrent url:
```javascript
UTorrent.addTorrentUrl({
  host: 'localhost',
  port: 26085,
  username: 'admin',
  password: '12345',
  torrentUrl: urlOrMagnet,
  downloadDir: 0,
  path: '/dir/path/',
}).exec({
  // An unexpected error occurred.
  error: function (err){

  },
  // OK.
  success: function (){

  }
});
```
#### List all Torrents and details:
```javascript
UTorrent.listTorrents({
  host: 'localhost',
  port: 26085,
  username: 'admin',
  password: '12345',
}).exec({
// An unexpected error occurred.
  error: function (err){

  },
  // OK.
  success: function (torrents){
    /*
    torrents is an array of objects:
    [{
      parsed: {
        hash,
        name,
        size
        percentProgressMils,
        downloadedBytes,
        uploadedBytes,
        ratioMils,
        uploadspeedBytesSec,
        downloadspeedBytesSec,
        etaSec,
        peersConnected,
        peersSwarm,
        seedsConnected,
        seedsSwarm,
        availability,
        queueOrder,
        remainingBytes,
        torrentUrl,
        status,
        downloadDir
      },
      raw
    }, ...]
    */
  }
});
```
#### List Torrent Contents:
```javascript
UTorrent.getTorrentDetails({
  host: 'localhost',
  port: 26085,
  username: 'admin',
  password: '12345',
  hash: 'torrentHash'
}).exec({
// An unexpected error occurred.
  error: function (err){

  },
  // OK.
  success: function (result){
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
  }
});
```
#### Remove, start and stop torrent:
```javascript
UTorrent.removeTorrent({...credentials, hash: 'torrentHash'}) // remove or removedata (with param removedata=true)
UTorrent.startTorrent({...credentials, hash: 'torrentHash'}) // start or forcestart (with param force=true)
UTorrent.stopTorrent({...credentials, hash: 'torrentHash'})
```
#### Retrieve uTorrent settings:
```javascript
UTorrent.getsettings({
  host: 'localhost',
  port: 26085,
  username: 'admin',
  password: '12345'
}).exec({
  // An unexpected error occurred.
  error: function (err){

  },
  // OK.
  success: function (result){
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
  }
});
```
- OPTION NAME is the name of the setting. They are not listed here, as some of the settings (particularly advanced ones) vary with each version and most are self-explanatory
- TYPE is an integer value that indicates what type of data is enclosed within the VALUE string. The following is a list of the possible TYPEs and what VALUE type it corresponds to:
  * 0 = Integer
  * 1 = Boolean
  * 2 = String


## About
##### This is the new mantained version of the library.
(Used by <a href="https://github.com/geco/utorrent-console" title="Manage your uTorrent from console">https://github.com/geco/utorrent-console</a>)

## License

MIT &copy; 2016 contributors
