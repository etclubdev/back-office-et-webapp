import { api } from "./index";

const getPersonnelById = async (id) => {
    try {
        const response = await api.get(`/personnels/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {
    getPersonnelById,
};