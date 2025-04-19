import { api } from "./index";

const updatePassword = async (id, oldPassword, newPassword) => {
    try {
        const response = await api.put(`/accounts/change-password/${id}`, {
            oldPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updatePassword }
