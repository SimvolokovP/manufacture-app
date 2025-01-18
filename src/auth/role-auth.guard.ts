import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { User } from 'src/users/users.model';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const reqRoles = <string[]>(
        this.reflector.getAllAndOverride(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ])
      );

      if (!reqRoles) {
        return true;
      }

      console.log(reqRoles);

      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Not role' });
      }
      const user: User = this.jwtService.verify(token);
      req.user = user;
      console.log(user.role);
      return reqRoles.includes(user.role);
    } catch (error) {
      throw new UnauthorizedException({ message: 'Not role' });
    }
  }
}
