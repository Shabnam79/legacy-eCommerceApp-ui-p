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
import { saveProductToWishlistService, DeleteProductFromWishList } from '../firebase/services/wishlist.service';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config/firebase.config';
import LoginModal from './LoginModal';
import ReviewModal from './Review/ReviewModal';

const Details = () => {
    const { user } = useContext(userContext);
    const dispatch = useDispatch();
    const { detailProduct } = useSelector((state) => state.allproducts);
    const { id, company, img, info, price, title, inCart, inWishlist } = detailProduct;
    const [CartData, setCartData] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const [isProductWishlisted, setIsProductWishlisted] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loginmodalShow, setLoginModalShow] = useState(false);
    const fontsize = { fontSize: 'small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    useEffect(() => {
        if (user.userId) {
            fetchAddToCartData();
        } else {
            console.log("Please login to see past Cart products");
        }
    }, [user.userId]);

    useEffect(() => {
        if (user.userId) {
            checkIsProductAvailableInWishlist(user.userId, detailProduct.id);
            document.title = detailProduct.title;
        } else {
            console.log("Please login to see past Cart products");
        }
    }, [user.userId]);

    const checkIsProductAvailableInWishlist = async (userId, productId) => {
        if (userId && productId) {
            // console.log("userId", userId);
            // console.log("productId", productId);

            const collectionRef = query(
                collection(db, "storeWishlist"), where("userId", "==", userId), where("productId", "==", productId)
            )
            return await getDocs(collectionRef).then((storeProduct) => {
                const wishlistProducts = storeProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setWishlist(wishlistProducts[0]);
                if (wishlistProducts.length > 0)
                    setIsProductWishlisted(true);
                else
                    setIsProductWishlisted(false);
            })
        }
    }

    const addProductToWishlist = async (value) => {
        if (user.userId) {
            if (isProductWishlisted) {
                try {
                    await DeleteProductFromWishList(wishlist.id);

                    toast.warning(
                        `Product removed from the Wishlist`,
                        {
                            autoClose: 1000,
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
                        company: value.company,
                        img: value.img,
                        inWishlist: true,
                        info: value.info,
                        price: value.price,
                        productId: value.id,
                        userId: user.userId,
                        title: value.title,
                    }

                    const docRef = await saveProductToWishlistService(productObj);

                    dispatch(addToWishlist(value));
                    setIsProductWishlisted(true);
                    checkIsProductAvailableInWishlist(user.userId, detailProduct.id);

                    toast.success(`${value.title} is added to wishlist`, {
                        autoClose: 1000,
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
        else {
            setLoginModalShow(true);
        }
    }

    return (
        <div className="container py-3">
            {/*title*/}
            {/*end of title*/}
            {/*product info*/}
            <div className="row">
                <div style={{ height: '400px' }} className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <img src={img} className="img-fluid h-100" alt="product" />
                </div>
                {/*product text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>{title}</h2>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                        Made By: <span className="text-uppercase">{company}</span>
                    </h4>
                    <h4 className="text-blue">
                        <strong>
                            Price: <span>$</span>{price}
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                        Some Info About Product
                    </p>
                    <p className="text-muted lead" style={{ ...fontsize }}>
                        {info}
                    </p>
                    {/*buttons*/}
                    <div>
                        <Link to="/">
                            <ButtonContainer>
                                Back To Products
                            </ButtonContainer>
                        </Link>
                        <ButtonContainer cart disabled={inCart ? true : false}
                            onClick={() => {
                                addProductIntoCart(detailProduct);
                            }}>
                            {inCart ? "InCart" : "Add To Cart"}
                        </ButtonContainer>
                        <ButtonContainer cart
                            onClick={() => {
                                addProductToWishlist(detailProduct);
                            }}>
                            {isProductWishlisted ? "Remove From Wishlist" : "Add To Wishlist"}
                        </ButtonContainer>
                        <ButtonContainer
                            onClick={() => {
                                openReviewModal()
                            }}>
                            Review
                        </ButtonContainer>
                        <ReviewModal
                            name="Review"
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            productId={id}
                        />
                    </div>
                </div>
            </div>
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
