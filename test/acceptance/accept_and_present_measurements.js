var assert = require("assert");
var rest = require('restler');
var _ = require('underscore');
var webdriverjs = require("webdriverjs");
var async = require("async");
var util = require('util');

var client = webdriverjs.remote({desiredCapabilities:{browserName:"opera"}}); 

var maxTimeoutAcceptable = 2500;

describe('rexperi', function(){
  it('accepts measurements and presents them to authenticated users', function(done) {    
    this.timeout(100000);
    
    // 1.log in -> slett measurements
    // 2.rest post
    // 3.web
    
    async.series([
      function(cb){
        client
          .init()
          .url(process.env.REXPERI_STAGING_URL)
          .setValue("#username", "admin")
          .setValue("#password", "vgsonu")
          .submitForm("#signin_form")   
          .waitFor("#clear_measurements", maxTimeoutAcceptable)
          .click("#clear_measurements")
          .waitFor("#status .ok", maxTimeoutAcceptable, function(result){
            assert(result.value != -1, "Failed to clear measurements");
          })
          .end()
          cb();
      },
      function(cb){
        rest.post(process.env.REXPERI_STAGING_URL+'/measure', {
          data:{userId: 'per1',
          entries: '[{"timeStamp":"20132203-2113", "eventId": 2, "projectId":4},{"timeStamp":"20132203-2114", "eventId": 3, "projectId":5}]'
        }}).on('complete', function(data, res) {
          assert(res.statusCode == 200);
          cb();
        });          
      },
      function(cb){
        client
          .init()
          .url(process.env.REXPERI_STAGING_URL)
          .setValue("#username", "admin")
          .setValue("#password", "vgsonu")
          .submitForm("#signin_form")
          .waitFor("#raw_measurements", maxTimeoutAcceptable, function() {
            cb();
          });       
      },
      function(cb){      
        async.series([
          function(cb){
            client.getValue("#raw_measurements div:nth-child(1)", function(data) {
              assert(data == "20132203-2113;4;2;per1");
              cb();
            })          
          },
          function(cb){
            client.getValue("#raw_measurements div:nth-child(2)", function(data) {
              assert(data == "20132204-2114;5;3;per1");
              
              client.end(function(){
                done();
                cb();
              });               
            })          
          }          
        ]);
      }
    ]);   
  });
});
