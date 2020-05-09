import axios from 'axios';

import {config} from '../config/config';
import {IUser} from '../data-models/User';
import AsyncStorage from '@react-native-community/async-storage';

export default class UserService {
    private static userApi:  string = `${config.apiUrl}/users`;

    public static insert = async (user: IUser): Promise<IUser> => {
        const result = await axios.post(`${UserService.userApi}/createUser`, user);
        return result.data;
    }
}