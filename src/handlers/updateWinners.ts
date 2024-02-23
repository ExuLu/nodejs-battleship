import { winners } from '../database/database';
import { stringify } from '../helpers/stringify';
import { Requests, WSCommands } from '../types/types';

export function updateWinners() {
  const req: WSCommands = {
    type: Requests.UPDATE_WINNERS,
    data: winners,
    id: 0,
  };
  const reqString = stringify(req);
  return reqString;
}
