import {PrismaClient} from '@prisma/client'
import cors from "cors";
import express from "express";

const prisma = new PrismaClient();
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/todo-lists', async (req, res) => {
    const todoLists = await prisma.todoList.findMany();
    res.json(todoLists);
});

app.get('/todo-lists/:id', async (req, res) => {
    const todoList = await prisma.todoList.findUnique({
        where: {
            id: +req.params.id
        },
        include: {
            todos: true
        }
    });
    res.json(todoList);
});

app.post('/todo-lists', async (req, res) => {
    const todoList = await prisma.todoList.create({
        data: req.body
    });
    res.json(todoList);
});

app.put('/todo-lists/:id', async (req, res) => {
    const todoList = await prisma.todoList.update({
        data: req.body,
        where: {
            id: +req.params.id
        }
    });
    res.json(todoList);
});

app.delete('/todo-lists/:id', async (req, res) => {
    try {
        const todoList = await prisma.todoList.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json(todoList);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message)
    }

});

app.post('/todos', async (req, res) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                name: req.body.name,
                completed: false,
                todoList: {
                    connect: {
                        id: Number(req.body.idList)
                    }
                }
            }
        });
        res.json(todo);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message)
    }
});

app.put('/todos/:id', async (req, res) => {
    const todo = await prisma.todo.update({
        data: req.body,
        where: {
            id: +req.params.id
        }
    });
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    const todo = await prisma.todo.delete({
        where: {
            id: +req.params.id
        }
    });
    res.json(todo);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})
