import { create } from "zustand";
import axios from 'axios'


const useCommentStore = create((set) => ({
    createComment: async (formData) => {

        try {
            const { data } = await axios.post("/comentarios", formData, 
                { 
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('authToken')
                }
             }
            );
            return data.message;
        } catch (error) {
            throw error.response.data.message;
        }
    },
}));
export default useCommentStore