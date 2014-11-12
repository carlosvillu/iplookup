var net = require( 'net' );

module.exports = function( router ){
  return router.param( 'ip', function( req, res, next, ip ){
    next( net.isIPv4(ip) ? '' : 'route' ); // or 404
  } );
};
