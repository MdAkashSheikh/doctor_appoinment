require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const masterSc = require('./models/masterSc');
const patientSc = require('./models/patientSc');
const chamberSc = require('./models/chamberSc');
const timeSc = require('./models/timeSc');
const availabilitySc = require('./models/availabilitySc');
const doctorSc = require('./models/doctorSc');


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
        const newMaster = new masterSc(masterData);
        newMaster.save();

    } catch (err) {
        res.send(err);
    }
})


//For Client

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
    const status = req.body.status;
    const serial = req.body.serial;

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
            "status": status,
            "serial": serial,
        })

        res.send(req.body);
        const newPatient = new patientSc(patientData);
        newPatient.save();

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }

})

app.get('/get-data', async(req, res) => {
    
    try {
        const AllData = await patientSc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.send(err);
    }
})

app.put('/put-patient/:userId', async(req, res) => {
    const id = req.params.userId;

    try {
        await patientSc.findByIdAndUpdate(id);
        res.send('Updated');
    } catch (err) {
        res.send(err);
    }
})


//For Master Chamber

app.post('/post-chamber', async(req, res) => {
    
    console.log(req.body);

    const chamber = req.body.chamber;

    try {
        const chamberData = await chamberSc.create({
            "chamber": chamber,
        })
        res.send(req.body);
        const newChamber = new chamberSc(chamberData);
        newChamber.save();

    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
})

app.get('/get-chamber', async(req, res) => {
    try {
        const AllData = await chamberSc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
})

app.delete('/delete-chamber/:userId', async(req, res) => {
    const id = req.params.userId;

    try {
        await chamberSc.findByIdAndRemove(id);
        res.send('Deleted');
    } catch (err) {
        res.send(err);
    }
})

//For Master Time Management
app.post('/post-time', async(req, res) => {
    
    console.log(req.body);

    const st_time = req.body.st_time;
    const en_time = req.body.en_time;

    try {
        const timeData = await timeSc.create({
            "st_time": st_time,
            "en_time": en_time,
        })

        const newTime = new timeSc(timeData);
        await newTime.save();
        res.send(req.body);

    } catch (err) {
        res.status(404).send(err);
        console.log(err)
    }
})


app.get('/get-time', async(req, res) => {
    try {
        const AllData = await timeSc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
})

app.delete('/delete-time/:userId', async(req, res) => {
    const id = req.params.userId;

    try {
        await timeSc.findByIdAndRemove(id);
        res.send('Deleted');
    } catch (err) {
        res.send(err);
    }
})


//For Availability Management 

app.post('/post-available', async(req, res) => {
    console.log(req.body);

    const chamber = req.body.chamber;
    const time1 = req.body.time1;
    const days = req.body.days;
    const serial = req.body.serial;

    try {
        
        const availData = await availabilitySc.create({
            "chamber": chamber,
            "time1": time1,
            "days": days,
            "serial": serial,
        })

        res.send(req.body);
        const newAvail = new availabilitySc(availData);
        newAvail.save();

    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
})

app.get('/get-available', async(req, res) => {
    try {
        const AllData = await availabilitySc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.send(err);
    }
})

app.delete('/delete-available/:userId', async(req, res) => {
    const id = req.params.userId;

    try {
        await availabilitySc.findByIdAndRemove(id);
        res.send('Deleted');
    } catch (err) {
        res.send(err);
    }
})


//For Doctor Management

app.post('/post-doctor', async(req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const specialist = req.body.specialist;
    const designation = req.body.designation;
    const degree = req.body.degree;
    const experience = req.body.experince;

    try {
        const doctorData = new doctorSc.create({
            "name": name,
            "specialist": specialist,
            "designation": designation,
            "degree": degree,
            "experience": experience,
        })

        res.send(req.body);
        const newDoctor = new doctorSc(doctorData);
        newDoctor.save();

    } catch (err) {
        res.send(err)
    }
})

app.get('/get-doctor', async(req, res) => {
    try {
        const AllData = await doctorSc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.send(err);
    }
})

app.delete('/delete-doctor/:userId', async(req, res) => {
    const id = req.params.userId;

    try {
        await doctorSc.findByIdAndRemove(id);
        res.send('Deleted');
    } catch (err) {
        res.send(err);
    }
})


app.listen(5000, () => {
    console.log('Listening on port 5000')
})
