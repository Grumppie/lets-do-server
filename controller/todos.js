import mongoose from 'mongoose'
import Todo from '../model/todos.model.js'

export const readTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
}

export const createTodo = async (req, res) => {
    const todo = new Todo(req.body)
    try {
        await todo.save()
        res.status(201).json(todo)
    } catch (error) {
        res.status(409).json({ Error: error.message })
    }
}
