import React from "react";

import "./Modal.css";

function Modal({onClose,children}) {
  
  return (
    <div
      className="modal"
      onClick={() => (onClose ? onClose() : "")}
    >
      <div
        className="modal_content custom-scroll"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
