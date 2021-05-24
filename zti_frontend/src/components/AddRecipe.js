import React, {useState} from 'react'
import API from '../services/api'
import {useHistory} from 'react-router-dom'
import {Button, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form  as BootStrapForm} from 'react-bootstrap';
import {showErrorPopup} from "../redux/actions";
import {useDispatch} from "react-redux";

export const AddRecipe = () => {
    const dispatch = useDispatch();
    const [dishName, setDishName] = useState('');
    const [averageTime, setAverageTime] = useState('');
    const [averagePrice, setAveragePrice] = useState('');
    const [preparingDifficulty, setPreparingDifficulty] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.post(`/recipe`, {dish_name: dishName, average_time: averageTime, average_price:averagePrice, difficulty: preparingDifficulty})
            .then(response => history.push(`/recipe`))
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    };
    return (
        <BootStrapForm onSubmit={handleSubmit}>
            <BootStrapForm.Group>
                <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>
                    <h4 className="card-header text-center">New recipe form</h4>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Dish name: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setDishName(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Average time(minutes): </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setAverageTime(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Average price(PLN): </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setAveragePrice(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <BootStrapForm.Label>Preparing difficulty: </BootStrapForm.Label>
                        <BootStrapForm.Control onChange={event => setPreparingDifficulty(event.target.value)} type="text"/>
                    </BootStrapForm.Group>
                    <BootStrapForm.Group>
                        <Button variant="success" className="mr-2" type='submit' block>Add recipe</Button>
                    </BootStrapForm.Group>
                    <div className="text-center card-footer text-muted">
                        <a href='/recipe'> Go back to recipes list</a>
                    </div>
                </Col>
            </BootStrapForm.Group>
        </BootStrapForm>
    )
};


