import React, { useContext, useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import { AppContext } from "../context/ContextProvider";

function Card({ item, updateCard, removeCard }) {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { _id, title, date, taskStatus, taskColor, deadline, description, tag, assign_to } = item;

  const contexState = useContext(AppContext)
  ;
  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          item={item}
          boardId={taskStatus}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={(e) => { console.log(e); }}
        onDragStart={(e) => { contexState.dragEntered(e, _id) }}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {tag?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                classFor="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeCard(boardname, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {deadline && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(deadline)}
            </p>
          )}
          {assign_to?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {assign_to?.filter((item) => item.completed)?.length}/{assign_to?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
