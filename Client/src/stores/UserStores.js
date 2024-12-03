import {create} from "zustand"
import axios from "axios"


export const useUserStore = create((set) => ({
    user:JSON.parse(localStorage.getItem("user")),
    createUser: async (formData) => {
        try {
            const {data} = await axios.post("/usuarios", formData)
            return data.message
        } catch (error) {
            throw error.response.data.message
        }
    },
    loginUser: async (formData) => {
        try {
            const {data} = await axios.post("/usuarios/login", formData, {withCredentials: true})
            //vamos a setear los datos provinientes del login en el store y ademas en el localStorage
            set((state) => ({user: {username: data.user, email: data.email, token: data.token}}))
            localStorage.setItem("user", JSON.stringify({username: data.user, email: data.email}))
            localStorage.setItem("authToken", data.token)
            return data.message
        } catch (error) {
            throw error.response.data.message
        }
    },

}))