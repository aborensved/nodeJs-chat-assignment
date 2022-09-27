const net = require('net');

const awesomeo3000 = [];
const awesomeo8080 = [];

const socketing = () => {
  

  socket.on('error', err => {
    console.log('A user has disconnected...');
  });

  socket.on('close', () => {
    console.log('A user has left the chat...')
  })
}

const address = (socket) => {
  const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Client connected on: ', remoteAddress)
}

const server1 = net.createServer(socket => {
  awesomeo3000.push(socket);

  address(socket);

  socket.on('data', data => {
    broadcastServer1(data, socket);
  });

  socketing;
});

server1.listen(3000, () => {
  console.log('Server listen to: ', server1.address());
});

const broadcastServer1 = (msg, socketSent) => {
  if(msg.toString() === 'quit'){
    const index = awesomeo3000.indexOf(socketSent);
    awesomeo3000.splice(index, 1);
  }else {
    awesomeo3000.forEach(socket => {
      if(socket !== socketSent) socket.write(msg);
    })
  }
}

const server2 = net.createServer(socket => {
  awesomeo8080.push(socket);

  address(socket);

  socket.on('data', data => {
    broadcastServer2(data, socket);
  });

  socketing;
});

server2.listen(8080, () => {
  console.log('Server listen to: ', server2.address());
})

const broadcastServer2 = (msg, socketSent) => {
  if(msg.toString() === 'quit'){
    const index = awesomeo8080.indexOf(socketSent);
    awesomeo8080.splice(index, 1);
  }else {
    awesomeo8080.forEach(socket => {
      if(socket !== socketSent) socket.write(msg)
    })
  }
}

