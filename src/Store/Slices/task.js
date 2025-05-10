import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [], // array of all tasks
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },


    updateTask: (state, action) => {
      const { _id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task._id === _id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },

   
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },

    setTasks: (state, action) => {
      state.tasks = action.payload;
    }
  },
});

export const { addTask, updateTask, deleteTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
