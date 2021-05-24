import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import API from '../services/api'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {RecipeStepList} from "./RecipeStepList";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

export const Recipe = () => {
    const dispatch = useDispatch();
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();
    const history = useHistory();
    if (JSON.parse(localStorage.getItem('user')) === null) {
        history.push('/')
    }
    useEffect(() => {
        if (id) {
            API.get(`recipe/${id}`)
                .then(response => {
                    console.log(response.data);
                    setRecipe(response.data)
                })
                .catch(error => {
                    dispatch(showErrorPopup(error.response.data))
                })
        }
    }, [id, dispatch]);

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

    const handleDelete = (id) => {
        console.log(recipe)
        recipeSteps.map((item) => API.delete(`/recipe/recipeStep/${item.recipe_step_id}/delete`)
            .then(() => API.delete(`/recipe/${id}/delete`)
                .then(() => history.push('/recipe'))
                .catch(error => {
                    dispatch(showErrorPopup(error.response.data))
                }))
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            }));

        API.delete(`/recipe/${id}/delete`)
            .then(() => history.push('/recipe'))
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };


    return (
        <Form>
            <Form.Group>
                <Col md={{span: 8, offset: 2}} sm={{span: 8, offset: 2}}>
                    <h4 className="card-header text-center">{recipe.dish_name}</h4>
                    <Form.Group>
                        <Form.Label>Dish name: {recipe.dish_name}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Average time (minutes): {recipe.average_time}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Average price (PLN): {recipe.average_price}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preparing difficulty: {recipe.difficulty}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <RecipeStepList/>
                    </Form.Group>
                    <Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                    <Button variant="warning" className="mr-2"
                                            href={`/editRecipe/${recipe.id}`} block>Edit</Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" className="mr-2"
                                            onClick={() => handleDelete(recipe[0].id)} block>Delete</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                    <div className="text-center card-footer text-muted">
                        <a href='/recipe'> Go back to recipes list</a>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    )
};