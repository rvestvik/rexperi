var sys = require('util'),
    rest = require('restler');

//rest.post('http://localhost:3000/measure', {
rest.post('http://rexperi-staging.herokuapp.com/measure', {
  data:{userId: 'per1',
  entries: '[{"timeStamp":"20132203-2113", "eventId": 2}]'
}}).on('complete', function(data, res) {
  process.exit(res.statusCode == 200 ? 0:1);
});