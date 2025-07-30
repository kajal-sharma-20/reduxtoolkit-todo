import Todo from "../model/todomodel.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) return res.status(400).json({ message: "Title and Description are required" });

    const newTodo = new Todo({ title, desc });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
