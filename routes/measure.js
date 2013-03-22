
exports.measure = function(req, res){
  var entries = JSON.parse(req.body.entries);
  console.log(entries[0].eventId);
};