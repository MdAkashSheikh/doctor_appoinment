require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const masterSc = require('./models/masterSc');
const patientSc = require('./models/patientSc');


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



app.get('/get-data', async(req, res) => {
    
    try {
        const AllData = await masterSc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.send(err);
    }
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
        const newMaster = new masterSc(masterData);
        newMaster.save();

    } catch (err) {
        res.send(err);
    }
})

app.post('/client-data', async(req, res) => {

    console.log(req.body);
    
    const chamber = req.body.chamber;
    const specialist = req.body.specialist;
    const doctor = req.body.doctor;
    const date1 = req.body.date1;
    const time1 = req.body.time1;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const details = req.body.details;

    try {
        
        const patientData = await patientSc.create({
            "chamber": chamber,
            "specialist": specialist,
            "doctor": doctor,
            "date1": date1,
            "time1": time1,
            "name": name,
            "age": age,
            "gender": gender,
            "phone": phone,
            "details": details,
        })

        res.send(req.body);
        const newPatient = new patientSc(patientData);
        newPatient.save();

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }

})


app.listen(5000, () => {
    console.log('Listening on port 5000')
})
