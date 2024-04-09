import { randomUUID } from 'crypto';

export const uuid = () => randomUUID();
export const shortID = () => uuid().split('-').at(-1);
