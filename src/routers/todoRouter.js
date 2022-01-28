import express from "express";
import Todo from "../models/Todo.js";

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  const todos = await Todo.find({}, { _id: 0, __v: 0 });
  console.log(todos);
  res.json(todos);
});
todoRouter.post("/", async (req, res) => {
  const todo = new Todo({
    id: req.body.id,
    text: req.body.text,
    checked: req.body.checked,
  });
  await todo.save().then((result) => {
    res.status(201).json(result);
  });
});

todoRouter.delete("/", async (req, res) => {
  await Todo.findOneAndDelete({ id: `${req.body.id}` }).then((result) => {
    res.json(result);
  });
});

todoRouter.patch("/", async (req, res) => {
  await Todo.findOne({ id: `${req.body.data.id}` }, function (err, toggleData) {
    if (err) {
      res.send(err);
    } else {
      toggleData.checked = !toggleData.checked;
      toggleData.save(function (err, updatedData) {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedData);
        }
      });
    }
  }).clone();
});
export default todoRouter;
