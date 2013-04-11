var assert = require("assert");
var rest = require('restler');
var _ = require('underscore');

describe('REST API', function(){
  it('accepts measurements', function(done) {
    rest.post(process.env.REXPERI_STAGING_URL+'/measure', {
      data:{userId: 'per1',
      entries: '[{"timeStamp":"20132203-2113", "eventId": 2}]'
    }}).on('complete', function(data, res) {
      assert(res.statusCode == 200);
      done();
    });    
  });
});