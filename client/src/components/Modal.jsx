import React from "react";
import UploadContent from "./UploadModalContent";

const Modal = (props) => {
  const {openModal, setOpenModal } = props;
  const close = () => {
    setOpenModal(false);
    document.querySelector('body').classList.remove('modal-open')
  };

  if (!openModal) {
    return;
  }
  return (
    <>
      <div onClick={() => close()} className="modal-Background"></div>
      <div className="modalContainer">
        <UploadContent setOpenModal={setOpenModal} />
      </div>
    </>
  );
};

export default Modal;
