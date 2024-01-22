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
import {query,where,getDocs, collection } from "firebase/firestore";
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
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};

    useEffect(() => {
        fetchAddShippingDetails();
        document.title = "Checkout"
    }, [user.userId]);

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
              console.log(shippingAddress)
            })
        } else {
            console.log("Please login to see shipping address");
        }
    }

    return (
        <section>
            {
                <div className="container">
                    <>
                        <div id="DivShippingInfo" className="shipping-info mt-2">
                            <h4 style={{...fontfamily}}>Shipping Info</h4>
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <Card.Title style={{...fontfamily}}>Shipping Address :</Card.Title>
                                    <Card.Text>
                                        <div className="billing-info">
                                            <><p style={{...fontfamily}}>
                                                <strong>Name : </strong> {address ? address.firstName + ' ' + address.lastName : ''}
                                            </p><p style={{...fontfamily}}>
                                                    <strong>Address 1 : </strong> {address ? address.address : ''}
                                                </p><p style={{...fontfamily}}>
                                                    <strong>Address 2 : </strong> {address ? address.address2 : ''}
                                                </p><p style={{...fontfamily}}>
                                                    <strong>City : </strong> {address ? address.city : ''}
                                                </p><p style={{...fontfamily}}>
                                                    <strong>State : </strong> {address ? address.state : ''}
                                                </p><p style={{...fontfamily}}>
                                                    <strong>Country : </strong> {address ? address.country : ''}
                                                </p><p style={{...fontfamily}}>
                                                    <strong>ZipCode : </strong> {address ? address.zipCode : ''}
                                                </p></>
                                        </div>
                                    </Card.Text>
                                    <Link to="/billingAddress">
                                        <Button variant="primary" style={{...fontfamily}}>Add New Address</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <IFrame>
                        <div id="DivPaymentInfo" className="payment-info mt-2">
                            <h4 style={{...fontfamily}}>Payment Info</h4>
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <Card.Title style={{...fontfamily}}>Choose Payment Method :</Card.Title>
                                    <Card.Text style={{...fontfamily}}>
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
                                    <Button variant="primary" style={{...fontfamily}}>Add New Card</Button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="DivPlaceOrder" className="row">
                            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize">
                                <Link to="/orders">
                                    {/* <button style={{...fontfamily,marginLeft:"-118px"}} */}
                                    <button style={{...fontfamily,marginTop:"10px"}}
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
                    </>
                    
                </div>
            }
        </section>
    );
}
export default CheckoutForm;