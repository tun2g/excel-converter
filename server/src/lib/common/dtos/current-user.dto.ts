import { RoleType } from 'src/lib/constants';

export class CurrentUserDto {
  id: string;
  email: string;
  username: string;
  roles: RoleType[];
}
