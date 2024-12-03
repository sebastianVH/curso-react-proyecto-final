import { TextField,Button,Box,Typography} from "@mui/material"
import { useForm } from "react-hook-form"
import { usePostStore } from "../../stores/usePostStore";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useUserStore } from "../../stores/UserStores";



export default function CrearPost() {

    const {register, handleSubmit, formState: { errors },setValue } = useForm();
    const {createNewPost, getAllPosts, updatePost} = usePostStore()
    const navigate = useNavigate()
    const {id} = useParams()
    const {user} = useUserStore()
    
    
    const createPost = async (formData) => {
            try {
                const message = (id) ? await updatePost(id,formData) : await createNewPost(formData)
                Swal.fire({
                    "title": message,
                    "icon": "success",
                    "confirmButtonText": "Aceptar",
                    "showCancelButton": false
                }).then(() => {
                    navigate('/posts')
                })
            } catch (error) {
                Swal.fire({ "title": error, "icon": "error"})
            }
    }

    const getPost = async (id) => {
            try {
                const data = await getAllPosts()
                const post = data.posts.find(post => post.id === Number(id))
                if (post.user_post.username !== user.username) {
                    navigate('/posts')
                }
                
                setValue('title',post.title)
                setValue('content',post.content)
                setValue('image',post.imageURL)
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        if(id) {
            getPost(id)
        } 
        return ()=>{
            setValue('title',null)
            setValue('content',null)
            setValue('image',null)
        }
    }, [id])

    return (
        <Box sx={{display:'flex',alignContent:'center',justifyContent:'center', transform:'translateY(5%)'}} >
            <Box component={'form'} onSubmit={handleSubmit(createPost)} sx={{backgroundColor:'#c3c3c3', alignItems:'center',minWidth:'70vw',minHeight:'75vh',border:'2px solid black',borderRadius:'10px',display:'flex', flexDirection:'column'}}>
                <Typography variant="h2">{id ? 'Editar Post' : 'Crear Post'}</Typography>
                <TextField
                    error={errors.title}
                    helperText={errors.title && "El titulo es requerido"}
                    {...register("title", { required: true })}
                    id="outlined-basic"
                    label="Titulo"
                    variant="outlined"
                    margin="normal"
                    size="large"
                    sx={{width:'70%'}}
                />
                <TextField
                    {...register("content", { required: true })}
                    error={errors.content}
                    helperText={errors.content && "El contenido es requerido"}
                    id="outlined-basic"
                    label="Contenido"
                    variant="outlined"
                    margin="normal"
                    size="large"
                    sx={{width:'70%'}}
                    multiline
                    minRows={10}
                    maxRows={10}
                    />
                <TextField
                    {...register("image", { required: true })}
                    error={errors.image}
                    helperText={errors.image && "La imagen es requerida"}
                    id="outlined-basic"
                    label="Imagen"
                    variant="outlined"
                    margin="normal"
                    size="large"
                    sx={{width:'70%'}}
                    placeholder="URL de la imagen"
                />
                    <Button sx={{margin:'10px'}} type="submit" variant="contained" color="success" >Publicar</Button>
                    <Button variant="contained" color="error"> Cancelar</Button>
            </Box>   
        </Box>
    )
}
