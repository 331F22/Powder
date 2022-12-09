import React/*, { Component }*/  from 'react';

import axios from 'axios'

function SendVouchers({eventId}){
    
    function emailParticipants(){
        axios.get(`${process.env.REACT_APP_HOST}/api/sendvouchers/${eventId}`)
        .then((response) => {
            })
    }

    return(
        <button id="submitEmailsButton" className='submitBtn' onClick={() => emailParticipants()}>Email Vouchers (new button)</button>
    )
}

export default SendVouchers