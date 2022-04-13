import { baseApi } from "./base.api";

const todoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postTodo: build.mutation({
      query: (body) => ({
        url: "/todos",
        body,
        method: "POST",
      }),
      invalidatesTags: (result, err, args) => [
        { type: "TodoList", id: args.idList },
      ],
      async onQueryStarted({ name, idList }, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          baseApi.util.updateQueryData("getTodoList", idList, (draft) => {
            draft.todos.push({ name });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
    putTodo: build.mutation({
      query: ({ body, arg }) => ({
        url: `/todos/${arg.id}`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["TodoLists"],
      async onQueryStarted({ body, arg }, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          baseApi.util.updateQueryData("getTodoList", arg.idList, (draft) => {
            console.log(draft);
            Object.assign(
              draft.todos,
              draft.todos.map((t) => (t.id === arg.id ? { ...t, ...body } : t))
            );
          })
        );

        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
    deleteTodo: build.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, { idList }) => [
        { type: "TodoList", id: idList },
        "TodoLists",
      ],
    }),
  }),
});

export const {
  usePostTodoMutation,
  usePutTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
