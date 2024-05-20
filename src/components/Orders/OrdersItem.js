import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const OrdersItem = ({ item }) => {

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    return (
        <>
            <div className='m-3 ordersCard'>
                <Card className='placedOrder-Card'>
                    <b style={{
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                        backgroundColor: "#FFFFFF",
                        padding: "5px 7.5px",
                        color: '#007185'
                    }}>
                        Order Placed
                    </b>
                    <Card.Img variant="top" src={item.image} style={{ height: "270px", borderRadius: '0px' }} />
                    <Card.Body>
                        <div className='cardBodyArea'>
                            <Card.Title>{item.name}</Card.Title>
                            <p>
                                <b className='mr-1'>Order Id:</b>
                                <span>{item.orderId}</span>
                            </p>
                            <p>
                                <b className='mr-1'>Date/Time:</b>
                                <span>{new Date(item.orderDate).toLocaleString()}</span>
                            </p>
                            <p className='d-flex'>
                                <b className='mr-1'>Total:</b>
                                <span style={{ fontSize: '12px' }}>$</span>
                                <span>{item.total}</span>
                            </p>
                        </div>
                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <Link className='rateProductButton' onClick={() => openInNewTab(`/review/${item.productId}/${item.orderId}`)}>
                                <Button className='RateProduct-Button'>&#9733; Rate Product</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default OrdersItem;