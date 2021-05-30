import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {useParams} from "react-router-dom";
import {Button, ListGroup, Form, Row, Col} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";
import {useHistory} from "react-router-dom";

const RecipeStepItemEditable = (props) => {
    const dispatch = useDispatch();
    const {step_id, description, time} = props;
    const history = useHistory();
    const [newDescription, setNewDescription] = useState(description);
    const [newTime, setNewTime] = useState(time);

    const handleDelete = (event, id) => {
        console.log(id)
        event.preventDefault()
        API.delete(`/recipe/recipeStep/${id}/delete`)
            // .then(response => history.push('/editRecipe/${id}'))
            .then( window.location.reload())

            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };
    const handleEdit = (event, id) => {
        event.preventDefault()
        console.log(newDescription + "   " + newTime)
        API.put(`/recipe/recipeStep/${id}`, {
            description: newDescription.toString(),
            time: newTime.toString(),
            recipe_id: 3
        })
            .then( window.location.reload())
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
                        onClick={(event) => handleEdit(event, step_id, description, time)}>Edit</Button> {' '}
            </Col>
            <Col>
                <Button variant="danger" size="sm" block type="submit" onClick={(event) => handleDelete(event, step_id)}>Delete</Button>
            </Col>
        </Row>
    </ListGroup.Item>
};

export const RecipeStepListEditable = () => {
    const dispatch = useDispatch();
    const [recipeSteps, setRecipeSteps] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        API.get(`/recipe/${id}/recipeStep`)
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
                                                                   step_id={item.id}
                                                                   id={item.recipe_id}
                                                                   time={item.time}
                                                                   description={item.description}/>)}
            </ListGroup>
        </div>
    )
};