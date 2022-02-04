import mongoose from 'mongoose'
import Todo from '../model/todos.model.js'
import express from 'express'
import { createTodo, readTodos } from '../controller/todos.js'

const Route = express.Router()

Route.get('/', readTodos)
Route.post('/', createTodo)
Route.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (Todo.exists({ _id: id })) {
        try {
            await Todo.deleteOne({ _id: id })
            return res.status(202).json({ msg: `Todo with id: ${id} was deleted` })
        } catch (error) {
            return res.status(409).json(error.message)
        }
    }
    return res.status(409).json(error.message)
})
Route.patch('/:id', async (req, res) => {
    const id = req.params.id
    if (Todo.exists({ _id: id })) {
        try {
            await Todo.updateOne({ _id: id }, { $set: req.body })
            res.status(202).json({ msg: `Todo with id: ${id} was updated` })
        } catch (error) {
            res.status(409).json({ Error: error.message })
        }
    }
    res.status(400).json({ Error: 'Enter valid id' })
})

Route.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById({ _id: req.params.id })
        todo.completed = !todo.completed
        todo.save()
        res.status(202).json(todo)
    } catch (error) {
        res.status(409).json({ Error: error.message })
    }
})

export default Route

