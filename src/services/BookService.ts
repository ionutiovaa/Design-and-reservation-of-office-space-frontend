import axios from 'axios';

import { config } from '../config/config';
import IUtilizare from '../data-models/Utilizare';
import ISchedules from '../data-models/Schedules';
import IForGetSchedules from '../data-models/ForGetSchedules';

export default class BookService {

    public static insertBook = async (utilizare: IUtilizare): Promise<IUtilizare> => {
        const result = await axios.post(
            `${config.apiUrl}/utilizari/createUtilizare`,
            utilizare,
        );
        return result.data;
    }

    public static getSchedules = async (forGetSchedules: IForGetSchedules): Promise<ISchedules[]> => {
        const axios = require('axios');
        const result = await axios.post(
            `${config.apiUrl}/utilizari/getUtilizariByDate`,
            forGetSchedules,
        );
        return result.data;
    };

    public static checkFree = async (utilizareDTO: IUtilizare): Promise<boolean> => {
        const axios = require('axios');
        const result = await axios.post(
            `${config.apiUrl}/utilizari/checkFree`,
            utilizareDTO,
        );
        return result.data;
    }

}