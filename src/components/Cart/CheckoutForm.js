import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { db } from "../../firebase/config/firebase.config";
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { saveCartOrderService } from '../../firebase/services/order.service';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { query, where, getDocs, collection } from "firebase/firestore";
import { createPortal } from "react-dom";
import { removeAll } from '../../utils/cartSlice';
import axios from 'axios';
import { variables } from '../../utils/variables';

function IFrame({ children }) {
    const [ref, setRef] = useState();
    const container = ref?.contentDocument?.body;
    return (
        <iframe title="PlacedOrderIframe"
            width="318px" height="200px" border='none'
            scrolling="no" ref={setRef}>
            {container && createPortal(children, container)}
        </iframe>
    );
}

const CheckoutForm = ({ value }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store);
    const { cartSubTotal, cartTax, cartTotal, cart } = value;
    const { user } = useContext(userContext);
    const [shippingAddress, setShippingAddress] = useState([]);
    const address = shippingAddress[0];
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };

    const roundToWholeNumber = (number) => {
        return Math.round(number);
    };

    const totalOrderAmount = roundToWholeNumber(cartItems.cart.totalCost);
    

    useEffect(() => {
        fetchAddShippingDetails();
        document.title = "Checkout"
    }, [user.userId]);

    const placeProductOrder = async (e) => {
        if (user.userId) {
            let orderTotal = 0;
            cart.forEach(element => {
                orderTotal = element.price * element.quantity;
            });
            
            let obj = {
                userId: user.userId,
                orderTotal: totalOrderAmount
            }
            
            await saveCartOrderService(obj);
            dispatch(removeAll());
            toast.success(`Your order has been successfully placed!`, {
                autoClose: 1000,
            });
        } else {
            toast.warning(
                `To make order you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }
    }

    const fetchAddShippingDetails = async () => {
        if (user.userId) {
            try {
                const response = await axios.get(variables.API_URL_NEW + 'Product/GetShippingAddressByUserId', {
                    params: { "userId": user.userId }
                });
                const data = response.data;
                if (data) {
                    setShippingAddress(data);
                }
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 1000,
                });
            }
        } else {
            console.log("Please login to see shipping address");
        }
    }

    const getEmailPrefix = (email) => {
        if (email) {
            return email.split('@')[0];
        }
        return '';
    };

    return (
        <section>
            {
                <div className="container">
                    <div id="DivShippingInfo" className="shipping-info mt-2">
                        <h4 style={{ color: '#007185' }}>Shipping Address</h4>
                        <Card className='shipping-address-area' style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Text>
                                    <div className="billing-info">
                                        <p>
                                            <strong>Name: </strong> {getEmailPrefix(shippingAddress.email)}
                                        </p>
                                        <p>
                                            <strong>Address 1: </strong> {shippingAddress.address1}
                                        </p>
                                        <p>
                                            <strong>Address 2: </strong> {shippingAddress.address2}
                                        </p>
                                        <p>
                                            <strong>City: </strong> {shippingAddress.city}
                                        </p>
                                        <p>
                                            <strong>State: </strong> {shippingAddress.state}
                                        </p>
                                        <p>
                                            <strong>Country: </strong> {shippingAddress.country}
                                        </p>
                                        <p>
                                            <strong>ZipCode: </strong> {shippingAddress.pinCode}
                                        </p>
                                    </div>
                                </Card.Text>
                                <Link to="/billingAddress">
                                    <Button className='add-new-address-button'>Add New Address</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <IFrame>
                        <div id="DivPaymentInfo" className="payment-info mt-2">
                            <h4>Payment Info</h4>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Choose Payment Method :</Card.Title>
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
                                    <Button className='add-new-card-button' style={{
                                        border: 'none',
                                        backgroundColor: '#007185',
                                        color: '#FFF',
                                        padding: '0.375rem 0.75rem',
                                        fontSize: '1rem',
                                        borderRadius: '0.25rem',
                                        lineHeight: '1.5'
                                    }}>Add New Card</Button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="DivPlaceOrder" className="row">
                            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize">
                                <Link to="/orders">
                                    <button style={{
                                        marginTop: "10px",
                                        backgroundColor: '#FFF',
                                        border: '1px solid #007185',
                                        color: '#007185',
                                        padding: '0.375rem 0.75rem',
                                        fontSize: '1rem',
                                        borderRadius: '0.25rem',
                                        lineHeight: '1.5'
                                    }}
                                        className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                        type="button"
                                        onClick={() => {
                                            placeProductOrder();
                                        }}>
                                        Place Order
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </IFrame>
                </div >
            }
        </section >
    );
}
export default CheckoutForm;