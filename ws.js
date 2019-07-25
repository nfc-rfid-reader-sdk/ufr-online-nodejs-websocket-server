var WebSocketServer = require('ws').Server,
ws = new WebSocketServer({port: 8181})

var previewWs; 

const byteArray =  new Uint8Array(7);

  byteArray[0] = 0x55;
  byteArray[1] = 0x26;
  byteArray[2] = 0xaa;
  byteArray[3] = 0x00;
  byteArray[4] = 0x01;
  byteArray[5] = 0x01;
  byteArray[6] = 0xe0;
  
ws.on('connection', function (ws, req) {
	const ip = req.connection.remoteAddress;
	if(ip.length == 19)
	{
	console.log('uFR Online connected: %s', ip.substring(7))
	ws.on('message', function (message) {
	  if(message.length>0 && message[0]!=0xDE && message[2]!=0xED)
	  {		
		console.log('Received UID %s from %s, sending beep.', bin2string(message), ip.substring(7))
		ws.send(byteArray)
		if(previewWs != null)
		{
			previewWs.send(bin2string(message) + " " + ip.substring(7));
		}
	  }
	  

  })
	}
	else
	{
		previewWs = ws;
	}
})

function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length-1; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}