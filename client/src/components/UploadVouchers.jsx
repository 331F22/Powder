import React, { useState } from "react";
import Modal from "./Modal";

const VoucherManagement = () => {

  const [openModal, setOpenModal] = useState(false);
  const open = () => {
    setOpenModal(true)
    document.querySelector('body').classList.add('modal-open')
  }
  return (
    <div>
      <h2>Voucher Management</h2>
      <p>Remaining number of codes will go here</p>
      <Modal setOpenModal={setOpenModal} openModal={openModal}/>
      <button className="btn btn-primary" onClick={() => open()}>Add Codes</button>
    </div>
  );
}

export default VoucherManagement;
