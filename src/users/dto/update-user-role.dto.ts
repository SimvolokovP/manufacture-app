import { IsEnum } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
