import React from 'react'
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

export const StartPage = () => {
    const history = useHistory();
    if (JSON.parse(localStorage.getItem('user')) !== null) {
        history.push('/home')
    }
    return (
        <div className="text-center">
            <h4 className="card-header">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    Seems that you are not logged in
                </div>
            </h4>
            Sign in, if you already have account<br/>
            <Button href='/signIn' variant="primary" className="mr-2" type='submit'>Sign in</Button><br/>
            or sign up, if you are new to this site<br/>
            <Button href='/signUp' variant="primary" className="mr-2" type='submit'>Sign up</Button><br/>
        </div>
    )
}