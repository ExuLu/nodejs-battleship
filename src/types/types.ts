enum Responses {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
}

enum Requests {
  REG = 'reg',
  UPDATE_WINNERS = 'update_winners',
  CREATE_GAME = 'create_game',
  UPDATE_ROOM = 'update_room',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  TURN = 'turn',
  FINISH = 'finish',
}

enum AttacksResult {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

export type Game = {
  gameId: number;
  players: Player[];
};

type Player = {
  indexPlayer: number;
  ships: Ship[];
};

type Ship = {
  position: Position;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

type Position = {
  x: number;
  y: number;
};
