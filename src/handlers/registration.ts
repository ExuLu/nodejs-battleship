import { users } from '../database/database';
import { stringify } from '../helpers/stringify';
import {
  RegistrationRequestData,
  RegistrationResponseData,
  Requests,
  WSCommands,
} from '../types/types';

export function registration(data: RegistrationResponseData) {
  const userExist = users.find((user) => user.name === data.name);
  let reqData: RegistrationRequestData;
  if (userExist) {
    const index = users.findIndex((user) => user.name === data.name);
    reqData = {
      name: data.name,
      index,
      error: true,
      errorText:
        'User with such name is already exists! Please, change another name',
    };
  } else {
    users.push({ ...data, index: users.length });
    reqData = {
      name: data.name,
      index: users.length,
      error: false,
    };
  }
  const req: WSCommands = {
    type: Requests.REG,
    data: reqData,
    id: 0,
  };
  const stringReq = stringify(req);
  return stringReq;
}
