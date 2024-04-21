import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  Edit,
  Edit2,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";

import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";

import "./CardInfo.css";
import { AppContext } from "../../context/ContextProvider";

function CardInfo({ item, onClose }) {

  const contextState = useContext(AppContext)
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({ ...item });
  const [isEditable, setIsEditable] = useState(false)


  const removeLabel = (label) => {
    const tempLabels = values.tag.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      tag: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      assign_to: [...values.assign_to, task],
    });
  };

  const removeTask = (name) => {
    const tasks = [...values.assign_to];

    const tempTasks = tasks.filter((item) => item.text !== name);
    setValues({
      ...values,
      assign_to: tempTasks,
    });
  };

  const updateTask = (name, value) => {
    const tasks = [...values.assign_to];

    const index = tasks.findIndex((item) => item.text === name);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
            <Edit onClick={() => { setIsEditable((pre) => !pre) }} />
          </div>
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={(e) => { setValues((pre) => { return { ...pre, title: e } }) }}
            isEdit={isEditable}
            key={isEditable}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Description</p>
          </div>
          <Editable
            defaultValue={values.description}
            text={values.description || "Add a Description"}
            placeholder="Enter description"
            onSubmit={(e) => {setValues((pre) => { return { ...pre, description: e } }) }}
            isEdit={isEditable}
            key={isEditable}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            value={values.deadline ? new Date(values.deadline).toLocaleDateString('fr-CA'):""}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => { setValues((pre) => { return { ...pre, deadline: event.target.value } }) }}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo_box_labels">
            {values.tag?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              setValues((pre) => { return { ...pre, tag: [...pre.tag, { text: value, color: selectedColor }] } })
            }
            isEdit={isEditable}
            key={isEditable}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className="cardinfo_box_task_list">
            {values.assign_to?.map((item,index) => (
              <div key={index} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.text, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.text)} />
              </div>
            ))}
          </div>
          <Editable
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
            isEdit={isEditable}
            key={isEditable}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="editable_button" onClick={() => { contextState.taskDataUpdate(values) }} >UpdateTask</button>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
