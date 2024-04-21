import React, { createContext, useReducer, useState } from 'react';
import { reducer } from './reducer';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const InitialState = {
        allTask: [],
        allBoard: []
    }
    const token = localStorage.getItem("token");
    const [state, dispatch] = useReducer(reducer, InitialState)


    const addboardHandler = (data) => {
        fetch("http://localhost:8080/api/v1/create_board",
            {
                method: "post",
                body: JSON.stringify({ "boardname": data }),
                headers: { "Content-Type": "application/json", "Authorization": token }
            })
            .then((res) => res.json())
            .then((result) => result.success && callallBoardApi())
            .catch((error) => console.log(error, "errorinboard"))
    };

    const callallBoardApi = () => {
        fetch("http://localhost:8080/api/v1/all_board", { headers: { "Authorization": token } })
            .then((res) => res.json())
            .then((result) => dispatch({ type: "init_board", payload: result }))
            .catch((error) => console.log(error, "errorinboard"))
    }

    const callallTaskApi = () => {
        fetch("http://localhost:8080/api/v1/all_task", { headers: { "Authorization": token } })
            .then((res) => res.json())
            .then((result) => dispatch({ type: "init-task", payload: result }))
            .catch((error) => console.log(error, "errorinboard"))
    }

    const addCardHandler = (data, ticketstatus) => {
        fetch("http://localhost:8080/api/v1/create_task", {
            method: "post",
            body: JSON.stringify({ "title": data, "taskStatus": ticketstatus }),
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => res.json())
            .then((result) => result.success && callallTaskApi())
            .catch((error) => console.log(error, "errorinboard"))
    }

    const dragEntered = (e, taskId) => {
        e.dataTransfer.setData('text/plain', taskId);
    };

    const onDrop = (event) => {

        const boardname = event.currentTarget.id;
        const taskId = event.dataTransfer.getData("text/plain")

        dispatch({ type: "task-status", payload: { boardname: boardname, taskId: taskId, } })
        cardStatusUpdate(taskId, boardname)
        event.dataTransfer.clearData();
    }

    const cardStatusUpdate = (id, ticketstatus) => {
        fetch("http://localhost:8080/api/v1/task_status_update", {
            method: "put",
            body: JSON.stringify({ "taskId": id, "newStatus": ticketstatus }),
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => res.json())
            .then((result) => result.success && callallTaskApi())
            .catch((error) => console.log(error, "errorinboard"))
    }

    const taskDataUpdate = (data) => {
        // title, taskStatus, tag, description, deadline, assign_to, taskColor, taskId
        const reqBody = {
            title: data.title,
            taskStatus: data.taskStatus,
            tag: data.tag,
            description: data.description,
            deadline: data.deadline,
            assign_to: data.assign_to,
            taskColor: data.taskColor,
            taskId: data._id
        }
        fetch("http://localhost:8080/api/v1/update_task", {
            method: "put",
            body: JSON.stringify(reqBody),
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => res.json())
            .then((result) => result.success && callallTaskApi())
            .catch((error) => console.log(error, "errorinboard"))
    }

    return (
        <AppContext.Provider
            value={
                {
                    ...state,
                    callallBoardApi,
                    addboardHandler,
                    callallTaskApi,
                    addCardHandler,
                    cardStatusUpdate,
                    dragEntered,
                    onDrop,
                    taskDataUpdate
                }
            }>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

