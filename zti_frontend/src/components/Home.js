import React from 'react'

export const Home = () => {
    return (
        <div className="text-center" >
            <h4 className="card-header">Welcome to GoodRecipes</h4>
            Take a look at our <a href="/recipe">Recipe list </a>
            or <a href="/recipe/new">create own recipe</a>.<br/>
        </div>
    )
}