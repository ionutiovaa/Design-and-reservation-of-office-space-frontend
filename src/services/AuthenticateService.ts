import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import IJwtRequest from '../data-models/JwtRequest';
import {IUser} from '../data-models/User';
import {config} from '../config/config';
import { UserType } from '../data-models/UserType';

export default class AuthenticateService {

  constructor(){
    var isAdmin;
  }

    public static login = async (jwtRequest: IJwtRequest): Promise<IUser> => {
      console.log(jwtRequest);
      const result = await axios.post(
        `${config.apiUrl}/authenticate`,
        jwtRequest,
      );
      return result.data;
    };

    public static getUserType = async (): Promise<boolean> => {
      const jsonUser = await AsyncStorage.getItem('logged_user');
      const user: IUser = JSON.parse(jsonUser) as IUser;

      const result = await axios.get(
        `${config.apiUrl}/users/getUserType?username=${user.username}`
      );

      AsyncStorage.setItem('userType', result.data);
  
      if (result.data == UserType.ANGAJAT){
        return true;
      }
      else{
        return false;
      }

    }
  }

  