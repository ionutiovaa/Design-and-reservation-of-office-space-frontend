import axios from 'axios';

import IJwtRequest from '../data-models/JwtRequest';
import {IUser} from '../data-models/User';
import {config} from '../config/config';

export default class AuthenticateService {
    public static login = async (jwtRequest: IJwtRequest): Promise<IUser> => {
      const result = await axios.post(
        `${config.apiUrl}/authenticate`,
        jwtRequest,
      );
      return result.data;
    };
  }
  