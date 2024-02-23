import { games } from '../database/database';
import { BattleshipWS, WSCommands, Requests } from '../types/types';
import { stringify } from '../helpers/stringify';

export function createGame(ws: BattleshipWS) {
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
