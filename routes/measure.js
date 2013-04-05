
exports.setModel = function(model){
  exports.model = model;
}

exports.index = function(req, res, callback){
  var entries = JSON.parse(req.body.entries);
  for (var i=0;i<entries.length;i++) 
		entries[i].userId = (req.body.userId);    
  exports.model.addMeasurements(entries, function(err) {
    if (res != null) {    
      if (err == null)
        res.send(200);
      else
        res.send(401);
    }
    
    // Only run callback if is not work express. Used in mocha for testing purposes.
    if (callback.name != "callbacks") 
      callback();  
  });
}; 