var assert = require("assert")
var measure = require("../routes/measure");
var sinon = require('sinon');

var res = { send: function () {} };
var model = { addMeasurements: function(entries,cb){cb();}}
var resSpy = sinon.spy(res, "send");  
    
describe('measure', function(){
  it('stores given entries in the model', function(done) {
    var modelSpy = sinon.spy(model, "addMeasurements");    
    
    measure.setModel(model);
	  measure.index({
	    body:{ 
      userId: 'user123',
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2, "projectId":3},{"timeStamp":"20132203-2114", "eventId": 2, "projectId":4}]'
      }}, 
      null,
      function() {       
        assert(modelSpy.withArgs([
          {"userId":"user123", "timeStamp":"20132203-2113", "eventId": 2, "projectId":3},
          {"userId":"user123", "timeStamp":"20132203-2114", "eventId": 2, "projectId":4}
        ]).calledOnce);
        
        model.addMeasurements.restore();
        done();
      }
    );    
  })
  
  it('returns 200 if succeded storing measurement', function(done) {
    var modelStub = sinon.stub(model, "addMeasurements");  
    modelStub.callsArgWith(1, null); // No error 
    
    measure.setModel(model);
	  measure.index({
	    body:{ 
      userId: 'user123',
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2, "projectId":4}]'
      }}, 
      res,
      function() {       
        assert(resSpy.withArgs(200).calledOnce);
        
        model.addMeasurements.restore();
        done();
      }
    );    
  })
  
  it('returns 401 if failed storing measurement', function(done) {

    var modelStub = sinon.stub(model, "addMeasurements");  
    modelStub.callsArgWith(1, "An error!!");  
    
    measure.setModel(model);
	  measure.index({
	    body:{ 
      userId: 'user123',
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2, "projectId":4}]'
      }}, 
      res,
      function() {       
        assert(resSpy.withArgs(401).calledOnce);
        
        model.addMeasurements.restore();
        done();
      }
    );    
  })    
})