import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; //  From .env

//  Fetch all todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${API_URL}/gettodos`);
  return response.data;
});

//  Add a new todo
export const addUser = createAsyncThunk("todos/addUser", async ({ title, desc }) => {
  const response = await axios.post(`${API_URL}/createtodo`, { title, desc });
  return response.data;
});

// Update a todo
export const updateUser = createAsyncThunk("todos/updateUser", async ({ id, title, desc }) => {
  const response = await axios.put(`${API_URL}/updatetodo/${id}`, { title, desc });
  return response.data;
});

// Delete a todo
export const deleteUser = createAsyncThunk("todos/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/deletetodo/${id}`);
  return id;
});

// SLICE 
const todoslice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {}, //  No manual reducers, only async actions
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Todo
      .addCase(addUser.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })

      // Update Todo
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })

      // Delete Todo
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoslice.reducer;
