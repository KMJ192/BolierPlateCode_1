import axios from 'axios';
import React, { useState } from 'react';
import Wrapper  from '../wrapper/Wrapper';
import './MainPage';


function MainPage() {
    //const [getData, setGetData] = useState("");
    const request = async() => {
        const result = await axios.get("https://api.coinone.co.kr/ticker/?currency=all&format=json")
            .then(response => response).catch(err => err);
        console.log(result);
    }
    
    return (
        <Wrapper>
            <div>
                <button onClick={request}>
                    GetData
                </button>
            </div>
        </Wrapper>
    )
}

export default MainPage