import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todocontroller.js";

const router = express.Router();

router.get("/gettodos", getTodos);         // Fetch all todos
router.post("/createtodo", createTodo);    // Add a new todo
router.put("/updatetodo/:id", updateTodo); // Update a todo
router.delete("/deletetodo/:id", deleteTodo); // Delete a todo

export default router;
