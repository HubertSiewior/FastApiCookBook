import React, {useState} from 'react'
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import API from "../services/api";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

export const SignIn = () => {
        const dispatch = useDispatch();
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const history = useHistory();
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            history.push('/home')
        }
        const handleSignIn = (event) => {
                event.preventDefault();

                const details = {
                    'username': username,
                    'password': password,
                };
                let formBody = [];
                for (let property in details) {
                    let encodedKey = encodeURIComponent(property);
                    let encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                API.post('/login', formBody, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    }
                })
                    .then(response => {
                        history.push('/home');
                        // error.response.data
                        localStorage.setItem("user", JSON.stringify(response.data));

                    })
                    .catch(error => {
                        try {
                            dispatch(showErrorPopup(error.response.data))
                        } catch (e) {
                            console.error(error);
                        }
                    })
            }
        ;
        return (
            <Form onSubmit={handleSignIn}>
                <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>
                    <h4 className="card-header text-center">Please sign in</h4>
                    <Form.Group controlId="formatBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={event => setUsername(event.target.value)} type="text"
                                      placeholder="Username"/>
                    </Form.Group>
                    <Form.Group controlId="formatBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={event => setPassword(event.target.value)} type="password"
                                      placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" block>Sign in</Button>
                </Col>
            </Form>
        )
    }
;


