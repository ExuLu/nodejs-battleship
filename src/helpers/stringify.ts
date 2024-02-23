import { RawData } from 'ws';

export function stringify(str: RawData | string) {
  const data = JSON.parse(str.toString());
  return data;
}
