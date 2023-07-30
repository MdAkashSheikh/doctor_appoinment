require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const masterSc = require('./models/masterSc');


const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONN)
.then(()=> console.log('Database Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/master-data', async(req, res) => {

    const chamber = req.body.chamber;
    const specialist = req.body.specialist;
    const dr_name = req.body.dr_name;
    const s_time = req.body.s_time;
    
    try {

        const masterData = await masterSc.create({
            'chamber': chamber,
            'specialist': specialist,
            'dr_name': dr_name,
            's_time': s_time,
        })
        res.send(req.body);
        const newData = new masterSc(masterData);
        newData.save();

    } catch (err) {
        res.send(err);
    }
})

app.post('/client-data', async(req, res) => {
    
    const chamber = req.body.chamber;
    const specialist = req.body.specialist;
    const doctor = req.body.doctor;

})


app.listen(5000, () => {
    console.log('Listening on port 5000')
})
