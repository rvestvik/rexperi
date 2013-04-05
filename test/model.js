var assert = require("assert")
var model = require("../lib/model");
var sinon = require('sinon');
var _ = require('underscore');

describe('model', function(){
  it('stores and retrives measurements', function(done) {
    model.connect(function(error) {
      model.clearMeasurements(function() {
        var inputMeasurements = [
          {"userId":"user123", "timeStamp":"20132203-2113", "eventId": 1},
          {"userId":"user123", "timeStamp":"20132203-2114", "eventId": 2}
        ];
        model.addMeasurements(inputMeasurements,
        function() {
          model.getMeasurements(function(err, outputMeasurements){
            delete outputMeasurements[0]._id;
            delete outputMeasurements[1]._id;
            assert(_.isEqual([
              {"userId":"user123", "timeStamp":"20132203-2113", "eventId": 1},
              {"userId":"user123", "timeStamp":"20132203-2114", "eventId": 2}
            ], outputMeasurements));
            model.close();
            done();
          });        
        });      
      });     
    })
  });
});