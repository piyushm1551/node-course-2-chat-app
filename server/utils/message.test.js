var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
  it('should generate correct message object',() => {
      var from = 'Piyush';
      var text = 'This is no war';
      var message = generateMessage(from,text);
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from,text})
  });

});

describe('generateLocationMessage',() => {
  it('should generate correct Location object',() => {
    var from = 'Piyush';
    var latitude = 1 ;
    var longitude = 1 ;
    var url= generateLocationMessage(from,latitude,longitude);
    expect(url.createdAt).toBeA('number');
    //expect(url).toInclude({from,url});
    expect(url.url).toEqual(`https://www.google.com/maps?q=${latitude},${longitude}`);
    console.log(url.url);
  });
});
