import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { getCategoryService } from '../firebase/services/product.service';
import styled from 'styled-components';
import userContext from "../utils/userContext";
import { auth } from "../firebase/config/firebase.config";
import { signOut } from "firebase/auth";
import LoginModal from './LoginModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const Navbar = () => {
    const dispatch = useDispatch();
    //const [dropdown, setDropdown] = useState([]);
    //const [selectedValue, setSelectedValue] = useState('');
    const { user, setUser } = useContext(userContext)
    const [modalShow, setModalShow] = useState(false);
    const { removeItem } = useLocalStorage();
    const borderHello = { border: "none" };
    useEffect(() => {
        // fetchCategorylist();
        // dispatch(fetchProducts(''));
    }, []);

    // const fetchCategorylist = async () => {
    //     let data = await getCategoryService();
    //     if (data != undefined) {
    //         setDropdown(data);
    //     }
    // }
    // const fetchProductCategorylist = (id) => {
    //     let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
    //     setSelectedValue(filterCategoryName);
    //     dispatch(fetchProducts(id));
    // }

    const logout = async () => {
        setModalShow(false);
        setUser({
            userId: null,
            email: null
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
                //background: 'hsla(0, 0 %, 95.3 %, 0.75)',
                boxShadow: '1px 1px 10px 0 rgba(0, 0, 0, 0.05)',
            }}>
            <div className="navbar">
                <Link to='/' className='d-flex align-items-center HomeButton'>
                    <img src={logo} width={'30px'} height={'37px'} alt="store" className="navbar-brand" />
                    <span className='font-weight-bold' style={{ color: '#053645' }}>TX Innovation eCommerce</span>
                </Link>
                {/* <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5 ">
                    </li>
                </ul> */}
                {/* &nbsp;&nbsp;&nbsp;
                <Dropdown  title="All Category"  onSelect={(e) => fetchProductCategorylist(e)}>
                        <Dropdown.Toggle  id="dropdown-basic" style={{background:'LightGray',...borderHello,...fontfamily,color:'black'}}>
                            {selectedValue || 'All'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item eventKey="">{'All'}</Dropdown.Item>
                        {dropdown.map((item) => (
                            <Dropdown.Item id={item.id} eventKey={item.id}>{item.Category}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                        </Dropdown> */}
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
                        : <>
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true" className='d-flex align-items-center font-weight-bold tx-dropdown' style={{ backgroundColor: "transparent", ...borderHello, color: '#053645' }}>
                                    <span>Hello {user.email} |</span>
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
                        </>

                }

                <Link to="/cart" className="d-flex align-items-end">
                    <Button style={{
                        backgroundColor: '#053645',
                        ...borderHello
                    }}>
                        <i className="fas fa-cart-plus">&ensp;<span>My Cart</span></i>
                    </Button>
                </Link>
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
