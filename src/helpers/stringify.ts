import { RawData } from 'ws';
import { WSRequestData, WSResponseData } from '../types/types';

export function stringify(
  str: RawData | string | WSRequestData | WSResponseData
) {
  const data = JSON.parse(str.toString());
  return data;
}
