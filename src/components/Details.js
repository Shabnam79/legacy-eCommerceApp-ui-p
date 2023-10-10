import React, { useContext,useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import userContext from "../utils/userContext";
import { collection, addDoc, query, getDocs, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,incrementProduct } from '../utils/cartSlice';
import { openModal } from '../utils/productSlice';
import { addToWishlist } from '../utils/wishlistSlice';
import { async } from 'q';

const Details = () => {
    const { user } = useContext(userContext);
    const dispatch = useDispatch();
    const { detailProduct } = useSelector((state) => state.allproducts);
    const { id, company, img, info, price, title, inCart, inWishlist } = detailProduct;
    const [CartData, setCartData] = useState([]);
    // const { wishlist } = useSelector((state) => state.wishlist);
    // console.log(wishlist,'wishlist')
    useEffect(() => {
        fetchAddToCartData();
    }, [user.userId]);


    const addProductToWishlist = async (value) => {
        if (user.userId) {
            try {
                const docRef = await addDoc(collection(db, "storeWishlist"), {
                    company: value.company,
                    img: value.img,
                    inWishlist: true,
                    info: value.info,
                    price: value.price,
                    productId: value.id,
                    userId: user.userId,
                    title: value.title,
                });
                console.log("Document written with ID: ", docRef.id);
                alert("Product added to wishlist");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            alert("To add your product in wishlist you need to login first.");
        }
        dispatch(addToWishlist(value));
    }
    const fetchAddToCartData = async () => {
        if (user.userId) {
            const q = query(
                collection(db, "addToCartStore"), where("userId", "==", user.userId)
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc,key) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCartData(newData);
            });
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const addProductIntoCart = async (item) => {
        debugger
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
                    const docRef = await addDoc(collection(db, "addToCartStore"), {
                        company: item.company,
                        img: item.img,
                        inCart: true,
                        info: item.info,
                        price: item.price,
                        productId: item.id,
                        userId: user.userId,
                        title: item.title,
                        count: item.count + 1
                    });
                    dispatch(addToCart(item));
                    console.log("Document written with ID: ", docRef.id);
                    alert("Product added to Cart");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                try {
                    const addToCartDoc = doc(db, "addToCartStore", productIds);
                    await updateDoc(addToCartDoc, {
                        count: Counts + 1
                    });
                    dispatch(incrementProduct(item))
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        } else {
            alert("To add your order in cart you need to login first");
        }

    }

    const openCartModal = (item) => {
        dispatch(openModal(item));
    }


    return (
        <div className="container py-5">
            {/*title*/}
            <div className="row>">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{title}</h1>
                </div>
            </div>
            {/*end of title*/}
            {/*product info*/}
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <img src={img} className="img-fluid" alt="product" />
                </div>
                {/*product text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>model:{title}</h2>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                        made by: <span className="text-uppercase">{company}</span>
                    </h4>
                    <h4 className="text-blue">
                        <strong>
                            Price : <span>$</span>{price}
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                        some info about product
                    </p>
                    <p className="text-muted lead">
                        {info}
                    </p>
                    {/*buttons*/}
                    <div>
                        <Link to="/">
                            <ButtonContainer>
                                back to products
                            </ButtonContainer>
                        </Link>
                        <ButtonContainer cart disabled={inCart ? true : false}
                            onClick={() => {
                                addProductIntoCart(detailProduct);
                                openCartModal(detailProduct);
                            }}>
                            {inCart ? "inCart" : "add to cart"}
                        </ButtonContainer>
                        <ButtonContainer cart disabled={inWishlist ? true : false}
                            onClick={() => {
                                addProductToWishlist(detailProduct);
                            }}>
                            {inWishlist ? "inWishlist" : "add to wishlist"}
                        </ButtonContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;
