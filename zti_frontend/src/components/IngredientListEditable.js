import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {useParams} from "react-router-dom";
import {Button, ListGroup, Form, Row, Col} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";
import {useHistory} from "react-router-dom";

const IngredientItemEditable = (props) => {
    const dispatch = useDispatch();
    const {ingredient_id, name, price, kcal, quantity} = props;
    const history = useHistory();
    const [newName, setNewName] = useState(name);
    const [newPrice, setNewPrice] = useState(price);
    const [newKcal, setNewKcal] = useState(kcal);
    const [newQuantity, setNewQuantity] = useState(quantity);

    const handleDelete = (event, id) => {
        console.log(id)
        event.preventDefault()
        API.delete(`/recipe/ingredient/${ingredient_id}delete`)
            .then(response => history.push(`/editRecipe/${id}`))
            .then(window.location.reload())

            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };
    const handleEdit = (event, id) => {
        event.preventDefault()
        API.put(`/recipe/ingredient/${ingredient_id}`, {
            ingredient_name: newName,
            price: newPrice,
            kcal: newKcal,
            quantity: newQuantity,
            if_vegan: 'true',
            recipe_id: 3
        })
            .then(window.location.reload())
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };

    return <ListGroup.Item variant="info">
        <Form.Label>Ingredient name: </Form.Label>
        <Form.Control onChange={event => setNewName(event.target.value)} type="text"
                      defaultValue={name}/>
        <Row>
            <Col>
                <Form.Label>Price: </Form.Label>
                <Form.Control onChange={event => setNewPrice(event.target.value)} type="text"
                              defaultValue={price}/>
            </Col>
            <Col>
                <Form.Label>Kcal: </Form.Label>
                <Form.Control onChange={event => setNewKcal(event.target.value)} type="text"
                              defaultValue={kcal}/>
            </Col>
        </Row>
        <Form.Label>Quantity: </Form.Label>
        <Row>
            <Col>
                <Form.Control onChange={event => setNewQuantity(event.target.value)} type="text"
                              defaultValue={quantity}/>
            </Col>
            <Col>
                <Button variant="warning" size="sm" block
                        onClick={(event) => handleEdit(event, ingredient_id, name, price, kcal, quantity)}>Edit</Button> {' '}
            </Col>
            <Col>
                <Button variant="danger" size="sm" block type="submit"
                        onClick={(event) => handleDelete(event, ingredient_id)}>Delete</Button>
            </Col>
        </Row>
    </ListGroup.Item>
};

export const IngredientListEditable = () => {
    const dispatch = useDispatch();
    const [ingredients, setIngredients] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        API.get(`/recipe/${id}/ingredient`)
            .then((response) => {
                console.log(response);
                setIngredients(response.data)
            })
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    }, [id, dispatch]);
    return (
        <div>
            <p>Ingredients:</p>
            <ListGroup>
                {ingredients.map((item) => <IngredientItemEditable key={item.recipe_step_id}
                                                                   ingredient_id={item.id}
                                                                   id={item.recipe_id}
                                                                   name={item.ingredient_name}
                                                                   price={item.price}
                                                                   kcal={item.kcal}
                                                                   quantity={item.quantity}/>)}
            </ListGroup>
        </div>
    )
};