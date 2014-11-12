// http://expressjs.com/api.html#router
// easiest way to validate params
module.exports = function( router ){
  router.param(function(name, fn){
    if (fn instanceof RegExp) {
      return function(req, res, next, val){
        var captures;
        if (captures = fn.exec(String(val))) {
          req.params[name] = captures;
          next();
        } else {
          next('route');
        }
      }
    }
  });
  return router;
};
