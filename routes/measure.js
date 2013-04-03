
exports.setModel = function(model){
  this.model = model;
}

exports.index = function(req, res, callback){
  var entries = JSON.parse(req.body.entries);
  for (var i=0;i<entries.length;i++) 
		entries[i].userId = (req.body.userId);    
  this.model.addMeasurement(entries, function(err) {
    if (res != null) {    
      if (err == null)
        res.json(200);
      else
        res.json(401);
    }
    callback();  
  });
}; 