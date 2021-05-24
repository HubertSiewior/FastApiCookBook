import React, {useState} from 'react'
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import API from "../services/api";
import {showErrorPopup} from "../redux/actions";
import {useDispatch} from "react-redux";

export const SignUp = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    if(JSON.parse(localStorage.getItem('user')) !== null){
        history.push('/home')
    }
    const handleSignUp = (event) => {
        event.preventDefault();
        API.post(`/user/create`, {username: username, password_hash: password, email: email})
            .then(response => history.push('/home'))
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };

    return (
        <Form onSubmit={handleSignUp}>
            <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>
                <h4 className="card-header text-center">Please sign up</h4>
                <Form.Group controlId="formatBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={event => setUsername(event.target.value)} type="text"
                                  placeholder="Username"/>
                </Form.Group>
                <Form.Group controlId="formatBasicEmail">
                    <Form.Label>e-mail</Form.Label>
                    <Form.Control onChange={event => setEmail(event.target.value)} type="text"
                                  placeholder="e-mail"/>
                </Form.Group>
                <Form.Group controlId="formatBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={event => setPassword(event.target.value)} type="password"
                                  placeholder="Password"/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="....I agree to everything" required/>
                </Form.Group>
                <Button variant="primary" type="submit" block>Sign up</Button>
            </Col>
        </Form>
    )
};

