import React, { Component }  from 'react';
import axios from 'axios'

function SendVouchers(){
    
    function emailParticipants(){
        console.log("emailing the volunteers!");
        axios.get(`${process.env.REACT_APP_HOST}/api/sendvouchers`)
        .then((response) => {
            console.log(response.status)
            })
    }

    return(
        <button id="submitEmailsButton" className='submitBtn' onClick={() => emailParticipants()}>Email Vouchers (new button)</button>
    )
}

export default SendVouchers