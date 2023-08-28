import express from "express";
import { Task, User } from "../../mongodb/models/model.js";
import { auth } from "../middlewares/auth.js";

export const taskRouter = new express.Router();
taskRouter.use(express.json());

taskRouter.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.get('/tasks', auth, async (req, res) => {
    try {
        const task = await Task.findById('64e3c0f5460522209f0f866c'); //64e3c18b460522209f0f8674
        await task.populate('owner');

        res.status(201).send({ description: task.description, owner: task.owner });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.get('/usertasks', auth, async (req, res) => {
    try {
        const user = await User.findById('64e3c093460522209f0f865e'); //
        await user.populate('tasks');

        res.status(201).send({userName: user.userName, tasks: user.tasks});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.get('/tasks/validatedUser', auth, async (req, res) => {
    const match = {};
    const sort = {};
    const limit = 22;

    if(req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit,
                skip: parseInt(req.query.skip) * limit,
                sort
            }
        });

        res.status(201).send(req.user.tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});