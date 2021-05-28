import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import icon from "../images/chef-hat.png";
import '../css/menu.css'
export const Menu = () => {
    return (
        <div className="Menu">
            <header>
                <Navbar expand="lg" variant="dark" bg="dark">
                    <Navbar.Brand href="/home" className="flexSpace"><img src={icon} className="rounded" alt=""/>CookBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/recipe">Recipes list</Nav.Link>
                            <Nav.Link href="/recipe/new">Add new recipe</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/"
                                      onClick={() => localStorage.removeItem("user")}
                            >Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </div>
    )
};