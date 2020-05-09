import axios from 'axios';
import {config} from '../config/config';
import UserToEchipa from '../data-models/UserToEchipa';

export default class RegisterService {
    public static getEchipe = async (): Promise<UserToEchipa[]> => {
        const result = await axios.get(`${config.apiUrl}/echipe/getEchipe`);
        console.log(result.data);
        return result.data.map(echipa => echipa.nume);
    };
}