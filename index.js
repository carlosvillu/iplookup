var express = require( 'express' ),
    path = require( 'path' ),
    debug = require( 'debug' )( 'iplookup' ),
    nconf = require( 'nconf' ),
    router = require( './libs/params-validate' )( express.Router() ),
    app = express(),
    IpLookup = require( './libs/iplookup' ),
    Radix = require( './libs/radex-tree' ),
    ipReg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    start = +new Date(),
    ipLookup;


iplookup = new IpLookup( new Radix() );
nconf.argv()
      .env();

var PORT = nconf.get( 'PORT' ) || 3000,
    FILE = nconf.get( 'file' ) || path.join( __dirname, 'db', 'partial.csv' );

router.param( 'ip', ipReg );
router.get( '/api/v1/ip/:ip', function( req, res, next ){
  var ip = req.params.ip[0];

  debug( 'Search for %s ...', ip );
  res.json( { country: iplookup.searchByIp( ip ) } );
} );

router.use( function( req, res, next ){
  res.send( 404, 'Not found' );
} );

app.use('/', router);

iplookup.generateFromFile( FILE, function(){
  app.listen( PORT, function(){
    debug( 'iplookup microservice up and running in port: %d (%dsec)', PORT, (+new Date() - start) / 1000 );
  } );
} );

