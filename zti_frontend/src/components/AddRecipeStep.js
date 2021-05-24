import React, {useState} from 'react'
import API from '../services/api'
import {Button, Col, Form as BootStrapForm} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";
import {showErrorPopup} from "../redux/actions";
import {useDispatch} from "react-redux";

export const AddRecipeStep = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const handleSubmit = (event) => {
        API.post(`recipe/${id}/recipeStep`, {description: description, time: time, recipe_id: id})
            .then()
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };
    return (
         <BootStrapForm onSubmit={handleSubmit}>
            <BootStrapForm.Group>
                <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>
                    <h4 className="card-header text-center">New recipe step form</h4>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Description: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setDescription(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Time(minutes): </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setTime(event.target.value)} type="text"/>
                    </BootStrapForm.Group>

                    <BootStrapForm.Group>
                        <Button variant="success" className="mr-2" type='submit' block>Add recipe step</Button>
                    </BootStrapForm.Group>
                    <div className="text-center card-footer text-muted">
                        <a href='/recipe'> Go back to recipe list</a>
                    </div>
                </Col>
            </BootStrapForm.Group>
        </BootStrapForm>


    )
};

