import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const todo = await prisma.todo.create({
            data: {
                name: req.body.name,
                completed: false,
                todoList: {
                    connect: {
                        id: Number(req.body.idList),
                    },
                },
            },
        });
        res.json(todo);
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
        const todo = await prisma.todo.update({
            data: req.body,
            where: {
                id: +req.params.id,
            },
        });
        res.json(todo);
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
        const todo = await prisma.todo.delete({
            where: {
                id: +req.params.id,
            },
        });
        res.json(todo);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }
}
