import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  currTaskIdToEdit: "",
  currColIdToEdit: "",
  isDialogOpen: false,
};

// createSlice: A function that accepts an initial state, an object full of reducer functions, and a "slice name",
// and automatically generates action creators and action types that correspond to the reducers and state.
// actions: are payloads of information that describe changes to the application state.
// reducers: A reducer is a pure function that specifies how the state of a slice should be updated in response to dispatched actions.
// Reducers are functions that determine changes to an application's state. They can have any name, but they must return a new state immutably,
// by taking the previous state and returning an updated state.
// state: The state of a Redux slice represents the data associated with that particular slice.
// It is managed by the generated reducer function and stored within the Redux store.

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    /* Default reducers start */
    // Sets "currTaskIdToEdit" to the id of the current task being edited
    setCurrTaskIdToEdit: (state, action) => {
      state.currTaskIdToEdit = action.payload.taskId;
    },
    // Sets "currColIdToEdit" to the id of the current column in which the task is being edited
    setCurrColIdToEdit: (state, action) => {
      state.currColIdToEdit = action.payload.currTaskColId;
    },
    // Changes the state of the edit dialog box between open and close
    setDialogStatus: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    /* Default reducers end */

    // Add new reducers here
    setAllTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },

    setAllColumns: (state, action) => {
      state.columns = action.payload.columns;
    },

    setColumnOrder: (state, action) => {
      state.columnOrder = action.payload.columnOrder;
    },

    // reducer, dragColumns, that receives the new column order as payload.
    dragColumns: (state, action) => {
      state.columnOrder = action.payload;
    },

    // receives the data of the updated column as payload. It will update this column’s taskIds array with the rearranged task IDs.
    dragTasksSameColumn: (state, action) => {
      const colId = action.payload.id;
      const taskIds = action.payload.taskIds;

      state.columns[colId].taskIds = taskIds;
    },

    dragTasksDifferentColumn: (state, action) => {
      let { srcColId, srcTaskIds, dstColId, dstTaskIds } = action.payload;

      state.columns[srcColId].taskIds = srcTaskIds;
      state.columns[dstColId].taskIds = dstTaskIds;
    },

    addNewTask: (state, action) => {
      const { columnId } = action.payload;
      const taskId = `task-${Math.random().toString(36).substr(2, 9)}}`;

      state.tasks[taskId] = {
        id: taskId,
        taskTitle: "New task",
        taskDescription: "new description",
      };

      state.columns[columnId].taskIds.push(taskId);
    },

    updateTask: (state, action) => {
      const { id, taskTitle, taskDescription } = action.payload;

      const updatedTask = {
        id: id,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
      };
      // update the data base only if the task title or task description changes
      if (
        state.tasks[id].taskTitle !== taskTitle ||
        state.tasks[id].taskDescription !== taskDescription
      ) {
        state.tasks[id] = updatedTask;
      }
    },

    deleteTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
        (item) => item !== taskId,
      );
      delete state.tasks[taskId];
    },
  },
});

export const {
  setAllColumns,
  setAllTasks,
  setColumnOrder,
  setCurrColIdToEdit,
  setCurrTaskIdToEdit,
  setDialogStatus,
  dragColumns,
  dragTasksSameColumn,
  dragTasksDifferentColumn,
  addNewTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
