import IRole from './Role';

export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    username: string;
    password: string;
    token: string;
    role: IRole;
  }
  