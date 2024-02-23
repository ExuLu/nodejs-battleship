import { games, rooms, users } from '../database/database';
import { stringify } from '../helpers/stringify';
import { BattleshipWS, Requests, Room, WSCommands } from '../types/types';

export function updateRoom() {
  const req: WSCommands = {
    type: Requests.UPDATE_ROOM,
    data: rooms,
    id: 0,
  };
  const reqString = stringify(req);
  return reqString;
}

export function createRoom(data: any, ws: BattleshipWS) {
  const newRoom: Room = {
    roomId: rooms.length,
    roomUsers: [{ index: +ws.id, name: ws.name }],
  };
  rooms.push(newRoom);
}

export function addUserToRoom(data: any, ws: BattleshipWS) {
  const room = rooms[data.indexRoom];
  if (room.roomUsers.length < 2) {
    room.roomUsers.push({
      index: +ws.id,
      name: ws.name,
    });
  }
  if (room.roomUsers.length === 2) {
    const req: WSCommands = {
      type: Requests.CREATE_GAME,
      data: {
        idGame: games.length,
        idPlayer: +ws.id,
      },
      id: 0,
    };
  }
}
