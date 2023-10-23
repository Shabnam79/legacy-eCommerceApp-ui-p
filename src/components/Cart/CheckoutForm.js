import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { db } from "../../firebase/config/firebase.config";
import { doc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, removeAll } from '../../utils/cartSlice';
import { toast } from "react-toastify";
import { saveCartOrderService } from '../../firebase/services/order.service';
import { deleteRecordFromFirebaseService } from '../../firebase/services/product.service';


const CheckoutForm = ({ value }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store);
    const { cartSubTotal, cartTax, cartTotal, cart } = value;
    const { user } = useContext(userContext);

    const placeProductOrder = async (e) => {
        if (user.userId) {
            const dataArray = [];
            cart.forEach(element => {
                dataArray.push({
                    name: element.company,
                    orderDate: Date(),
                    orderId: uuidv4(),
                    price: element.price,
                    productId: element.productId,
                    quantity: element.count,
                    total: element.price * element.count,
                    userId: user.userId,
                    image: element.img,
                    id: element.id
                })
            });
            await saveCartOrderService(dataArray);
           // clearCart();
        } else {
            toast.warning(
                `To make order you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }
    }

    return (
        <section>
            {
                <div className="container-fluid">
                    <><Form>
                        <h4>Customer Info</h4>
                        <div className='row'>
                        <Form.Group className="col-md-4 mb-6" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="" />
                        </Form.Group>
                        <Form.Group className="col-md-4 mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" placeholder="" />
                        </Form.Group>
                        <Form.Group className="col-md-4 mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="" />
                        </Form.Group>
                        </div>
                       
                    </Form>
                        <Form>
                            <h4>Shipping Details</h4>
                            <div className='row'>
                            <Form.Group className="col-md-4 mb-6" controlId="exampleForm.ControlInput1">
                                <Form.Label>Billing Name</Form.Label>
                                <Form.Control type="firstName" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col-md-4 mb-6" controlId="exampleForm.ControlInput1">
                                <Form.Label>Select Country</Form.Label>
                                <Form.Control type="firstName" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col-md-4 mb-6" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address 1</Form.Label>
                                <Form.Control type="firstName" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col-md-4 mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control type="lastName" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col-md-4 mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="email" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col-md-4 mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="email" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col-md-4 mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="email" placeholder="" />
                            </Form.Group>
                            </div>
                        </Form>
                        <Form>
                            <h4>Payment Info</h4>
                            {['radio'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">

                                    <Form.Check
                                        
                                        type={type}
                                        label="Cash On Delivery"
                                        id={`disabled-default-${type}`}
                                    />
                                    <Form.Check
                                        disabled
                                        type={type}
                                        label="Credit Card"
                                        id={`disabled-default-${type}`}
                                    />
                                </div>
                            ))}
                        </Form>
                    </>
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
            }
        </section>
    );
}
export default CheckoutForm;