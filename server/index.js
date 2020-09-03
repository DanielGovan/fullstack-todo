const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require("./mongoose");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

// get all todos
app.get("/todos", async (req, res, next) => {
  console.log("get attempt");
  try {
    const todos = await db.Todo.find({});
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "get failed" });
  }
});

// add new todo
app.post("/todos", async (req, res, next) => {
  console.log("post attempt");
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "create failed" });
  }
});

// update existing todo
app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "update failed" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted");
  } catch (err) {
    next({ status: 400, message: "delete failed" });
  }
});

// delete existing todo
app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "error processing request",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
