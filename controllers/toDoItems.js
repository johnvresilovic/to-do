const express = require('express');
const router = express.Router();
const items = require('../models/ToDoItems');

// Index
router.get('/', (req, res)=>{
    items.find({}, (err, foundItems)=>{
        res.json(foundItems);
    });
});
// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res)=>{
    items.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
        res.json(deletedItem);
    });
});
// Update
router.put('/:id', (req, res)=>{
    items.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedItem)=>{
        res.json(updatedItem);
    });
});
// Create
router.post('/', (req, res)=>{
    items.create(req.body, (err, createdItem)=>{
        res.json(createdItem); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res)=>{
    items.findById(req.params.id, (err, foundItem)=>{
        res.json(foundItem);
    });
});


module.exports = router;