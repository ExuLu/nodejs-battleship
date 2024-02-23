import { RawData } from 'ws';
import { WSRequestData, WSResponseData } from '../types/types';

export function parse(str: RawData | string | WSRequestData | WSResponseData) {
  const data = JSON.parse(str.toString());
  if (data.data) {
    const fullData = { ...data, data: JSON.parse(data.data) };
    return fullData;
  }
  return data;
}
