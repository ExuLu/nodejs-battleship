import { games } from '../database/database';
import { AttackResponseData } from '../types/types';

export function attack(data: AttackResponseData) {
  const actualGame = games.find((game) => game.gameId === data.gameId);
  const actualPlayer = actualGame?.players.find(
    (player) => player.indexPlayer === data.indexPlayer
  );
  const { x, y } = data;
}
