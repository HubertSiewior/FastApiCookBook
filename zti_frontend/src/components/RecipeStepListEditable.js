import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {useParams} from "react-router-dom";
import {Button, ListGroup, Form, Row, Col} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";


const RecipeStepItemEditable = (props) => {
    const dispatch = useDispatch();
    const {step_id, description, time} = props;

    const [newDescription, setNewDescription] = useState(description);
    const [newTime, setNewTime] = useState(time);

    const handleDelete = (id) => {
        API.delete(`/recipeStep/${id}`)
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };
    const handleEdit = (id) => {
        API.put(`/recipeStep/${id}`, {
            description: newDescription,
            time: newTime
        })
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };

    return <ListGroup.Item variant="info">
        <Form.Label>Description: </Form.Label>
        <Form.Control onChange={event => setNewDescription(event.target.value)} type="text"
                      defaultValue={description}/>
        <Form.Label>Time: </Form.Label>
        <Row>
            <Col>
                <Form.Control  onChange={event => setNewTime(event.target.value)} type="text"
                               defaultValue={time}/>
            </Col>
            <Col>
                <Button variant="warning" size="sm" block
                        onClick={() => handleEdit(step_id, description, time)}>Edit</Button> {' '}
            </Col>
            <Col>
                <Button variant="danger" size="sm" block type="submit" onClick={() => handleDelete(step_id)}>Delete</Button>
            </Col>
        </Row>
    </ListGroup.Item>
};

export const RecipeStepListEditable = () => {
    const dispatch = useDispatch();
    const [recipeSteps, setRecipeSteps] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        API.get(`/recipe/${id}/recipeSteps`)
            .then((response) => {
                console.log(response);
                setRecipeSteps(response.data)
            })
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    }, [id, dispatch]);
    return (
        <div>
            <p>Steps:</p>
            <ListGroup>
                {recipeSteps.map((item) => <RecipeStepItemEditable key={item.recipe_step_id}
                                                                   step_id={item.recipe_step_id}
                                                                   id={item.recipe_id}
                                                                   time={item.time}
                                                                   description={item.description}/>)}
            </ListGroup>
        </div>
    )
};