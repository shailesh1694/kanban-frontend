import React, { useState } from "react";

import { X, Save } from "react-feather";

import "./Editable.css";

function Editable({ defaultValue, onSubmit, placeholder, text ,isEdit=false}) {
  const [isEditable, setIsEditable] = useState(isEdit);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (

    <>
      {isEditable ? (
        <div className='editable_edit ' >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <Save color="green" onClick={submission} />
          <X color="red" onClick={() => setIsEditable(false)} />
        </div>
      ) : (
        <p className='editable_display'
          onClick={() => setIsEditable(true)}>
          {text}
        </p>
      )}
    </>
  );
}

export default Editable;
