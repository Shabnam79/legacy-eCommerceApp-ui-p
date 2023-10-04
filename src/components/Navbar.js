import React, { Component,useContext, useEffect, useState } from 'react';
import { collection, addDoc, writeBatch, doc, where,deleteDoc, query ,getDocs} from "firebase/firestore";
import { db } from '../config/firebase.config';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import userContext from "../utils/userContext";
import { auth } from "../config/firebase.config";
import { signOut } from "firebase/auth";
import LoginModal from './LoginModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProductConsumer } from '../utils/context';

const Navbar = () => {
    const { user, setUser } = useContext(userContext)
    const [modalShow, setModalShow] = useState(false);
    const { removeItem } = useLocalStorage();
    const [dropdown, setDropdown] = useState([]);
    // if (auth != null)
    //     if (auth.currentUser != null)
    //         if (auth.currentUser.uid != null)
    //             console.log("myauth1", auth.currentUser.uid);

    useEffect(() => {
        fetchCategorylist();
    }, user.userId);

    const fetchCategorylist = async () => {
        debugger
        if (user.userId) {
            const q = query(
                collection(db, "productCategory")
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setDropdown(newData);
            });
        } else {
            console.log("Please login to see category list");
        }
    }

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
                &nbsp;&nbsp;&nbsp;
                <div>
                    <ProductConsumer>
                        { value => 
                    // <select className="dropdown" onChange={(e) => handleSelect(e.target.value)}>
                    <select className="dropdown" onChange={(e) => value.fetchProductCategorylist(e.target.value)}>
                    <option value="">All Category</option>
                        {dropdown.map((item) => (
                            <option value={item.id}>{item.Category}</option>
                        ))}
                    </select>
                        }

                    </ProductConsumer>
                </div>             
                &nbsp;&nbsp;&nbsp;
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
