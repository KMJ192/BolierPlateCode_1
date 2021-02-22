import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
       axios.get("/api/test")
        .then(response => console.log("res : " + response));
    }, []);

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
