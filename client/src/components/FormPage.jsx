import axios from 'axios';
import { subDays } from 'date-fns';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = "//localhost:5000";
        
function FormPage() {
    const [chamber, setChamber] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [doctor, setDoctor] = useState('');
    const [date1, setDate1] = useState(null);
    const [time1, setTime1] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [details, setDetails] = useState('');
    const [status, setStattus] = useState('Not Updated')

    
    const refChamber = useRef("");
    const refSpecialist = useRef("");
    const refDoctor = useRef("");
    const refDate = useRef("");
    const refTime = useRef("");
    const refName = useRef("");
    const refAge = useRef("");
    const refGender = useRef("");
    const refPhone = useRef("");
    const refDetails = useRef("");

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(chamber);
        console.log(specialist);
        console.log(doctor);
        console.log(date1);
        console.log(time1);
        console.log(name);
        console.log(age);
        console.log(gender);
        console.log(phone);
        console.log(details);


        try {
            const result = await axios.post(`${baseUrl}/client-data`, {
                chamber: chamber,
                specialist: specialist,
                doctor: doctor,
                date1: date1,
                time1: time1,
                name: name,
                age: age,
                gender: gender,
                phone: phone,
                details:details,
                status:status,
            })
            
            console.log(result.data);

        } catch (err) {
            console.log(err);
        }

        refChamber.current.value = "";
        refSpecialist.current.value = "";
        refDoctor.current.value = "";
        refDate.current.value = "";
        refTime.current.value = "";
        refName.current.value = "";
        refAge.current.value = "";
        refGender.current.value = "";
        refPhone.current.value = "";
        refDetails.current.value = "";
    }

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card border="primary" style={{ width: '40rem', marginTop: '3rem'}}>
                    <Card.Header>Form</Card.Header>
                    <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="chamber">
                            <Form.Label>Chamber</Form.Label>
                            <Form.Select 
                                defaultValue="Choose..."
                                ref={refChamber}
                                onChange={e => setChamber(e.target.value)}
                                value={chamber}
                            >
                                <option>Choose...</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="specialist">
                            <Form.Label>Select Specialization</Form.Label>
                            <Form.Select
                                 defaultValue="Choose..."
                                 ref={refSpecialist}
                                 onChange={e => setSpecialist(e.target.value)}
                                 value={specialist}
                            >
                                <option>Choose...</option>
                                <option>ENT</option>
                                <option>Cardiologists</option>
                                <option>Dermatologists</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="doctor">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Select 
                                defaultValue="Choose..."
                                ref={refDoctor}
                                onChange={e => setDoctor(e.target.value)}
                                value={doctor}
                            >
                                <option>Choose...</option>
                                <option value="Dr. X">Dr. X</option>
                                <option value="Dr. Y">Dr. Y</option>
                                <option value="Dr. Z">Dr. Z</option>
                            </Form.Select>
                            </Form.Group>
                        </Row>

                         <Row className="mb-3">
                            <Form.Group as={Col} controlId="date1">
                            <Form.Label>Date</Form.Label>
                            <div>
                                <DatePicker
                                    selected={date1}
                                    onChange={e => setDate1(e)}
                                    minDate={subDays(new Date(), 0)}
                                    placeholderText="Select date"
                                />
                            </div>
                            </Form.Group>

                            <Form.Group as={Col} controlId="time1">
                            <Form.Label>Select Time</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                ref={refTime}
                                onChange={e => setTime1(e.target.value)}
                                value={time1}
                            >
                                <option>Choose...</option>
                                <option value='9-12'> 9:00-12:00</option>
                                <option value='15-18'>15:00-18:00</option>
                                <option value='16-20'>16:00-20:00</option>
                            </Form.Select>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                ref={refName}
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                            </Form.Group>

                            <Form.Group as={Col} controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Your Age"
                                ref={refAge}
                                onChange={e => setAge(e.target.value)}
                                value={age}
                            />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                ref={refGender}
                                onChange={e => setGender(e.target.value)}
                                value={gender}
                            >
                                <option>Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Your number"
                                ref={refPhone}
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                            />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="details">
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="details here...."
                                ref={refDetails}
                                style={{ height: '100px' }}
                                onChange={e => setDetails(e.target.value)}
                                value={details}
                            />
                        </Form.Group>

                        <Button onClick={handleSubmit} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default FormPage