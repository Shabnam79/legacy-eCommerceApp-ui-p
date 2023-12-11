import React, { useEffect,useContext, useState } from 'react';
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
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const { user, setUser } = useContext(userContext)
    const [modalShow, setModalShow] = useState(false);
    const { removeItem } = useLocalStorage();
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const borderHello={border:"none"};
    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
    }, []);

    const fetchCategorylist = async () => {
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
        }
    }
    // if (auth != null)
    //     if (auth.currentUser != null)
    //         if (auth.currentUser.uid != null)
    //             console.log("myauth1", auth.currentUser.uid);
    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
        setSelectedValue(filterCategoryName);
        dispatch(fetchProducts(id));
    }
    
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
        <NavWrapper className="navbar nav-bar-expand-sm navbar-dark px-sm-5" style={{background:'black'}}>
            <div className="navbar">
                <Link to='/'>
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5 ">
                        {/* <Link to="/" className="nav-link">
                            Products
                        </Link> */}
                    </li>
                </ul>
                &nbsp;&nbsp;&nbsp;
                <Dropdown  title="All Category"  onSelect={(e) => fetchProductCategorylist(e)}>
                        <Dropdown.Toggle  id="dropdown-basic" style={{background:'LightGray',...borderHello,...fontfamily,color:'black'}}>
                            {selectedValue || 'All'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item eventKey=""></Dropdown.Item>
                        {dropdown.map((item) => (
                            <Dropdown.Item eventKey={item.id}>{item.Category}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                        </Dropdown>
            </div>
            <div className="navbar-right" >
                {/* <span style={{ color: "white" }}>{user.email}</span>&nbsp;&nbsp;&nbsp; */}
                {
                    user && user.userId == null
                        ?
                        <>
                            <Dropdown className="d-inline mx-2"  >
                                <Dropdown.Toggle id="dropdown-autoclose-true" style={{ backgroundColor: "transparent" ,...borderHello}}>
                                    <span style={{...fontsize,...fontfamily}}>Hello, Sign In  </span><br></br>
                                    <span style={{...fontfamily}}> Account & Lists</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{...borderHello }}>
                                    <Dropdown.Item  onClick={() => setModalShow(true)}>
                                    <span style={{...fontfamily}}> Login</span> </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <ButtonContainer onClick={() => setModalShow(true)}>
                                <i className="fas fa-user">Login</i>
                            </ButtonContainer> */}

                            <LoginModal
                                name="Login"
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </>
                        : <>
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true" style={{ backgroundColor: "transparent",...borderHello }}>
                                <span style={{...fontsize,...fontfamily}}>  Hello {user.email} </span><br></br>
                                <span style={{...fontfamily}}> Account & Lists</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{...borderHello }}>
                                <span style={{...fontfamily}}>
                                    <Dropdown.Item onClick={() => logout()} href="/">
                                        Logout</Dropdown.Item>
                                    <Dropdown.Item href="/wishlist">Your Wishlist</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setModalShow(false)} href="/orders">
                                        Your Orders</Dropdown.Item>
                                    <Dropdown.Item href="/cart">Your Cart</Dropdown.Item>
                                    <Dropdown.Item href="/billingAddress">Shipping Address</Dropdown.Item>
                                    </span>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <Link to="/" className="ml-auto">
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
                            </Link> */}
                            {/* <Link to="/wishlist" className="ml-auto">
                                <ButtonContainer>
                                    <i className="fas fa fa-heart">my wishlist</i>
                                </ButtonContainer>
                            </Link> */}
                        </>

                }

                <Link to="/cart" className="ml-auto">
                    <Button style={{ backgroundColor: "transparent",...borderHello }}>
                        <i className="fas fa-cart-plus"> <span style={{...fontfamily}}>My Cart</span></i>
                    </Button>
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
