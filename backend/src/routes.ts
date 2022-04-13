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
import validateResource from "./middleware/validateResource";
import {
    createTodoSchema,
    updateTodoSchema,
    removeTodoSchema,
} from "./schema/todo.schema";
import {
    createTodoListSchema,
    getTodoListSchema,
    removeTodoListSchema,
    updateTodoListSchema,
} from "./schema/todoList.schema";

export function routes(app: Express) {
    /* TODO-LIST */
    app.get("/todo-lists", todoLists);
    app.get("/todo-lists/:id", validateResource(getTodoListSchema), todoList);
    app.post(
        "/todo-lists",
        validateResource(createTodoListSchema),
        createTodoList
    );
    app.put(
        "/todo-lists/:id",
        validateResource(updateTodoListSchema),
        updateTodoList
    );
    app.delete(
        "/todo-lists/:id",
        validateResource(removeTodoListSchema),
        removeTodoList
    );

    /* TODO */
    app.post("/todos", validateResource(createTodoSchema), createTodo);
    app.put("/todos/:id", validateResource(updateTodoSchema), updateTodo);
    app.delete("/todos/:id", validateResource(removeTodoSchema), removeTodo);
}
