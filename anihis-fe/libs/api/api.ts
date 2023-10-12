export * from './owners.service';
import { OwnersService } from './owners.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [OwnersService, UsersService];
