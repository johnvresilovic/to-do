const mongoose = require("mongoose")
const toDoSchema = new mongoose.Schema({
    description: String,
    complete: Boolean
})
const toDoItems = mongoose.model("toDoItems", toDoSchema)

module.exports = toDoItems