import { games, users } from '../database/database';
import { BattleshipWS, WSCommands, Requests, Game } from '../types/types';
import { stringify } from '../helpers/stringify';

export function createGame(ws: BattleshipWS) {
  const usersId = users.map((user) => {
    return { indexPlayer: user.index };
  });
  const newGame: Game = {
    gameId: games.length,
    players: usersId,
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
