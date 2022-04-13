import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function todoLists(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const todoLists = await prisma.todoList.findMany({
            select: {
                id: true,
                name: true,
                todos: {
                    select: {
                        completed: true,
                    },
                },
            },
        });

        res.json(
            todoLists.map((l) => ({
                ...l,
                completed:
                    l.todos.length > 0 && l.todos.every((t) => t.completed),
            }))
        );
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }
}

export async function todoList(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const todoList = await prisma.todoList.findUnique({
            where: {
                id: +req.params.id,
            },
            include: {
                todos: true,
            },
        });
        res.json(todoList);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }
}

export async function create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const todoList = await prisma.todoList.create({
            data: req.body,
        });
        res.json(todoList);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }
}

export async function update(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const todoList = await prisma.todoList.update({
            data: req.body,
            where: {
                id: +req.params.id,
            },
        });
        res.json(todoList);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }
}

export async function remove(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const todoList = await prisma.todoList.delete({
            where: {
                id: +req.params.id,
            },
        });
        res.json(todoList);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }
}
