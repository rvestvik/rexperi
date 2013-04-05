var mongodb = require('mongodb');

var url = process.env.MONGOHQ_URL || "mongodb://localhost:27017/rexperi";

exports.connect = function(cb) {
	mongodb.Db.connect(url, function(error, db) {
    exports.db = db;
    cb(error);
  });
}

exports.close = function() {
	exports.db.close();
}

exports.clearMeasurements = function(cb) {
  exports.db.collection('measurements', function(error, collection) {
    collection.remove({}, function(err) {
      cb();
    });
  });        
};

exports.addMeasurements = function(entries, cb) {
  exports.db.collection('measurements', function(error, collection) {
    collection.insert(entries, function(err, docs) {
      cb();
    });
  });        
};

exports.getMeasurements = function(cb) {
  exports.db.collection('measurements', function(error, collection) {
    collection.find().toArray(function(err, measurements) {
      cb(err, measurements);
    });
  });        
};
