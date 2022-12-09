import React/*, { Component }*/  from 'react';

import axios from 'axios'

function SendVouchers({eventId}){
    
    function emailParticipants(){
        console.log("emailing the volunteers for event: " + eventId);
        axios.get(`${process.env.REACT_APP_HOST}/api/sendvouchers/${eventId}`)
        .then((response) => {
            console.log(response.status)
            })
    }

    return(
        <button id="submitEmailsButton" className='submitBtn' onClick={() => emailParticipants()}>Email Vouchers (new button)</button>
    )
}

export default SendVouchers