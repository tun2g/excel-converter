import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/role/entities/role.entity';

const matchRoles = (roles: string[], userRoles: Role[]) => {
  return userRoles.some(userRole => roles.includes(userRole?.name));
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const req = context.switchToHttp().getRequest() as any;
      const userRoles = req.roles;
      return matchRoles(roles, userRoles);
    } catch (error) {
      return false;
    }
  }
}