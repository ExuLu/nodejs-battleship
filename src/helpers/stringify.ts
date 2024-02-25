import { WSCommands } from '../types/types';
export function stringify(message: WSCommands) {
  return JSON.stringify({ ...message, data: JSON.stringify(message.data) });
}
