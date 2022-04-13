import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetTodoListQuery } from "../../store/api/todoList.api";
import { usePostTodoMutation } from "../../store/api/todo.api";
import { TodoField } from "./TodoField";

export const TodoListForm = ({ todoListId }) => {
  const { data, isLoading } = useGetTodoListQuery(todoListId);
  const [addTodo] = usePostTodoMutation();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Card sx={{ margin: "0 1rem" }}>
      <CardContent>
        <Typography component="h2">{data.name}</Typography>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Stack spacing={2}>
            {data.todos?.map((t, index) => (
              <TodoField
                key={index}
                data={t}
                index={index}
                todoList={todoListId}
              />
            ))}
          </Stack>
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => addTodo({ name: "", idList: todoListId })}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
};
