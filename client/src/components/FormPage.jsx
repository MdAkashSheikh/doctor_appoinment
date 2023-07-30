import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";

function FormPage() {
    const [chamber, setChamber] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [doctor, setDoctor] = useState('');
    const [date1, setDate1] = useState('');
    const [time1, setTime1] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [details, setDetails] = useState('');

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card border="primary" style={{ width: '40rem', marginTop: '3rem'}}>
                    <Card.Header>Form</Card.Header>
                    <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="chamber">
                            <Form.Label>Chamber</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="specialization">
                            <Form.Label>Select Specialization</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="doctor">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </Form.Select>
                            </Form.Group>
                        </Row>

                         <Row className="mb-3">
                            <Form.Group as={Col} controlId="date1">
                            <Form.Label>Age</Form.Label>
                            <DatePicker
                                selected={date1}
                                onChange={(date) => setDate1(date)}
                                includeDateIntervals={[
                                    { start: (new Date(), 1), end: (new Date(), 365) },
                                ]}
                                placeholderText="This only includes dates from 5 days ago to 5 days in the future"
                            />

                            </Form.Group>

                            <Form.Group as={Col} controlId="time1">
                            <Form.Label>Select Time</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                onChange={e => setTime1(e.target.value)}
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
                                onChange={e => setName(e.target.value)}
                            />
                            </Form.Group>

                            <Form.Group as={Col} controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Your Age"
                                onChange={e => setAge(e.target.value)}
                            />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                onChange={e => setGender(e.target.value)}
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
                                onChange={e => setPhone(e.target.value)}
                            />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="details">
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="details here...."
                                style={{ height: '100px' }}
                                onChange={e => setDetails(e.target.value)}
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit">
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