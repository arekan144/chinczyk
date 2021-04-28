const express = require('express');
const path = require('path')

var router = express.Router();

router.get('/', function (req, res) {
    
    res.set({ 'Content-Type': 'text/html' });
    res.sendFile(path.join(__dirname + "/../static/index.html"));
})

router.get("/style.css", (req, res) => {
    res.set({ 'Content-Type': 'text/css' })
    res.sendFile(path.join(__dirname + "/../static/style.css"))
})

module.exports = router;