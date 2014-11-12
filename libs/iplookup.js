var debug = require( 'debug' )( 'iplookup:libs:iplookup' ),
    csv = require('ya-csv'),
    IP = require( 'ip' );

var IpLookup = function( store ){
  this._store = store;
};

IpLookup.prototype.searchByIp = function( ip ){
  return this._store.find( '' + ip );
};

IpLookup.prototype.generateFromFile = function( file, cb ){
  var self = this,
      reader = csv.createCsvFileReader( file ),
      start = +new Date();
  debug( 'Start to parse %s wait', file );
  reader.on( 'data', function( data ){
    self._store.insert( '' + IP.fromLong( data[0] ), data[2] );
  } )
  .on( 'end', function(){
    debug( 'File %s parsed insert %d ips (%dsec)', file, self._store.getNumberOfRealNodes(), (+new Date() - start) / 1000 );
    process.nextTick( function(){ cb() } );
  } );
};

module.exports = IpLookup;
