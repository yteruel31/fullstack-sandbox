import React, {Fragment, useState, useEffect} from 'react'
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Button,
    TextField, ListItemButton, Stack
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import {TodoListForm} from './TodoListForm'
import {useGetTodoListsQuery, usePostTodoListMutation} from "../../store/api/todoList.api";
import AddIcon from "@mui/icons-material/Add";


export const TodoLists = ({style}) => {
    const [activeList, setActiveList] = useState();
    const [todoListName, setTodoListName] = useState();
    const {data, isLoading} = useGetTodoListsQuery();
    const [addTodoList] = usePostTodoListMutation();

    if (isLoading) {
        return null;
    }

    return <Fragment>
        <Card style={style}>
            <CardContent>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                        sx={{flexGrow: 1, marginTop: '1rem'}}
                        label='What list?'
                        value={todoListName}
                        onChange={event => {
                            setTodoListName(event.currentTarget.value);
                        }}
                    />
                    <Button
                        sx={{margin: '8px'}}
                        size='small'
                        color='secondary'
                        onClick={() => addTodoList({name: todoListName})}
                    >
                        <AddIcon/> Add List
                    </Button>
                </div>

                <Typography
                    component='h2'
                >
                    My Todo Lists
                </Typography>

                <List>
                    {data.map((l, index) => <ListItemButton
                        key={index}
                        onClick={() => setActiveList(index)}
                    >
                        <ListItemIcon>
                            <ReceiptIcon/>
                        </ListItemIcon>
                        <ListItemText primary={l.name}/>
                        {l.completed && <Typography fontStyle="italic"
                        >
                            Completed
                        </Typography>}
                    </ListItemButton>)}
                </List>
            </CardContent>
        </Card>
        {data[activeList] && <TodoListForm
            key={activeList} // use key to make React recreate component to reset internal state
            todoListId={data[activeList].id}
        />}
    </Fragment>
}
