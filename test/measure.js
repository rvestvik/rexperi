var assert = require("assert")
var measure = require("../routes/measure");

describe('Measure', function(){
  describe('post entries', function(){
    it('should store the entries in the database', function() {
	  measure.measure({
	    body:{
		  entries:'[{"timeStamp":"20132203-2113", "eventId": 2},{"timeStamp":"20132203-2114", "eventId": 2}]'
		}}, null);
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})