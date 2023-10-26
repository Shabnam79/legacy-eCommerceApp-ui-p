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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CheckoutForm = ({ value }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store);
    const { cartSubTotal, cartTax, cartTotal, cart } = value;
    const { user } = useContext(userContext);

    const placeProductOrder = async (e) => {
        debugger
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
                
                <div className="checkout-container">
                    <>
                        <div className="shipping-info mt-2">
                            <h4>Shipping Details</h4>
                            <Card style={{ width: '25rem' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Body>
                                    <Card.Title>Billing Address</Card.Title>
                                    <Card.Text>
                                        <div className="billing-info">
                                            <p>
                                                <strong>Name:</strong> John Doe
                                            </p>
                                            <p>
                                                <strong>Email:</strong> johndoe@gmail.com
                                            </p>
                                            <p>
                                                <strong>Address 1:</strong> 11th Street , Palm Olympia
                                            </p>
                                            <p>
                                                <strong>Address 1:</strong> Boston Road 
                                            </p>
                                            <p>
                                                <strong>City:</strong> New Jersey City
                                            </p>
                                            <p>
                                                <strong>State:</strong> Newyork
                                            </p>
                                            <p>
                                                <strong>Country:</strong> USA, 111100
                                            </p>
                                        </div>
                                    </Card.Text>
                                    <Button variant="primary">Add New Address</Button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="payment-info mt-2">
                            <h4>Payment Info</h4>
                            <Card style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Card.Title>Choose Payment Option</Card.Title>
                                    <Card.Text>
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
                                    </Card.Text>
                                    <Button variant="primary">Add New Card</Button>
                                </Card.Body>
                            </Card>

                        </div>
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