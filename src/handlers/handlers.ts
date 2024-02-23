import {
  WSRequestData,
  WSResponseData,
  Responses,
  Requests,
} from '../types/types';

export function handler(
  type: Responses | Requests,
  data: WSRequestData | WSResponseData
) {
  if (type === 'reg') {
    console.log('Registration');
  }
}
