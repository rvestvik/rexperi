
/*
 * GET home page.
 */

exports.setModel = function(model){
  exports.model = model;
}

exports.index = function(req, res){
  exports.model.getMeasurements(function(err, measurements){
    res.render('overview', {measurements:measurements});
  });
};