import IRole from './Role';
import IEchipa from './Echipa';
import {UserType} from './UserType';
import UserToEchipa from './UserToEchipa';

export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    username: string;
    password: string;
    token: string;
    userType: UserType;
    echipe?: UserToEchipa[];
  }
  