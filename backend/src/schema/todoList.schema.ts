import { object, string, boolean } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Name is required",
        }),
    }),
};

const params = {
    params: object({
        id: string({
            required_error: "id is required",
        }),
    }),
};

export const createTodoListSchema = object({
    ...payload,
});

export const updateTodoListSchema = object({
    ...payload,
    ...params,
});

export const removeTodoListSchema = object({
    ...params,
});

export const getTodoListSchema = object({
    params: object({
        id: string({
            required_error: "id is required",
        }),
    }),
});
