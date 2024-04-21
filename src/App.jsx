import React, { useEffect, useState, useContext } from "react";

import Board from "./Components/Board/Board";

import "./App.css";
import Editable from "./Components/Editabled/Editable";
import { AppContext } from "./Components/context/ContextProvider";

function App() {

  const contextState = useContext(AppContext);
  

  useEffect(() => {
    if (!contextState?.allBoard?.length) {
      contextState.callallBoardApi()
    }
    if(!contextState?.allTask?.length){
      contextState.callallTaskApi()
    }
  }, [])


  return (
    <div className="app">
      <div className="app_nav">
        <h1>Kanban Board</h1>
      </div>
      <div className="app_boards_container">
        <div className="app_boards">
          {contextState?.allBoard?.map((item) => (
            <Board
              key={item._id}
              board={item}
            />
          ))}

          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={contextState.addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
