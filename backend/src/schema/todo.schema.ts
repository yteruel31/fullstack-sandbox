import { object, string, boolean, number } from "zod";

const params = {
    params: object({
        id: string({
            required_error: "id is required",
        }),
    }),
};

export const createTodoSchema = object({
    body: object({
        idList: number({
            required_error: "IdList is required",
        }),
    }),
});

export const updateTodoSchema = object({
    body: object({
        name: string({
            invalid_type_error: "The type of Name is not valid",
        }).optional(),
        completed: boolean({
            invalid_type_error: "The type of Completed is not valid",
        }).optional(),
        completionDate: string({
            invalid_type_error: "The type of CompletionDate is not valid",
        }).optional(),
    }),
    ...params,
});

export const removeTodoSchema = object({
    ...params,
});
