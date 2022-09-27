const net = require('net');

const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const logIn = question => {
  return new Promise(resolve => {
    readLine.question(question, (answer) => {
      resolve(answer)
    });
  });
}

const chatProgram = async () => {
  let running = true;
  const username = await logIn('Enter a username: ')
  while(running){
  
    const address = await logIn('Pick a chatroom to join: \n[1] awesomeo3000 \n[2] awesomeo8080 \n> ')

    if(address !== '1' && address !== '2'){

      console.log("The number you have entered is not valid.. Try again.")

    } else if(address === '1'){
      const server = net.createConnection(3000);

      server.on('connect', () => {
        server.write(`${username} has joined the chat..`)
        console.log('Welcome to chatroom: awesomeo3000!\n Type quit to leave.. \n')
      });
    
      readLine.on('line', data => {
        if(data === 'quit'){
          server.write(`${username} has left the chat.`);
          server.setTimeout(1000);
        } else {
          server.write(`${username}: ${data}`)
        }
      });
    
      server.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data);
      });
    
      server.on('timeout', () => {
        server.write('quit');
    
        server.end();
      });
    
      server.on('end', () => {
        process.exit();
      });
    
      server.on('error', () => {
        console.log('The server seems to have been shut down...');
      });
      running = false;
    }else if(address === '2'){
      const server = net.createConnection(8080);

      server.on('connect', () => {
        server.write(`${username} has joined the chat..`)
        console.log('Welcome to chatroom: awesomeo8080!\n Type quit to leave.. \n')
      });
    
      readLine.on('line', data => {
        if(data === 'quit'){
          server.write(`${username} has left the chat.`);
          server.setTimeout(1000);
        } else {
          server.write(`${username}: ${data}`)
        }
      });
    
      server.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data);
      });
    
      server.on('timeout', () => {
        server.write('quit');
    
        server.end();
      });
    
      server.on('end', () => {
        process.exit();
      });
    
      server.on('error', () => {
        console.log('The server seems to have been shut down...');
      });
      running = false;
    }
  }
}

chatProgram();