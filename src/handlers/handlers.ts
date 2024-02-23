import { Responses, Requests } from '../types/types';
import { registration } from './registration';
import { WebSocket } from 'ws';
import { addUserToRoom, createRoom, updateRoom } from './updateRoom';
import { wss } from '../http_server';

export function handler(type: Responses | Requests, data: any, ws: WebSocket) {
  if (type === 'reg') {
    ws.send(registration(data));
    wss.clients.forEach((client) => {
      client.send(updateRoom());
      client.send(updateRoom());
    });
  }
  if (type === 'create_room') {
    createRoom(data);
    wss.clients.forEach((client) => client.send(updateRoom()));
  }
  if (type === 'add_user_to_room') {
    wss.clients.forEach((client) => client.send(updateRoom()));
    addUserToRoom(data);
  }
}
