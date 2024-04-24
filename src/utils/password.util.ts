import * as crypto from 'crypto';
import 'dotenv/config';

export const hash = (password: string) =>
  crypto
    .createHmac('sha256', process.env.CRYPTO_SECRET)
    .update(password)
    .digest('base64');
