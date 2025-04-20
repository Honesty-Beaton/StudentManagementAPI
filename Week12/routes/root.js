//Import express module 
const express = require('express');
//create an instance of the express application 
const router = express();
const path = require('path')


router.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})
router.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "about.html"))
})

module.exports = router;