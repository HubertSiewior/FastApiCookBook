import React, {useState} from 'react'
import API from '../services/api'
import {Button, Col, Form as BootStrapForm, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";
import {showErrorPopup} from "../redux/actions";
import {useDispatch} from "react-redux";

export const AddIngredient = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [ingredientName, setIngredientName] = useState('');
    const [price, setPrice] = useState('');
    const [kcal, setKcal] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ifVegan, setIfVegan] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        API.post(`/recipe/${id}/ingredient`, {ingredient_name: ingredientName, price: price, kcal: kcal, quantity: quantity, if_vegan: ifVegan, recipe_id: id})
            .then()
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };
    return (
         <BootStrapForm onSubmit={handleSubmit}>
            <BootStrapForm.Group>
                <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>
                    <h4 className="card-header text-center">New ingredient form</h4>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Name: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setIngredientName(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Price: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setPrice(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Kcal: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setKcal(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Quantity: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setQuantity(event.target.value)} type="text"/>
                    </BootStrapForm.Group>

                    <BootStrapForm.Group>
                        <Button variant="success" className="mr-2" type='submit' block>Add ingredient</Button>
                    </BootStrapForm.Group>
                    <div className="text-center card-footer text-muted">
                        <a href={`/recipe/${id}`}> Go back to recipe</a>
                    </div>
                </Col>
            </BootStrapForm.Group>
        </BootStrapForm>


    )
};

