import {create} from 'zustand'
import axios from 'axios'


export const usePostStore = create((set)=>({
    posts:[],
    getAllPosts: async()=>{
        try {
            const {data} = await axios.get('/posts', {
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('authToken')
                }
            })
            set(state=>({posts: [...data.posts]}))
            return data
        } catch (error) {
            throw error.response.data.message
        }
    },
    setLikeInPost: async(postId)=>{
            try {
                await axios.put(`/posts/like?id=${postId}`,null,{
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Bearer '+ localStorage.getItem('authToken')
                    }
                })
            } catch (error) {
                throw error.response.data.message
            }
    },
    createNewPost: async (formData) => {
        try {
            const {data} = await axios.post('/posts', formData, {
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('authToken')
                }
            })
            return data.message
        } catch (error) {
            throw error.response.data.message
        }
    },
    updatePost: async (id,formData) => {
        try {
            const {data} = await axios.put(`/posts/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('authToken')
                }
            })
            return data.message
        } catch (error) {
            throw error.response.data.message
        }
    },
    
}))
