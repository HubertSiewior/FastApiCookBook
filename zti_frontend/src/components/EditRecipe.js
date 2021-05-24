import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import API from '../services/api'
import {Button, Col, Form} from "react-bootstrap";
import {RecipeStepListEditable} from "./RecipeStepListEditable";
import {AddRecipeStep} from "./AddRecipeStep";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

export const EditRecipe = () => {
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();
    const history = useHistory();
    if (JSON.parse(localStorage.getItem('user')) === null) {
        history.push('/')
    }
    useEffect(() => {
        API.get(`recipe/${id}`)
            .then(response => {
                console.log(response.data);
                setRecipe(response.data)
            })
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    }, [id, dispatch]);
    let [dishName, setDishName] = useState('');
    let [averageTime, setAverageTime] = useState('');
    let [preparingDifficulty, setPreparingDifficulty] = useState('');

    const handleEdit = () => {
        if (dishName === '') dishName = recipe.dish_name;
        if (averageTime === '') averageTime = recipe.average_time;
        if (preparingDifficulty === '') preparingDifficulty = recipe.preparing_difficulty;

        API.put(`/recipe/${id}`, {
            dishName: dishName,
            averageTime: averageTime,
            preparingDifficulty: preparingDifficulty
        })
            .then(response => history.push(`/recipe/${id}`))
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };

    return (
        <Form onSubmit={handleEdit}>
            <Form.Group>
                <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>
                    <h4 className="card-header text-center">Edit recipe for: {recipe.dish_name}</h4>
                    <Form.Group>
                        <Form.Label>Dish name:</Form.Label>
                        <Form.Control onChange={event => setDishName(event.target.value)} type="text"
                                      defaultValue={recipe.dish_name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Average time (minutes):</Form.Label>
                        <Form.Control onChange={event => setAverageTime(event.target.value)} type="text"
                                      defaultValue={recipe.average_time}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preparing difficulty (1-10):</Form.Label>
                        <Form.Control onChange={event => setPreparingDifficulty(event.target.value)} type="text"
                                      defaultValue={recipe.preparing_difficulty}/>
                    </Form.Group>
                    <Form.Group>
                        <RecipeStepListEditable/>
                    </Form.Group>
                    <AddRecipeStep/>
                    <Button variant="success" type="submit" block>Confirm changes</Button>

                    <div className="text-center card-footer text-muted">
                        <a href={`/recipe/${id}`}> Go back to recipe</a>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    )
};