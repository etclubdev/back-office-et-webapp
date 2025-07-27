import { api } from "./index";

const getExample = async () => {
    const response = await api.get('/example');
    return response.data;
}

export { getExample }
