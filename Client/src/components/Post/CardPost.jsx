
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Typography,TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import CommentContent from './CommentContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { usePostStore } from '../../stores/usePostStore';
import { useUserStore } from '../../stores/UserStores';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useForm } from 'react-hook-form';
import useCommentStore from '../../stores/useCommentStore';
import { toast,Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


// Configurar los plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));
  



 const CardPost = ({post, index}) =>{

    const [like, setLike] = useState(true)
    const [expanded, setExpanded] = useState(false);
    const {setLikeInPost,getAllPosts} = usePostStore()
    const {user} = useUserStore()
    const {createComment} = useCommentStore()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const darLike = async() =>{
        setLike(!like)
        try {
            await setLikeInPost(index)
            getAllPosts()
        } catch (error) {
            console.log(error)
        }
    }


    const checkLike = () => {
        if (user){
            const haveLike = post.likes?.find(like => like.user_like.username === user.username)
        return haveLike
    }
    }

    const transformarFecha = (fecha) => {
        const buenosAiresTime = dayjs.utc(fecha).tz('America/Argentina/Buenos_Aires');
        const formattedDate = buenosAiresTime.format('DD/MM/YYYY HH:mm');
        return `${formattedDate}`
    }

    const handleComment = async (formData) => {
        try {
            //creamos el comentario y enviamos la data
            const data = await createComment({...formData, post_id: post.id})
            //mostramos un mensaje de exito
            toast.success(data, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
                onOpen: () => {
                    //limpiamos el input
                    reset()
                },
                onClose: () => {
                    //volvemos a pedir los posts
                    getAllPosts()
                }
                });
        } catch (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
                });
        }
        
    }

    return(
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',alignContent: 'start'}}>
        <Card sx={{ minWidth: 450, backgroundColor: 'grey', margin: 2, px: 2 }}>
            <CardHeader
                title={post.title}
                subheader={post.user_post.username + ' - ' + transformarFecha(post.createdAt)}
            />
            <CardMedia
                    component="img"
                    height="300"
                    image={post.imageURL}
                    alt="N/D"
            />
            <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                    {post.likes?.length === 0 ? <Typography>No hay likes</Typography> : <Typography>{post.likes.length} Likes</Typography>}
                    { checkLike() ? <FavoriteIcon onClick={darLike} sx={{cursor:'pointer'}} />  : <FavoriteBorderIcon onClick={darLike} sx={{cursor:'pointer'}} />}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1">Comentarios</Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                    { user.username === post.user_post.username && <EditIcon sx={{cursor:'pointer'}} titleAccess='Editar' onClick={() => navigate(`/post/editar/${post.id}`)}/>}
                </Box>
            </CardActions>
            <Divider variant="middle" sx={{color: 'black'}} />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                {post.comments.length === 0 && <Typography>No hay comentarios</Typography>}
                {post.comments.map((comentario,indexComment) => {
                    return <CommentContent key={indexComment} comentario={comentario} dateTransform={transformarFecha} />
                })}
                </Box>
                <Box sx={{mt: 2}} component={'form'} >
                    <TextField
                    {...register("content",{required: true})}
                    error={errors.content}
                    helperText={errors.content && "Ingrese su comentario"}
                    label="Comentario" 
                    placeholder='Escribe un comentario...'
                    multiline 
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment: <ForwardToInboxIcon onClick={handleSubmit(handleComment)} sx={{cursor:'pointer'}} titleAccess='Enviar'/>,
                            
                        }
                    }}
                    ></TextField>
                </Box>

            </CardContent>
            </Collapse>
        </Card>
        <ToastContainer/>
    </Box>
    )

}

export default CardPost