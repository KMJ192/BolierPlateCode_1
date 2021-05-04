import axios from 'axios';

async function Auth(
    SpeceificComponent : JSX.Element, 
    option : boolean | null, 
    adminRoute : boolean | null = null) {
    const request = axios.get('/user')
        .then(response => response.data)
        .catch(err => err);
    console.log(request);
}

export default Auth
