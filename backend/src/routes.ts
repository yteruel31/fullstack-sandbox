import { Express } from "express";
import {
    create as createTodo,
    update as updateTodo,
    remove as removeTodo,
} from "./controllers/todo.controller";
import {
    todoLists,
    todoList,
    create as createTodoList,
    update as updateTodoList,
    remove as removeTodoList,
} from "./controllers/todoList.controller";

export function routes(app: Express) {
    /* TODO-LIST */
    app.get("/todo-lists", todoLists);
    app.get("/todo-lists/:id", todoList);
    app.post("/todo-lists", createTodoList);
    app.put("/todo-lists/:id", updateTodoList);
    app.delete("/todo-lists/:id", removeTodoList);

    /* TODO */
    app.post("/todos", createTodo);
    app.put("/todos/:id", updateTodo);
    app.delete("/todos/:id", removeTodo);
}
