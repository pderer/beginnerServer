import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  checked: { type: Boolean, required: true, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
