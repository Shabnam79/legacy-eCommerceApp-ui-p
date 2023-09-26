import React, { Component, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from '../../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

export default function CartTotals({ value }) {
    const { cartSubTotal, cartTax, cartTotal, clearCart, cart } = value;
    const { user } = useContext(userContext)
    const collectionRef = collection(db, "productOrders");

    const placeProductOrder = async (e) => {
        if (user.userId) {
            const dataArray = [];
            cart.forEach(element => {
                dataArray.push({
                    name: element.company,
                    orderDate: Date(),
                    orderId: uuidv4(),
                    price: element.price,
                    productId: element.id,
                    quantity: element.count,
                    total: element.total,
                    userId: user.userId,
                    image: element.img
                })
            });

            const batch = writeBatch(db);

            dataArray.forEach((data) => {
                const docref = doc(collectionRef);
                batch.set(docref, data);
            });

            batch
                .commit()
                .then(() => {
                    console.log("batch write operation completed");
                    alert("order placed successfully");
                    clearCart();
                })
                .catch((error) => {
                    console.error("batch write operation failed: ", error);
                    alert(error);
                });
        } else {
            alert("To make order you need to login first");
        }
    }

    return <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <button
                        className="btn btn-outline-danger text-uppercase mb-3 px-5"
                        type="button"
                        onClick={() => {
                            clearCart();
                        }}>
                        clear cart
                    </button>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartSubTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartTax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartTotal}</strong>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <button
                        className="btn btn-outline-danger text-uppercase mb-3 px-5"
                        type="button"
                        onClick={() => {
                            placeProductOrder();
                        }}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>

    </React.Fragment>;

}
