var assert = require("assert")
var measure = require("../routes/measure");
var sinon = require('sinon');

var res = { json: function () {} };
var resSpy = sinon.spy(res, "json");  
    
describe('measure', function(){
  it('should store given entries in the model', function(done) {
    var model = { addMeasurement: function (entries, cb) {cb();} };
    var modelSpy = sinon.spy(model, "addMeasurement");    
    
    measure.setModel(model);
	  measure.index({
	    body:{ 
      userId: 'user123',
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2},{"timeStamp":"20132203-2114", "eventId": 2}]'
      }}, 
      null,
      function() {       
        assert(modelSpy.withArgs([
          {"userId":"user123", "timeStamp":"20132203-2113", "eventId": 2},
          {"userId":"user123", "timeStamp":"20132203-2114", "eventId": 2}
        ]).calledOnce);
        
        done();
      }
    );    
  })
  
  it('should return 200 if succeded storing measurement', function(done) {
    var model = { addMeasurement: function () {} };
    var modelStub = sinon.stub(model, "addMeasurement");  
    modelStub.callsArgWith(1, null); // No error 
    
    measure.setModel(model);
	  measure.index({
	    body:{ 
      userId: 'user123',
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2}]'
      }}, 
      res,
      function() {       
        assert(resSpy.withArgs(200).calledOnce);
        done();
      }
    );    
  })
  
  it('should return 401 if failed storing measurement', function(done) {
    var model = { addMeasurement: function () {} };
    var modelStub = sinon.stub(model, "addMeasurement");  
    modelStub.callsArgWith(1, "An error!!");  
    
    measure.setModel(model);
	  measure.index({
	    body:{ 
      userId: 'user123',
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2}]'
      }}, 
      res,
      function() {       
        assert(resSpy.withArgs(401).calledOnce);
        done();
      }
    );    
  })    
})