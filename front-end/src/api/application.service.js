import { api } from "./index";
import { handleHttpError, handleHttpSuccess } from "../utils/handleHttpStatus";

const getAllApplications = async ({round, department_name, status}) => {
    try {
        console.log(round, department_name, status);
        
        const response = await api.get('/applications', {
            params: {
                round,
                department_name,
                status
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getApplicationById = async (id) => {
    try {
        const response = await api.get(`/applications/${id}`);
        return response.data;
    } catch (error) {
        handleHttpError(error.response.data.message || error.response.data);
        console.error(error);
        throw error;
    }
}

const approveApplication = async (ids) => {
    try {
        const response = await api.put(`/applications/approve`, { ids });
        handleHttpSuccess("Phê duyệt ứng viên thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error.response.data.message || error.response.data);
        console.error(error);
        throw error;
    }
}

const rejectApplication = async (ids) => {
    try {
        const response = await api.put(`/applications/reject`, { ids });
        handleHttpSuccess("Lưu trữ ứng viên thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error.response.data.message || error.response.data);
        console.error(error);
        throw error;
    }
}

const restoreApplication = async (ids) => {
    try {
        const response = await api.put(`/applications/restore`, { ids });
        handleHttpSuccess("Khôi phục ứng viên thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error.response.data.message || error.response.data);
        console.error(error);
        throw error;
    }
}

const deleteApplications = async (ids) => {
    try {
        const response = await api.delete(`/applications/bulk-delete`, {
            params: {
                ids: ids.join(",")
            }
        });
        handleHttpSuccess("Xóa ứng viên thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error.response.data.message || error.response.data);
        console.error(error);
        throw error;
    }
}

const exportApplications = async ({ round, department_name, status }) => {
  try {
    const response = await api.get("/applications/export", {
      params: {
        round,
        department_name,
        status,
      },
      responseType: "blob", 
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "applications.xlsx"); 
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Export failed", error);
    throw error;
  }
};

const getStatisticsData = async () => {
    try {
        const response = await api.get('/applications/statistics');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { getAllApplications, getApplicationById, approveApplication, rejectApplication, restoreApplication, deleteApplications, exportApplications, getStatisticsData}


