import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {useParams} from "react-router-dom";
import {Col, Form, ListGroup} from "react-bootstrap";
import {showErrorPopup} from "../redux/actions";
import {useDispatch} from "react-redux";

const IngredientItem = (props) => {
    const {ingredient_name} = props;
    return <ListGroup.Item variant="primary">{ingredient_name}</ListGroup.Item>
};

export const IngredientList = () => {
    const dispatch = useDispatch();
    const [ingredients, setIngredients] = useState([]);
    const {id} = useParams();
    const recipe_id = id
    useEffect(() => {
        API.get(`/recipe/${recipe_id}/ingredient`)
            .then((response) => {
                // console.log("skladniki")
                // console.log(response.data[0]);
                setIngredients(response.data)
            })
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    }, [id, dispatch]);
    return (
        <Form>
            <Form.Group>
                <Col>
                    <h4 className="card-header">Ingredients list</h4>
                    <ListGroup>
                        {ingredients.map((item) => <IngredientItem key={item.id}
                                                                   ingredient_name = {item.ingredient_name}
                                                                   id={item.recipe_id}
                                                                   price={item.price}
                                                                   kcal={item.kcal}
                                                                   quantity={item.quantity}
                                                                   ifVegan={item.if_vegan}/>)}
                    </ListGroup>
                    {/*<div className="text-center">*/}
                    {/*    <Button href='/ingredient/new' variant="success" className="mr-2 ">Add new ingredient</Button>*/}
                    {/*</div>*/}
                </Col>
            </Form.Group>
        </Form>
    )
};