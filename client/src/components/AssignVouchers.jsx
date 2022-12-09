import React/*, { Component }*/  from 'react';

import axios from 'axios'


function AssignVouchers({eventId}){
    
    function assignVouchers(){
        axios.get(`${process.env.REACT_APP_HOST}/api/issuevouchers/${eventId}`)
        .then((response) => {
            console.log(response.status)
            })
    }

    return(
        <button id="assignVouchersButton" className='submitBtn' onClick={() => assignVouchers()}>Assign Vouchers</button>
    )
}

export default AssignVouchers