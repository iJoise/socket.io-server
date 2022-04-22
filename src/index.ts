import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const PORT = process.env.PORT || 5000;

const messages = [
  { message: 'Hello Viktor', id: '1', user: { id: 'asdasd', name: 'Viktor' } },
  { message: 'Hello Kirill', id: '2', user: { id: 'dfgdfg', name: 'Kirill' } },
  { message: 'Hello evryone', id: '3', user: { id: 'sdfdsf', name: 'Leroy Jenkins' } },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('client-message-sent', message => {
    console.log(message);
  });

  socket.emit('init-messages-published', messages)
});

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`));
  } catch (err) {}
};
start();