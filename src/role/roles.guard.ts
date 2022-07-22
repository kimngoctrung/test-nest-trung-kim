import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Userentities } from 'src/user/Models/post.entity';
import IUser from 'src/user/Models/post.interface';
import { Repository } from 'typeorm';
import { MyRole } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.payload.role === undefined) {
      throw new UnauthorizedException('Forbidden');
    }
    return this.matchRoles(roles[0], user.payload.role);
  }

  matchRoles(role, roleChecked) {
    return role === roleChecked;
  }
}
