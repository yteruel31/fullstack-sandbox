import {Button, TextField, Typography, Stack, Checkbox, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {useDeleteTodoMutation, usePutTodoMutation} from "../../store/api/todo.api";

export const TodoField = ({data, index, todoList}) => {
    const [putTodo] = usePutTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    return (
        <Stack key={index} direction="row" alignItems="center">
            <Typography sx={{margin: '8px'}} variant='h6'>
                {index + 1}
            </Typography>
            <TextField
                sx={{flexGrow: 1, marginTop: '1rem'}}
                label='What to do?'
                value={data.name}
                onChange={e => {
                    putTodo({body: {name: e.currentTarget.value}, arg: {id: data.id, idList: todoList}})
                }}
            />
            <Stack>
                <Tooltip title="Complete task">
                    <Checkbox checked={data.completed} onChange={e => {
                        putTodo({
                            body: {completed: e.currentTarget.checked},
                            arg: {id: data.id, idList: todoList}
                        })
                    }}/>
                </Tooltip>
                <Button
                    size='small'
                    color='secondary'
                    onClick={() => deleteTodo({id: data.id, idList: todoList})}
                >
                    <DeleteIcon/>
                </Button>
            </Stack>
        </Stack>
    )
}
