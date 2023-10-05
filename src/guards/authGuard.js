
import jwt_decode from 'jwt-decode';
export default function (to, from, next) {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken, 'decodedToken'); 
    const userRole = decodedToken.rol_id;

    if (userRole === 2) {
      next(); 
    } else {
     
      next('/login');
      
    }
  } else {
    next('/login');
  }
}
