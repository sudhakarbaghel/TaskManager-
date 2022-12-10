import express from "express"
const app = express()
import mongoose from "mongoose"
import task from "./model/task.js"
app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/AreksoftToDO")
        console.log("connected to mongodb");
    }
    catch (error) {
        throw error
    }
}

app.post("/api/todo/addtask", async (req, res) => {
    const newTask = new task(req.body);
    const addedtask = await newTask.save();
    try {
        res.status(200).json(addedtask)
    } catch (err) {
        res.status(400).json(err)
    }
})

app.get("/api/todo", async (req, res) => {

    try {
        const posts = await task.find();
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json(err)
    }
})

app.post("/api/todo/:id", async (req, res) => {
    try {
        const updateStatus = await task.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        }, { new: true })
        res.status(200).json(updateStatus)
    }
    catch (err) {
        res.status(400).json(err)
    }
})


app.listen(8000, () => {
    connect()
    console.log("chal ria h");
})