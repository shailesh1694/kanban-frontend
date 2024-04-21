


export const reducer = (state, action) => {

    switch (action.type) {
        case "init_board":
            return {
                ...state, allBoard: [...action.payload.data]
            }
        case "init-task":
            return {
                ...state, all_task: [...action.payload.data]
            }
        case "task-status":
            return {
                ...state, all_task: state.all_task.map((val) => {
                    if (val._id === action.payload.taskId) {
                        return { ...val, taskStatus: action.payload.boardname }
                    }
                    return val;
                })
            }
        default: state
            break;
    }

}