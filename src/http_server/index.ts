import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocket } from 'ws';
import { stringify } from '../helpers/stringify';
import { WSCommands } from '../types/types';
import { handler } from '../handlers/handlers';

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const req: WSCommands = stringify(message);
    const type = req.type;
    const data = stringify(req.data);
    console.log(`Command type: ${type}. Data:`, data);
    handler(type, data);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
