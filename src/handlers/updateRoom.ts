import { games, rooms, users } from '../database/database';
import { stringify } from '../helpers/stringify';
import { Requests, Room, WSCommands } from '../types/types';

export function updateRoom() {
  const req: WSCommands = {
    type: Requests.UPDATE_ROOM,
    data: rooms,
    id: 0,
  };
  const reqString = stringify(req);
  return reqString;
}

export function createRoom(data: any) {
  const newRoom: Room = {
    roomId: rooms.length,
    roomUsers: users,
  };
  rooms.push(newRoom);
}

export function addUserToRoom(data: any) {
  const room = rooms[data.indexRoom];
  if (room.roomUsers.length === 2) {
    const req: WSCommands = {
      type: Requests.CREATE_GAME,
      data: {
        idGame: games.length,
        idPlayer: 0,
      },
      id: 0,
    };
  }
}
