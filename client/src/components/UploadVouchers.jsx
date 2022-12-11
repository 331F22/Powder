import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";

const VoucherManagement = () => {
  const [numCodes, setNumCodes] = useState(0)
  const [openModal, setOpenModal] = useState(false);
  const open = () => {
    setOpenModal(true)
    document.querySelector('body').classList.add('modal-open')
  }

  useEffect(()=>{
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        }
      )
    // setNumCodes()
  }, [])
  
  return (
    <div>
      <h2>Voucher Management</h2>
      {numCodes < 20 ? 
        <div class="alert alert-danger" role="alert">
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
