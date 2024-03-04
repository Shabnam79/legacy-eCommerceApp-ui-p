import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
=======
import { useDispatch} from 'react-redux';
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab
import styled from 'styled-components';
import userContext from "../utils/userContext";
import { auth } from "../firebase/config/firebase.config";
import { signOut } from "firebase/auth";
import LoginModal from './LoginModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { variables } from "../utils/variables";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user, setUser } = useContext(userContext)
    const [modalShow, setModalShow] = useState(false);
    const { removeItem } = useLocalStorage();
    const borderHello = { border: "none" };
<<<<<<< HEAD
=======
    useEffect(() => {
    }, []);

>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab
    const logout = async () => {
        setModalShow(false);
        setUser({
            userId: null,
            email: null,
            roleId: null,
            userName:null
        });
        removeItem("user");
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <NavWrapper className="p-1 w-100 d-flex justify-content-between px-sm-5"
            style={{
                position: 'fixed',
                zIndex: '1',
                backdropFilter: 'blur(8px)',
                background: '#f3f3f33d',
                boxShadow: '1px 1px 10px 0 rgba(0, 0, 0, 0.05)',
            }}>
            <div className="navbar">
                <Link to='/' className='d-flex align-items-center HomeButton'>
                    <img src={logo} width={'30px'} height={'37px'} alt="store" className="navbar-brand" />
                    <span className='font-weight-bold' style={{ color: '#053645' }}>TX Innovation eCommerce</span>
                </Link>
            </div>
            <div className="d-flex align-items-center" >
                {
                    user && user.userId == null
                        ?
                        <>
                            <Dropdown className="d-inline mx-2"  >
                                <Dropdown.Toggle id="dropdown-autoclose-true" className='d-flex align-items-center font-weight-bold tx-dropdown' style={{ backgroundColor: "transparent", ...borderHello, color: '#053645' }}>
                                    <span>Hello, Sign In |</span>
                                    <span>&nbsp;Account & Lists</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu1' style={{ ...borderHello }}>
                                    <Dropdown.Item className='font-weight-bold' onClick={() => setModalShow(true)}>
                                        <span>Login</span> </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <LoginModal
                                name="Login"
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </>
                        :
                        <>
                            {
                                user && user.roleId == variables.ROLE_ADMIN
                                    ?
                                    <>
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle id="dropdown-autoclose-true" className='d-flex align-items-center font-weight-bold tx-dropdown' style={{ backgroundColor: "transparent", ...borderHello, color: '#053645' }}>
                                                <span>Hello {user.userName} |</span>
                                                <span>&nbsp;Account & Lists</span>
                                            </Dropdown.Toggle>
                                            <div className='w-100'>
                                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu2' style={{ ...borderHello }}>
                                                    <Dropdown.Item id="ddllogout" onClick={() => logout()} href="/">
                                                        Logout</Dropdown.Item>
                                                    <Dropdown.Item href="/wishlist">Your Wishlist</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setModalShow(false)} href="/orders">
                                                        Your Orders</Dropdown.Item>
                                                    <Dropdown.Item href="/cart">Your Cart</Dropdown.Item>
                                                    <Dropdown.Item href="/billingAddress">Shipping Address</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </div>
                                        </Dropdown>
                                        <Dropdown className="d-inline mr-3">
                                            <Dropdown.Toggle id="dropdown-autoclose-true" className='d-flex align-items-center font-weight-bold tx-dropdown' style={{ backgroundColor: "transparent", ...borderHello, color: '#053645' }}>
                                                <span>&nbsp;Admin</span>
                                            </Dropdown.Toggle>
                                            <div className='w-100'>
                                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu2' style={{ ...borderHello }}>
                                                    <Dropdown.Item href="/admin">Manage Product</Dropdown.Item>
                                                    <Dropdown.Item href="/admin/CategoryList">Manage Category</Dropdown.Item>
                                                    <Dropdown.Item href="/admin/UserList">Manage Users</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </div>
                                        </Dropdown>
                                        <Link to="/cart" className="d-flex align-items-end">
                                            <Button style={{
                                                backgroundColor: '#053645',
                                                ...borderHello
                                            }}>
                                                <i className="fas fa-cart-plus">&ensp;<span>My Cart</span></i>
                                            </Button>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle id="dropdown-autoclose-true" className='d-flex align-items-center font-weight-bold tx-dropdown' style={{ backgroundColor: "transparent", ...borderHello, color: '#053645' }}>
                                                <span>Hello {user.userName} |</span>
                                                <span>&nbsp;Account & Lists</span>
                                            </Dropdown.Toggle>
                                            <div className='w-100'>
                                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu4' style={{ ...borderHello }}>
                                                    <Dropdown.Item id="ddllogout" onClick={() => logout()} href="/">
                                                        Logout</Dropdown.Item>
                                                    <Dropdown.Item href="/wishlist">Your Wishlist</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setModalShow(false)} href="/orders">
                                                        Your Orders</Dropdown.Item>
                                                    <Dropdown.Item href="/cart">Your Cart</Dropdown.Item>
                                                    <Dropdown.Item href="/billingAddress">Shipping Address</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </div>
                                        </Dropdown>
                                        <Link to="/cart" className="d-flex align-items-end">
                                            <Button style={{
                                                backgroundColor: '#053645',
                                                ...borderHello
                                            }}>
                                                <i className="fas fa-cart-plus">&ensp;<span>My Cart</span></i>
                                            </Button>
                                        </Link>
                                    </>

                            }
                        </>
                }
            </div>
        </NavWrapper >
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
