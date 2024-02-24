import { games, users } from '../database/database';
import {
  BattleshipWS,
  WSCommands,
  Requests,
  Game,
  AddShipsResponseData,
  StartGameRequestData,
} from '../types/types';
import { stringify } from '../helpers/stringify';

export function createGame(ws: BattleshipWS) {
  const enemy = users.filter((user) => user.index !== +ws.id);
  const enemyId = enemy[0].index;
  const players = [{ indexPlayer: enemyId }, { indexPlayer: +ws.id }];
  const newGame: Game = {
    gameId: games.length,
    players,
  };
  games.push(newGame);
  const req: WSCommands = {
    type: Requests.CREATE_GAME,
    data: {
      idGame: games.length,
      idPlayer: +ws.id,
    },
    id: 0,
  };
  const reqString = stringify(req);
  return reqString;
}
export function addShips(data: AddShipsResponseData) {
  const actualGame = games.find((game) => game.gameId === data.gameId);
  if (actualGame) {
    const actualPlayer = actualGame.players.find(
      (player) => player.indexPlayer === data.indexPlayer
    );
    if (actualPlayer) actualPlayer.ships = data.ships;
  }
}

export function startGame(data: any, ws: BattleshipWS) {
  const actualGame = games.find((game) => game.gameId === data.gameId);
  const user = actualGame?.players[ws.id];
  const ships = user?.ships;
  if (ships) {
    const req: WSCommands = {
      type: Requests.START_GAME,
      data: {
        ships,
        currentPlayerIndex: +ws.id,
      },
      id: 0,
    };
    const reqString = stringify(req);
    return reqString;
  } else {
    const req: WSCommands = {
      type: Requests.REG,
      data: {
        name: ws.name,
        index: +ws.id,
        error: true,
        errorText: 'It is not possible to find game',
      },
      id: 0,
    };
    const reqString = stringify(req);
    return reqString;
  }
}
