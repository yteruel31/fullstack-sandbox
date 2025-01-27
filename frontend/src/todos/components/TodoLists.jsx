import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { TodoListForm } from "./TodoListForm";
import {
  useGetTodoListsQuery,
  usePostTodoListMutation,
} from "../../store/api/todoList.api";
import AddIcon from "@mui/icons-material/Add";

export const TodoLists = ({ style }) => {
  const [activeList, setActiveList] = useState();
  const [todoListName, setTodoListName] = useState();
  const { data, isLoading } = useGetTodoListsQuery();
  const [addTodoList] = usePostTodoListMutation();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Stack direction="row" alignItems="center">
            <TextField
              fullWidth
              label="What list?"
              value={todoListName}
              onChange={(event) => {
                setTodoListName(event.currentTarget.value);
              }}
            />
            <Button
              size="small"
              color="secondary"
              onClick={() => addTodoList({ name: todoListName })}
            >
              <AddIcon /> Add List
            </Button>
          </Stack>

          <Typography component="h2" mt={2}>
            My Todo Lists
          </Typography>

          <List>
            {data.map((l, index) => (
              <ListItemButton key={index} onClick={() => setActiveList(index)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={l.name} />
                {l.completed && (
                  <Typography fontStyle="italic">Completed</Typography>
                )}
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {data[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoListId={data[activeList].id}
        />
      )}
    </Fragment>
  );
};
