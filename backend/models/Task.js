const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    subject: String,
    task: String,
    deadline: String,
    completed: Boolean
})

module.exports = mongoose.model("Task", TaskSchema)