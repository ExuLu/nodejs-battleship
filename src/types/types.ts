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

type User = {
  name: string;
  password: string;
  index: number;
};

type RegistrationResponseData = Omit<User, 'index'>;
type AddToRoomResponseData = {
  indexRoom: number;
};
type AddShipsResponseData = {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
};
type AttackResponseData = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};
type RandomAttackResponseData = {
  gameId: number;
  indexPlayer: number;
};
export type WSResponseData =
  | RegistrationResponseData
  | AddShipsResponseData
  | AddToRoomResponseData
  | AttackResponseData
  | RandomAttackResponseData;

type RegistrationRequestData = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};
type Winner = {
  name: string;
  wins: number;
};
type UpdateWinnersRequestData = Winner[];
type CreateGameRequestData = {
  idGame: number;
  idPlayer: number;
};
type Room = {
  roomId: number;
  roomUsers: Omit<User, 'password'>[];
};
type UpdateRoomRequestData = Room[];
type StartGameRequestData = {
  ships: Ship[];
  currentPlayerIndex: number;
};
type AttackRequest = {
  position: Position;
  currentPlayer: number;
  status: AttacksResult;
};
type TurnRequest = {
  currentPlayer: number;
};
type FinishRequest = {
  winPlayer: number;
};
