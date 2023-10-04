import React, { Component, useContext, useState } from 'react'
import { ProductConsumer } from '../utils/context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import userContext from "../utils/userContext";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from '../config/firebase.config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';

const Details = () => {
    const { user } = useContext(userContext);
    const dispatch = useDispatch();

    const addToWishlist = async (value) => {
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
            alert("To make order you need to login first");
        }
    }

    const addProductIntoCart = (item) => {
        dispatch(addToCart(item));
    }

    return (
        <ProductConsumer>
            {value => {
                const { id, company, img, info, price, title, inCart, inWishlist } = value.detailProduct;
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
                                            // value.addToCart(id);
                                            addProductIntoCart(value.detailProduct);
                                            value.openModal(id);
                                        }}>
                                        {inCart ? "inCart" : "add to cart"}
                                    </ButtonContainer>
                                    <ButtonContainer cart disabled={inWishlist ? true : false}
                                        onClick={() => {
                                            addToWishlist(value.detailProduct);
                                            //value.addToWishlist(id);
                                        }}>
                                        {inWishlist ? "inWishlist" : "add to wishlist"}
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                    </div>


                );
            }}
        </ProductConsumer>
    )
}

export default Details;
