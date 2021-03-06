var express = require('express')
var router = express.Router()
var widget = require('../models/Widget.js')



// Get All
router.get('/', (req, res, next) => {
  widget.find().exec(function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Get All Widget By machineId
router.get('/board/:boardId', (req, res, next) => {
  widget.find({ boardId: req.params.boardId }, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Create Widget
router.post('/', (req, res, next) => {
  widget.create(req.body, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-widget', 'new')
    res.json(payload)
    res.status(201)
  })
})

// push Widget
router.put('/:widgetId', (req, res, next) => {
  widget.findByIdAndUpdate(req.params.widgetId, req.body, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-widget', 'update')
    res.json(payload)
    res.status(200)
  })
})

// Remove
router.delete('/:widgetId', (req, res, next) => {
  widget.findByIdAndRemove({
    _id: req.params.widgetId
  }, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-widget', 'delete')
    res.json(payload)
    res.status(200)
  })
})

module.exports = router