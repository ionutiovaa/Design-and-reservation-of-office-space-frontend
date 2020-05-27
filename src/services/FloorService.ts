import axios from 'axios';

import { config } from '../config/config';

export default class FloorService {

    public static getDimensions = async (): Promise<string> => {
        const result = await axios.get(
            `${config.apiUrl}/sedii/getDimensions`
        );
        return result.data;
    }

    public static updateDimensions = async (dim: string) => {
        await axios.post(
            `${config.apiUrl}/sedii/updateDimensions?dimensions=` + dim
        );
    }

    public static getFloorsCount = async (): Promise<number> => {
        const result = await axios.get(
            `${config.apiUrl}/etaje/floorsCount`
        );
        return result.data;
    }

    public static addFloor = async () => {
        await axios.post(
            `${config.apiUrl}/etaje/createEtaj`
        );
    }

}