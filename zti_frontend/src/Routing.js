import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Page404} from './components/Error404'
import {StartPage} from "./components/StartPage";
import {About} from "./components/About";
import {Home} from "./components/Home";

import {RecipesList} from './components/RecipesList'
import {AddRecipe} from "./components/AddRecipe";
import {RecipeStepList} from "./components/RecipeStepList";
import {AddRecipeStep} from "./components/AddRecipeStep";
import {AddIngredient} from "./components/AddIngredient";
import {IngredientList} from "./components/IngredientList";
import {Recipe} from './components/Recipe'
import {SignIn} from "./components/SignIn";
import {SignUp} from "./components/SignUp";
import {EditRecipe} from "./components/EditRecipe";

export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path='/'>
                    <StartPage/>
                </Route>

                <Route exact path='/home'>
                    <Home/>
                </Route>
                <Route exact path='/recipestep/new'>
                    <AddRecipeStep/>
                </Route>
                <Route exact path='/recipestep'>
                    <RecipeStepList/>
                </Route>

                <Route exact path="/signIn">
                    <SignIn/>
                </Route>

                <Route exact path="/signUp">
                    <SignUp/>
                </Route>

                <Route exact path="/recipe">
                    <RecipesList/>
                </Route>

                <Route exact path='/recipe/new'>
                    <AddRecipe/>
                </Route>
                <Route exact path='/ingredient'>
                    <IngredientList/>
                </Route>
                <Route exact path='/ingredient/new'>
                    <AddIngredient/>
                </Route>

                <Route path='/recipe/:id'>
                    <Recipe/>
                </Route>

                <Route path='/editRecipe/:id'>
                    <EditRecipe/>
                </Route>

                <Route path = '/about'>
                    <About/>
                </Route>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
        </>
    );
};