import React, { useContext, useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";
import { AppContext } from "../context/ContextProvider";

import "./Board.css";

function Board({ board }) {

  const [showDropdown, setShowDropdown] = useState(false);
  const contextState = useContext(AppContext);

  return (
    <div className="board"
      id={`${board?.boardname}`}
      onDrop={(e) => { contextState.onDrop(e) }}
      onDragOver={(e) => { e.preventDefault(); }}
    >
      <div className="board_header">
        <p className="board_header_title">
          {board?.boardname}
        </p>
        <div className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              classFor="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {contextState?.all_task?.filter((item) => item.taskStatus === board?.boardname).map((item) => (
          <Card
            key={item._id}
            item={item}
          />
        ))}
      </div>
      <Editable
        placeholder="Enter task title"
        text="Add Task"
        onSubmit={(data) => { contextState.addCardHandler(data, board?.boardname) }}
      />
    </div>
  );
}

export default Board;
