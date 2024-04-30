import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementProduct } from '../utils/cartSlice';
import { handleDetail, openModal } from '../utils/productSlice';
import userContext from "../utils/userContext";
import { toast } from "react-toastify";
import { saveProductIntoCartService, getCartProductsService, incrementCartProductsService, getProductByIdService } from '../firebase/services/cart.service';
import LoginModal from './LoginModal';
import { FaHeart } from 'react-icons/fa';


const Product = ({ product }) => {
    const { title, img, price, inCart, id } = product;
    const { user } = useContext(userContext);
    const [CartData, setCartData] = useState([]);
    const [loginmodalShow, setLoginModalShow] = useState(false);
    const wishlistItems = useSelector((store) => store.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAddToCartData();
        document.title = "Our Products";
    }, [user.userId]);

    const fetchAddToCartData = async () => {
        if (user.userId) {
            let data = await getCartProductsService(user.userId);
            if (data != undefined) {
                // console.log(data);
                setCartData(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const addProductIntoCart = async (item) => {
        let iscart = false;
        let productIds = "";
        let Counts = "";
        CartData.map((data) => {
            if (item.id === data.productId) {
                iscart = true;
                productIds = data.id;
                Counts = data.count;
                return true; // Exit the loop early when a match is found  
            }
            return false;
        });
        if (user.userId) {
            if (!iscart) {
                try {
                    let addToCartProductObj = {
                        company: item.company,
                        img: item.img,
                        inCart: true,
                        info: item.info,
                        price: item.price,
                        productId: item.id,
                        userId: user.userId,
                        title: item.title,
                        count: item.count + 1
                    }

                    let docRef = await saveProductIntoCartService(addToCartProductObj);
                    dispatch(addToCart(item));

                    toast.success(`${item.title} is added to cart`, {
                        autoClose: 1000,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                try {
                    const addToCartDoc = await getProductByIdService(productIds);
                    await incrementCartProductsService(addToCartDoc, Counts);
                    dispatch(incrementProduct(item))
                } catch (e) {
                    toast.error(
                        "Error adding document: " + e, {
                        autoClose: 1000,
                    }
                    );
                }
            }
        } else {
            toast.warning(
                `To add your order in cart you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }
    }

    const openCartModal = (item) => {
        if (user.userId) {
            dispatch(openModal(item));
        } else {
            setLoginModalShow(true);
        }
    }

    const handleProductDetails = (item) => {
        dispatch(handleDetail(item))
    }

    // Check if product is in wishlist
    const isProductInWishlist = wishlistItems.wishlist.find(wishlistItem => wishlistItem.id === id);

    return (
        <ProducrWrapper className="tx-product-card">
            <div className="" onClick={() => handleProductDetails(product)}>
                <Link to="/details" style={{ height: '325px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={img} alt="product" className="h-100 w-100" style={{ objectFit: 'cover' }} />
                </Link>
            </div>
            <div className="my-2 d-flex align-items-start justify-content-between" style={{ height: '65px' }}>
                <h6 data-testid='product-title' className='w-75'>
                    <span className="">
                        {title}:
                    </span>
                </h6>
                <h5 className="d-flex" style={{ borderBottom: '2px solid #053645' }} data-testid='product-price'>
                    <b>
                        <span className="mr-1">$</span>
                        <span>{price}</span>
                    </b>
                </h5>
            </div>
            {user.userId == null ?
                <LoginModal name="Login"
                    show={loginmodalShow}
                    onHide={() => setLoginModalShow(false)} />
                : null
            }
            <button data-testid="add-to-cart-button" className="add-to-cart-button" disabled={inCart ? true : false}
                onClick={(e) => {
                    e.preventDefault();
                    addProductIntoCart(product);
                    openCartModal(product);
                }}>
                {inCart ? (
                    <p className="text-capitalize mb-0" disabled>{""}in Cart</p>
                ) : (
                    <p className='m-0'>ADD TO CART</p>
                )}
            </button>
            {
                isProductInWishlist && <div style={{ position: 'absolute' }}>
                    <FaHeart className='heartWishlistIcon' color="#FF4343" />
                </div>
            }
        </ProducrWrapper>
    );
}

const ProducrWrapper = styled.div`
.card{
    border-color:tranparent;
    transition:all 1s linear;
}
.card-footer{
    background:transparent;
    border-top:transparent;
    transition:all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(247,247,247);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.card-img-top{
     transition:all 1s linear;
}
.img-container:hover .card-img-top{
    transform:scale(1.2);
}
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5 rem 0 0 0;
    transform:translate(100%, 100%);
    transition:all 1s linear;
}
.img-container:hover .cart-btn{
    transform:translate(0, 0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`;

export default Product;