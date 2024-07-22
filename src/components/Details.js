// Details.js

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import userContext from "../utils/userContext";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementProduct } from '../utils/cartSlice';
import { openModal } from '../utils/productSlice';
import { addToWishlist, removeFromWishlist } from '../utils/wishlistSlice';
import { toast } from "react-toastify";
import { saveProductIntoCartService, getCartProductsService, incrementCartProductsService, getProductByIdService } from '../firebase/services/cart.service';
import { saveProductToWishlistService, DeleteProductFromWishList, ProductAvailableInWishlist } from '../firebase/services/wishlist.service';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config/firebase.config';
import LoginModal from './LoginModal';
import ReviewModal from './Review/ReviewModal';

const Details = () => {
    const { user } = useContext(userContext);
    const dispatch = useDispatch();
    const { detailProduct } = useSelector((state) => state.allproducts);
    const { id, companyName, imageData, description, price, name, inCart, inWishlist } = detailProduct;
    const [CartData, setCartData] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const [isProductWishlisted, setIsProductWishlisted] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loginmodalShow, setLoginModalShow] = useState(false);
    const fontsize = { fontSize: '15px' };

    useEffect(() => {

        if (user.userId) {
            fetchAddToCartData();
        } else {
            console.log("Please login to see past Cart products");
        }

    }, [user.userId]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
    useEffect(() => {
        if (user.userId) {
            checkIsProductAvailableInWishlist(user.userId, detailProduct.id);
            document.title = detailProduct.name;
        } else {
            console.log("Please login to see past Cart products");
        }
    }, [user.userId]);

    const checkIsProductAvailableInWishlist = async (userId, productId) => {
        if (userId && productId) {
            debugger
            let data = await ProductAvailableInWishlist(userId,productId);
            setWishlist(data);
            if (data != undefined)
                setIsProductWishlisted(true);
            else
                setIsProductWishlisted(false);
        }
    }

    const addProductToWishlist = async (value) => {
        if (user.userId) {
            if (isProductWishlisted) {
                debugger
                try {
                    await DeleteProductFromWishList(wishlist.id);

                    toast.warning(
                        `Product removed from the Wishlist`,
                        {
                            autoClose: 4000,
                        }
                    );

                    dispatch(removeFromWishlist(wishlist));
                    setIsProductWishlisted(false);

                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                try {
                    let productObj = {
                        productId: value.id,
                        userId: user.userId,
                        inWishlist: true
                    }

                    await saveProductToWishlistService(productObj);

                    dispatch(addToWishlist(value));
                    setIsProductWishlisted(true);
                    checkIsProductAvailableInWishlist(user.userId, detailProduct.id);

                    toast.success(`${value.name} is added to wishlist`, {
                        autoClose: 4000,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }

        } else {
            setLoginModalShow(true);
        }
    }

    const fetchAddToCartData = async () => {
        if (user.userId) {
            let data = await getCartProductsService(user.userId);
            if (data != undefined) {
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
            openCartModal(detailProduct);

            if (!iscart) {
                try {
                    let addToCartProductObj = {
                        company: item.company,
                        img: item.imageData,
                        inCart: true,
                        info: item.info,
                        price: item.price,
                        productId: item.id,
                        userId: user.userId,
                        title: item.name,
                        count: item.count + 1
                    }

                    let docRef = await saveProductIntoCartService(addToCartProductObj);
                    dispatch(addToCart(item));
                    // toast.success(`${item.name} is added to cart`, {
                    //     autoClose: 1000,
                    // });
                    toast.success(`${item.name} is added to cart`, {
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
                    console.error("Error adding document: ", e);
                }
            }
        } else {
            setLoginModalShow(true);
        }

    }

    const openCartModal = (item) => {
        dispatch(openModal(item));
    }

    const openReviewModal = () => {
        if (user.userId) {
            setModalShow(true);
        }
    }

    return (
        <div className="container py-3">
            <div className="row">
                <div style={{ height: '400px' }} className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <img src={`data:image/png;base64, ${imageData}`} className="img-fluid h-100" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>{name}</h2>
                    <h4 className="text-title textMadeBy text-uppercase mt-3 mb-2">
                        Made By: <span className="text-uppercase">{companyName}</span>
                    </h4>
                    <h4 className="textPrice">
                        <strong>
                            Price: <span>$</span>{price}
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                        Some Info About Product
                    </p>
                    <p className="text-muted lead" style={{ ...fontsize }} dangerouslySetInnerHTML={{ __html: description }}></p>
                    <div>
                        <ButtonContainer className='addToCartButton' cart disabled={inCart ? true : false}
                            onClick={() => {
                                addProductIntoCart(detailProduct);
                            }}>
                            {inCart ? "InCart" : "Add To Cart"}
                        </ButtonContainer>
                        <ButtonContainer className='addRemoveWishlistButton' cart
                            onClick={() => {
                                addProductToWishlist(detailProduct);
                            }}>
                            {isProductWishlisted ? "Remove From Wishlist" : "Add To Wishlist"}
                        </ButtonContainer>
                        <ButtonContainer style={{ display: 'none' }}
                            onClick={() => {
                                openReviewModal()
                            }}>
                            Review
                        </ButtonContainer>
                    </div>
                </div>
            </div>
            <ReviewModal
                name="Review"
                show={modalShow}
                productId={id}
            />
            {user.userId == null
                ?
                <LoginModal name="Login"
                    show={loginmodalShow}
                    onHide={() => setLoginModalShow(false)} />
                : null
            }
        </div>
    )
}

export default Details;