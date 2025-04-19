import { api } from "./index";
import axios from 'axios';

const getAllPartners = async () => {
    try {
        const response = await api.get('/partners');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        } else {
            console.error(error);
        }
    }
}

const updatePartners = async (partners) => {
    try {
        const response = await api.put('/partners/bulk-update', { partners });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        } else {
            console.error(error);
        }
    }
}

export { getAllPartners, updatePartners }
