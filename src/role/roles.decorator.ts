import { SetMetadata } from '@nestjs/common';
import { MyRole } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MyRole[]) => SetMetadata(ROLES_KEY, roles);
