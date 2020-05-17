import axios from 'axios';

import {config} from '../config/config';
import {IUser} from '../data-models/User';
import IChangePassword from '../data-models/ChangePassword';
import AsyncStorage from '@react-native-community/async-storage';

export default class UserService {
    private static userApi:  string = `${config.apiUrl}/users`;

    public static insert = async (user: IUser): Promise<IUser> => {
        const result = await axios.post(`${UserService.userApi}/createUser`, user);
        return result.data;
    }

    public static changePassowrd = async (
        changePassowrd: IChangePassword,
      ): Promise<IUser> => {
        const token = await AsyncStorage.getItem('token');
    
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.post(
          `${UserService.userApi}/changePassword`,
          changePassowrd,
        );
        return result.data;
      };

    public static delete = async (id: number): Promise<IUser> => {
        const url = `${UserService.userApi}/deleteUser?id=${id}`;
        const result = await axios.delete(url);
        return result.data;
    }
}