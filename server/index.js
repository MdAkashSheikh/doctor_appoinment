require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
})