import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const OrdersItem = ({ item }) => {

    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-6 col-xs-12 my-3'>
                <Card>
                    <b style={{
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                        backgroundColor: "lightgrey",
                        padding: "5px 7.5px"
                    }}>
                        Order Placed
                    </b>
                    <Card.Img variant="top" src={item.image} style={{ height: "300px" }} />
                    <Card.Body>
                        <Card.Title><b>{item.name}</b></Card.Title>
                        <p className='m-0'>
                            <b>Order Id:</b> {item.orderId}
                        </p>
                        <p className='m-0'>
                            <b>Date/Time:</b> {new Date(item.orderDate).toLocaleString()}
                        </p>
                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <p className='m-0'><b>Total:</b> ${item.total}</p>
                            <Link style={{ color: "white", textDecoration: "none" }} to={`/review/${item.productId}/${item.orderId}`}>
                                <Button variant="primary">&#9733; Rate Product</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default OrdersItem;