import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { selectIsAuthenticated, logout } from '../../features/userContext';

export default function NavBar() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    return (
        <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>Emergency Makers Network</Navbar.Brand>
            </LinkContainer>
            <Nav>
                <LinkContainer to="/products">
                    <Nav.Link>Products</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/users">
                    <Nav.Link>Users</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/authenticated">
                    <Nav.Link>Authenticated</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/authorized">
                    <Nav.Link>Authorized</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                {isAuthenticated ? (
                    <Navbar.Text>
                        <a href="#sign-in" onClick={() => dispatch(logout())}>
                            Logout
                        </a>
                    </Navbar.Text>
                ) : (
                    <LinkContainer to="/sign-in">
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
