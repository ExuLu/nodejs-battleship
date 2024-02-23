import { Responses, Requests, BattleshipWS } from '../types/types';
import { registration } from './registration';
import { WebSocket } from 'ws';
import { addUserToRoom, createRoom, updateRoom } from './updateRoom';
import { wss } from '../http_server';

export function handler(type: Responses | Requests, data: any, ws: BattleshipWS) {
  if (type === 'reg') {
    ws.send(registration(data, ws));
    wss.clients.forEach((client) => {
      client.send(updateRoom());
      client.send(updateRoom());
    });
  }
  if (type === 'create_room') {
    createRoom(data, ws);
    wss.clients.forEach((client) => client.send(updateRoom()));
  }
  if (type === 'add_user_to_room') {
      addUserToRoom(data, ws);
      wss.clients.forEach((client) => client.send(updateRoom()));
  }
}
