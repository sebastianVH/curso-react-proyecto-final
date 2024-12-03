import {Box, Button, Typography} from "@mui/material"
import Grid from "@mui/material/Grid2"
import loginImg from "../../assets/login-img.jpg"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import {useForm} from "react-hook-form"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useUserStore } from "../../stores/UserStores"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function Login() {
    
    const [isRegister, setIsRegister] = useState(true)
    const [visibility, setVisibility] = useState(true)
    const {createUser, loginUser, user} = useUserStore()
    const {register, handleSubmit , formState: {errors},reset,watch} = useForm()
    const navigate = useNavigate()

    const changeForms = () => {
        setIsRegister(!isRegister)
        reset()
    }

    const testPassword = () => {
        return watch("password") === watch("confirmPassword")
    }

    const formSubmit = async (formData) => {
        if (!isRegister) {
            if (!testPassword()){
                alert("Las contraseñas no coinciden")
                return
            };
            try {
                const response = await createUser(formData)
                Swal.fire({
                    "title": response,
                    "text": "Ya puede ingresar a la plataforma",
                    "icon": "success",
                }).then(() => {
                    window.location.reload()
                })
            } catch (error) {
                Swal.fire({
                    "title": error,
                    "icon": "error",
                })
            }
        } else {
            try {
                const response = await loginUser(formData)
                Swal.fire({
                    "title": response,
                    "icon": "success",
                }).then(()=> navigate('/posts'))
            } catch (error) {
                Swal.fire({
                    "title": error,
                    "icon": "error",
                })
            }
        }
    };
    

    return (
        <Box sx={{ mt:10, width: "85vw" , height: "70vh", display: "flex", justifyContent: "center"}}>
            <Grid container spacing={0} sx={{background: "#ffffff59", borderRadius: "10px", height: "100%"}}>
                <Grid size={6} sx={{alignContent: "center"}}>
                    <Typography variant="h4" sx={{pb: 4}} > Red Social App </Typography>
                    <Box component={"img"} src={loginImg} sx={{objectFit: "contain", objectPosition: "center center", width: "-webkit-fill-available"}} ></Box>
                </Grid>
                <Grid size={6} sx={{alignContent: "center", borderLeft: "1px solid black" , height: "100%"}}>
                    <>
                        { isRegister ?
                        <Box onSubmit={handleSubmit(formSubmit)} component={"form"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" , alignContent: "center"}}>
                        <Typography variant="h3" sx={{pb: 4}} > Login </Typography>
                        <TextField 
                            error={errors.user}
                            helperText={errors.user && "Ingrese su usuario o correo" }
                            {...register("user",{required:true})}
                            id="user" 
                            label="Usuario o correo" 
                            variant="outlined" 
                            placeholder="Ingrese su usuario o correo" 
                            margin="normal"
                            slotProps={{
                                input: {
                                    endAdornment: <AssignmentIndIcon />,
                                }
                            }}
                            
                            />
                        <TextField 
                            error={errors.password}
                            helperText={errors.password && "Ingrese su contraseña" }
                            {...register("password",{required:true})} 
                            id="password" 
                            type={visibility ? "password" : "text"}
                            label="Contraseña" 
                            variant="outlined" 
                            placeholder="Ingrese su contraseña" 
                            margin="normal"
                            slotProps={{
                                input: {
                                    endAdornment: visibility ? <VisibilityOff onClick={() => setVisibility(!visibility)} /> : <Visibility onClick={() => setVisibility(!visibility)} />,
                                    sx: {cursor: "pointer"},
                                }
                            }}
                        />
                        <Button type="submit" variant="contained" sx={{mt: 1 , mb: 4}} > {!isRegister ? "Registrarse" : "Ingresar"} </Button>
                        </Box>
                        :
                        <Box onSubmit={handleSubmit(formSubmit)} component={"form"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" , alignContent: "center"}}>
                        <Typography variant="h3" sx={{pb: 4}} > Registrarse </Typography>
                        <TextField error= {errors.username} helperText={errors.username && "Ingrese su nombre de usuario"}  id="userCreate" {...register("username", {required: true})} label="Usuario" variant="outlined" placeholder="Ingrese su nombre de usuario"margin="normal"></TextField>
                        <TextField error= { errors.email} helperText={errors.email && "Ingrese su correo"}  id="mailCreate" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} label="Correo" variant="outlined" placeholder="Ingrese correo"margin="normal"></TextField>
                        <TextField error= { errors.password} helperText={errors.password && "Ingrese contraseña"}  id="password" {...register("password", {required: true})} label="Contraseña"  type={visibility ? "password" : "text"} variant="outlined" placeholder="Ingrese contraseña"margin="normal"                             slotProps={{
                                input: {
                                    endAdornment: visibility ? <VisibilityOff onClick={() => setVisibility(!visibility)} /> : <Visibility onClick={() => setVisibility(!visibility)} />,
                                    sx: {cursor: "pointer"},
                                }
                            }}></TextField>
                        <TextField error= { errors.confirmPassword} helperText={errors.confirmPassword && "Ingrese contraseña"}  id="confirmPassword" {...register("confirmPassword", {required: true})} label="Confirmar contraseña" type={visibility ? "password" : "text"} placeholder="Ingrese contraseña"margin="normal"                             slotProps={{
                                input: {
                                    endAdornment: visibility ? <VisibilityOff onClick={() => setVisibility(!visibility)} /> : <Visibility onClick={() => setVisibility(!visibility)} />,
                                    sx: {cursor: "pointer"},
                                }
                            }} 
                            ></TextField>
                        <Button type="submit" variant="contained" sx={{mt: 1 , mb: 4}} > {!isRegister ? "Registrarse" : "Ingresar"} </Button>
                        </Box>
                        }
                    </>
                    <Typography> {isRegister ?  "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"} </Typography>
                    <Button variant="outlined" color="primary" onClick={changeForms}> {isRegister ? "Registrarse" : "Ingresar"} </Button>
                </Grid>
            </Grid>
        </Box>
    )


}