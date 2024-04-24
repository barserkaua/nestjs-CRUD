import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let mockReflector: any;
  let mockContext;

  beforeEach(() => {
    jwtService = new JwtService({});
    mockReflector = {
      getAllAndOverride: jest.fn(),
    };
    mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn(),
    } as unknown as ExecutionContext;
    authGuard = new AuthGuard(jwtService, mockReflector);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should allow access if the route is marked as public', async () => {
    const isPublic = true;
    mockReflector.getAllAndOverride.mockReturnValue(isPublic);

    const result = await authGuard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith('isPublic', [
      mockContext.getHandler(),
      mockContext.getClass(),
    ]);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const isPublic = false;
    mockReflector.getAllAndOverride.mockReturnValue(isPublic);
    mockContext.switchToHttp().getRequest = jest.fn().mockReturnValue({
      headers: { authorization: undefined },
    });

    const result = authGuard.canActivate(mockContext);

    await expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token verification fails', async () => {
    const isPublic = false;
    const token = 'invalid-token';
    mockReflector.getAllAndOverride.mockReturnValue(isPublic);
    mockContext.switchToHttp().getRequest.mockReturnValue({
      headers: { authorization: `Bearer ${token}` },
    });
    jwtService.verifyAsync = jest.fn().mockRejectedValueOnce(new Error());

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
      secret: process.env.CRYPTO_SECRET,
    });
  });

  it('should set the user payload in the request if token verification succeeds', async () => {
    const isPublic = false;
    const token = 'valid-token';
    const payload = { id: 1, username: 'testuser' };
    mockReflector.getAllAndOverride.mockReturnValue(isPublic);

    mockContext.switchToHttp().getRequest.mockReturnValue({
      headers: { authorization: `Bearer ${token}` },
    });

    jwtService.verifyAsync = jest.fn().mockResolvedValueOnce(payload);

    await authGuard.canActivate(mockContext);

    expect(mockContext.switchToHttp().getRequest).toHaveBeenCalled();
    expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
      secret: process.env.CRYPTO_SECRET,
    });
    expect(mockContext.switchToHttp().getRequest()['user']).toEqual(payload);
  });
});
