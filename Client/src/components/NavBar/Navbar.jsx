import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserStore } from '../../stores/UserStores';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() {

    const {user} = useUserStore(state => state)
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        navigate('/')
    }

    useEffect(() => {
        return () => {}
    }, [user])

  return (
    <Box sx={{ flexGrow: 2, minWidth: '100vw', position: 'sticky', top: 0 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {user && <Typography variant="subtitle" component="div">
                    Bienvenido {user?.username}
                    </Typography>
          }
          <Button onClick={() => navigate("/post/crear")} color="inherit" > Crear post</Button>
          <Button onClick={() => navigate("/posts")} variant="h6" component="div">
            Posteos
          </Button>
           {!user ? <Button onClick={() => navigate("/")} color="inherit">Login</Button> : <Button onClick={logOut} color="inherit">Logout</Button> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
