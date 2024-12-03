import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function 
WithAuth(Component) {

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken')

    useEffect(() => {
      if (!token) {
        Swal.fire({
            "title": "Por favor inicie sesion",
            "icon": "error"
        }).then(()=> navigate('/') )
        ;
      }
    }, [token, navigate]);

    return token ? <Component/> : null;
  
}