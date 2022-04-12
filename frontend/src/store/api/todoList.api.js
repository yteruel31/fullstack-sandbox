import {baseApi} from "./base.api";

const todoListApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTodoLists: build.query({
            query: () => "/todo-lists",
            providesTags: ["TodoLists"]
        }),
        getTodoList: build.query({
            query: arg => `/todo-lists/${arg}`,
            providesTags: (result, err, arg) => [{type: "TodoList", id: arg}]
        }),
        postTodoList: build.mutation({
            query: body => ({
                url: "/todo-lists",
                body,
                method: "POST"
            }),
            invalidatesTags: ["TodoLists"]
        })
    }),
});

export const {useGetTodoListsQuery, useGetTodoListQuery, usePostTodoListMutation} = todoListApi;
