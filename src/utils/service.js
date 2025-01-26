import { toast } from "react-toastify";
import Api from "./api"

export const getJob = async (id) => {
    try {

        const response = await Api.get(`/jobs/${id}`);
        return response.data;

    } catch (error) {
        toast.error("güncellenecek eleman bulunamadı");
    }

};