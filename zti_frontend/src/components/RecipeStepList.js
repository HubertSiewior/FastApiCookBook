import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {useParams} from "react-router-dom";
import {Button, Col, Form, ListGroup} from "react-bootstrap";
import {showErrorPopup} from "../redux/actions";
import {useDispatch} from "react-redux";

const checkTime=(time)=> {
    if(time !== 0) return ` Time: ${time}min`;
    return '';
};

const RecipeStepItem = (props) => {
    const {id,description, time} = props;
    return <ListGroup.Item variant="primary" action href={`/recipestep/${id}`}>{description}</ListGroup.Item>
};

export const RecipeStepList = () => {
    const dispatch = useDispatch();
    const [recipeSteps, setRecipeSteps] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        API.get(`/cookbook/recipestep`)
            .then((response) => {
                console.log(response);
                setRecipeSteps(response.data)
            })
            .catch(error => {
                dispatch(showErrorPopup(error.response.data))
            })
    }, [id, dispatch]);
    return (
          <Form>
            <Form.Group>
                <Col md={{span: 6, offset: 3}} sm={{span: 8, offset: 2}}>

                    <h4 className="card-header">Recipe steps list</h4>
                      <ListGroup>
                            {recipeSteps.map((item) => <RecipeStepItem key={item.recipe_step_id}
                                                           id = {item.recipe_id}
                                                           time = {item.time}
                                                           description={item.description}/>)}
                      </ListGroup>
                    <div className="text-center">
                        <Button href='/recipestep/new' variant="success" className="mr-2 ">Add new recipe step</Button>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    )
};