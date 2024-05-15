import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserPayload } from '../types/user-payload.type';

export const User = createParamDecorator(
  (data: keyof IUserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
