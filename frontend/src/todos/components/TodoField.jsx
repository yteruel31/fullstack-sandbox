import {Button, TextField, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {useDeleteTodoMutation, usePutTodoMutation} from "../../store/api/todo.api";

export const TodoField = ({todo, index, todoList}) => {
    const [putTodo] = usePutTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation()
    const [todoName, setTodoName] = useState(todo.name);
    console.log(todo)

    return (<div key={index} style={{display: 'flex', alignItems: 'center'}}>
        <Typography sx={{margin: '8px'}} variant='h6'>
            {index + 1}
        </Typography>
        <TextField
            sx={{flexGrow: 1, marginTop: '1rem'}}
            label='What to do?'
            value={todoName}
            onChange={e => {
                setTodoName(e.currentTarget.value);
                putTodo({body: {name: e.currentTarget.value}, arg: {id: todo.id, idList: todoList}})
            }}
        />
        <Button
            sx={{margin: '8px'}}
            size='small'
            color='secondary'
            onClick={() => deleteTodo({id: todo.id, idList: todoList})}
        >
            <DeleteIcon/>
        </Button>
    </div>)
}
