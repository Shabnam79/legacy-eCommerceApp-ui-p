import React, { Component,useContext, useEffect, useState } from 'react';
import { collection, addDoc,deleteDoc, writeBatch, doc, where, query ,getDocs} from "firebase/firestore";
import userContext from '../../utils/userContext';
import { db } from '../../config/firebase.config';

export default function WishlistItem({ item, value, removeWishlist }) {
    const { id, company,title, img, price, } = item;
    const { user } = useContext(userContext);
    //debugger
    // const refresh = async() =>{
    //     window.location.reload(true);
    // }

    // const handleRemove = async (id) => {
    //     let tempWishlist = [...this.removeWishlist];
    //     let index = tempWishlist.findIndex((i) => i.id === id);
    //     const product = this.state.products.find(item => item.id === id);
    //     const newList = tempWishlist.filter((item) => item.id !== id);
    //     tempWishlist.splice(index, 1);
    //     await this.setState({ setWishlist: newList });
    // }  
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{ width: "5rem", height: "5rem" }} className="img-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">company : </span>{company}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>{price}
            </div>
            {/**/}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeWishlist(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}
