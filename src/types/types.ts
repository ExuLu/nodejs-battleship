import { WebSocket } from 'ws';

export enum Responses {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
}

export enum Requests {
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

export interface BattleshipWS extends WebSocket {
  name: string;
  id: number;
}

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

export type User = {
  name: string;
  password: string;
  index: number;
};

export type RegistrationResponseData = Omit<User, 'index'>;
export type AddToRoomResponseData = {
  indexRoom: number;
};
export type AddShipsResponseData = {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
};
export type AttackResponseData = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};
export type RandomAttackResponseData = {
  gameId: number;
  indexPlayer: number;
};
export type WSResponseData =
  | RegistrationResponseData
  | AddShipsResponseData
  | AddToRoomResponseData
  | AttackResponseData
  | RandomAttackResponseData;

export type RegistrationRequestData = {
  name: string;
  index: number;
  error: boolean;
  errorText?: string;
};
export type Winner = {
  name: string;
  wins: number;
};
type UpdateWinnersRequestData = Winner[];
type CreateGameRequestData = {
  idGame: number;
  idPlayer: number;
};
export type Room = {
  roomId: number;
  roomUsers: Omit<User, 'password'>[];
};
export type UpdateRoomRequestData = Room[];
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
export type WSRequestData =
  | UpdateWinnersRequestData
  | CreateGameRequestData
  | RegistrationRequestData
  | UpdateRoomRequestData
  | StartGameRequestData
  | AttackRequest
  | TurnRequest
  | FinishRequest;

export type WSCommands = {
  type: Responses | Requests;
  data: WSRequestData | WSResponseData | '';
  id: 0;
};
