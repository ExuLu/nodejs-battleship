import { Responses, Requests, BattleshipWS } from '../types/types';
import { registration } from './registration';
import { WebSocket } from 'ws';
import { addUserToRoom, createRoom, updateRoom } from './updateRoom';
import { wss } from '../http_server';
import { addShips, createGame, startGame } from './createGame';
import { updateWinners } from './updateWinners';
import { games } from '../database/database';

export function handler(
  type: Responses | Requests,
  data: any,
  ws: BattleshipWS
) {
  if (type === 'reg') {
    ws.send(registration(data, ws));
    wss.clients.forEach((client) => {
      client.send(updateRoom());
      client.send(updateWinners());
    });
  }
  if (type === 'create_room') {
    createRoom(data, ws);
    wss.clients.forEach((client) => client.send(updateRoom()));
  }
  if (type === 'add_user_to_room') {
    addUserToRoom(data, ws);
    wss.clients.forEach((client) => {
      client.send(updateRoom());
      client.send(createGame(ws));
    });
  }

  if (type === 'add_ships') {
    addShips(data);
    const actualGame = games.find((game) => game.gameId === data.gameId);
    if (actualGame) {
      const players = actualGame.players;
      if (players.length > 1) {
        const playerOne = players[0];
        const playerTwo = players[1];
        const playerOneShips = playerOne.ships?.length;
        const playerTwoShips = playerTwo.ships?.length;
        if (playerOneShips && playerTwoShips) {
          if (playerOneShips > 0 && playerTwoShips > 0) {
            wss.clients.forEach((client) => client.send(startGame(data, ws)));
          }
        }
      }
    }
  }

  if (type === 'attack') {
    
  }
}
