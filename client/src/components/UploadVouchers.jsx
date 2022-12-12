import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

const VoucherManagement = () => {
  const [numCodes, setNumCodes] = useState(0)
  const [openModal, setOpenModal] = useState(false);
  const open = () => {
    setOpenModal(true)
    document.querySelector('body').classList.add('modal-open')
  }

  useEffect(()=>{
    const loadNumOfCodesRemaining = async () => {
      const response = await axios.get(process.env.REACT_APP_HOST + '/api/uploadVouchers')
      console.log(response)
    }
    // setNumCodes()
  }, [])
  
  return (
    <div className="voucherManagement">
      <h2>Voucher Management</h2>
      {numCodes < 20 ? 
        <div className="alert alert-danger" role="alert">
          You are close to running out of codes! Upload more before you run out!
        </div>
        : ''
      }
      <h4>Remaining Codes:</h4>
      <h5>{numCodes}</h5>
      <Modal setOpenModal={setOpenModal} openModal={openModal}/>
      <button className="btn btn-primary btn-add-codes" onClick={() => open()}>Add Codes</button>
    </div>
  );
}

export default VoucherManagement;
