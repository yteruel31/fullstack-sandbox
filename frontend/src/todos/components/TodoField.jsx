import {
  Button,
  Checkbox,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {
  useDeleteTodoMutation,
  usePutTodoMutation,
} from "../../store/api/todo.api";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";

export const TodoField = ({ data, index, todoList }) => {
  const [putTodo] = usePutTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  function getUntilTime(date) {
    const now = moment(date);
    const diff = moment.utc(now.diff(moment()));
    const formatted = diff.format("d [days &] HH [hours]");
    return now.isAfter(moment(), "day") ? (
      <Typography sx={{ margin: "8px" }} fontStyle="italic">
        {formatted} remaining
      </Typography>
    ) : (
      <Typography sx={{ margin: "8px" }} fontStyle="italic" color="darkred">
        {formatted} overdue
      </Typography>
    );
  }

  return (
    <Stack
      key={index}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography sx={{ marginLeft: "8px" }} variant="h6">
          {index + 1}
        </Typography>
        <TextField
          sx={{ flexGrow: 1, marginTop: "1rem" }}
          label="What to do?"
          value={data.name}
          onChange={(e) => {
            putTodo({
              body: { name: e.currentTarget.value },
              arg: { id: data.id, idList: todoList },
            });
          }}
        />
        <DateTimePicker
          label="Completion date & time"
          value={data.completionDate}
          onChange={(e) => {
            putTodo({
              body: { completionDate: e },
              arg: { id: data.id, idList: todoList },
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        {data.completionDate &&
          !data.completed &&
          getUntilTime(data.completionDate)}
      </Stack>
      <Stack direction="row">
        <Tooltip title="Complete task">
          <Checkbox
            checked={data.completed}
            onChange={(e) => {
              putTodo({
                body: { completed: e.currentTarget.checked },
                arg: { id: data.id, idList: todoList },
              });
            }}
          />
        </Tooltip>
        <Button
          size="small"
          color="secondary"
          onClick={() => deleteTodo({ id: data.id, idList: todoList })}
        >
          <DeleteIcon />
        </Button>
      </Stack>
    </Stack>
  );
};
