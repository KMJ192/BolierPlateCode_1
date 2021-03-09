import React from 'react'
import axios from 'axios';

function Auth(SpecifcComponent : any) {

    async () => {
        const {data} = await axios.get('/user');
        console.log(data);
    }
    return (
        <SpecifcComponent/>
    )
}

export default Auth
