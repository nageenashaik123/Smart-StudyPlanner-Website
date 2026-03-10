const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Task = require("./models/Task")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://shaiknageena717_db_user:Nageena123@ac-wo2mjoy-shard-00-00.j7yo0eo.mongodb.net:27017,ac-wo2mjoy-shard-00-01.j7yo0eo.mongodb.net:27017,ac-wo2mjoy-shard-00-02.j7yo0eo.mongodb.net:27017/studentplanner?ssl=true&replicaSet=atlas-fqwnmt-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
res.send("Student Planner Backend Running 🚀")
})

app.post("/tasks", async (req,res)=>{
const newTask = new Task(req.body)
await newTask.save()
res.json(newTask)
})

app.get("/tasks", async (req,res)=>{
const tasks = await Task.find()
res.json(tasks)
})

app.delete("/tasks/:id", async (req,res)=>{
await Task.findByIdAndDelete(req.params.id)
res.json({message:"Task deleted"})
})

app.put("/tasks/:id", async (req,res)=>{
const updatedTask = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)
res.json(updatedTask)
})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})