const mongoose = require("mongoose")
const toDoSchema = new mongoose.Schema({
    description: String,
    complete: Boolean
})
const toDos = mongoose.model("toDo", toDoSchema)

module.exports = toDos