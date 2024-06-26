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

    useEffect(() => {
        fetchAddShippingDetails();
        document.title = "Checkout"
    }, [user.userId]);

    const placeProductOrder = async (e) => {
        if (user.userId) {
            let orderTotal = 0;
            cart.forEach(element => {
                console.log(element);
                orderTotal = element.price * element.quantity;
            });
            console.log(orderTotal);
            let obj = {
                userId: user.userId,
                orderTotal: orderTotal
            }
            console.log(obj);
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
            await getDocs(collection(db, "shippingAddress"), where("userId", "==", user.userId))
                .then((querySnapshot) => {
                    const shippingAddress = [];
                    querySnapshot.forEach((doc) => {
                        shippingAddress.push(doc.data());
                    });
                    setShippingAddress(shippingAddress);// Update the component's state with the fetched data
                })
        } else {
            console.log("Please login to see shipping address");
        }
    }

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
                                            <strong>Name: </strong> {address ? address.firstName + ' ' + address.lastName : ''}
                                        </p>
                                        <p>
                                            <strong>Address 1: </strong> {address ? address.address : ''}
                                        </p>
                                        <p>
                                            <strong>Address 2: </strong> {address ? address.address2 : ''}
                                        </p>
                                        <p>
                                            <strong>City: </strong> {address ? address.city : ''}
                                        </p>
                                        <p>
                                            <strong>State: </strong> {address ? address.state : ''}
                                        </p>
                                        <p>
                                            <strong>Country: </strong> {address ? address.country : ''}
                                        </p>
                                        <p>
                                            <strong>ZipCode: </strong> {address ? address.zipCode : ''}
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