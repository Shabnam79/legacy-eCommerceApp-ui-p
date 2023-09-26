import React, { Component, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import userContext from "../utils/userContext";
import { auth } from "../config/firebase.config";
import { signOut } from "firebase/auth";
import LoginModal from './LoginModal';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Navbar = () => {
    const { user, setUser } = useContext(userContext)
    const [modalShow, setModalShow] = useState(false);
    const { removeItem } = useLocalStorage();

    // if (auth != null)
    //     if (auth.currentUser != null)
    //         if (auth.currentUser.uid != null)
    //             console.log("myauth1", auth.currentUser.uid);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <NavWrapper className="navbar nav-bar-expand-sm navbar-dark px-sm-5">
            <div className="navbar">
                <Link to='/'>
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5 ">
                        <Link to="/" className="nav-link">
                            Products
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <span style={{ color: "white" }}>{user.email}</span>&nbsp;&nbsp;&nbsp;
                {
                    user.userId == null
                        ?
                        // <Link to="/login" className="ml-auto">
                        <>
                            <ButtonContainer onClick={() => setModalShow(true)}>
                                <i className="fas fa-user">Login</i>
                            </ButtonContainer>

                            <LoginModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </>
                        // </Link>
                        : <>
                            <Link to="/" className="ml-auto">
                                <ButtonContainer onClick={() => setModalShow(false)}>
                                    <i className="fas fa-user"
                                        onClick={
                                            () => {
                                                setUser({
                                                    userId: null,
                                                    email: null
                                                });
                                                removeItem("user");
                                                logout();
                                            }
                                        }
                                    >Logout</i>
                                </ButtonContainer>
                                <Link to="/orders" className="ml-auto">
                                    <ButtonContainer onClick={() => setModalShow(false)}>
                                        <i className="fas fa-solid fa-gift"
                                        >Orders</i>
                                    </ButtonContainer>
                                </Link>
                            </Link>
                            <Link to="/wishlist" className="ml-auto">
                                <ButtonContainer>
                                    <i className="fas fa fa-heart">my wishlist</i>
                                </ButtonContainer>
                            </Link>
                        </>
                        
                }
              
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <i className="fas fa-cart-plus">my cart</i>
                    </ButtonContainer>
                </Link>
            </div>
        </NavWrapper>
    )
}

const NavWrapper = styled.nav`
background:var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3 rem;
    text-transform:capitalize;
}
`;

export default Navbar;
