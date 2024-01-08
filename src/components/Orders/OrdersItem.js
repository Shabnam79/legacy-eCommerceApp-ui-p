import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const OrdersItem = ({ item }) => {

    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-6 col-xs-12 my-3'>
                <Card>
                    <Card.Img variant="top" src={item.image} style={{ height: "300px" }} />
                    <Card.Body>
                        <Card.Title><b>{item.name}</b></Card.Title>
                        <p className='m-0'>
                            <b>Order Id:</b> {item.orderId}
                        </p>
                        <p className='m-0'>
                            <b>Date/Time</b> {new Date(item.orderDate).toLocaleString()}
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
            {/* <div className="container mt-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                        
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Card.Text>
                                                Order Placed
                                            </Card.Text>
                                        </Row>
                                        <Row>
                                            <Card.Text>
                                                {new Date(item.orderDate).toLocaleString()}
                                            </Card.Text>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Card.Text>
                                                Total
                                            </Card.Text>
                                        </Row>
                                        <Row>
                                            <Card.Text>
                                                ${item.total}
                                            </Card.Text>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Card.Text>
                                                Order Id
                                            </Card.Text>
                                        </Row>
                                        <Row>
                                            <Card.Text>
                                                {item.orderId}
                                            </Card.Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Img
                                            variant="top"
                                            style={{ height: 100, width: 100 }}
                                            src={item.image} />
                                    </Col>
                                    <Col>
                                        <Card.Text>
                                            {item.name}
                                        </Card.Text>
                                        <Link to={`/review/${item.productId}/${item.orderId}`}>
                                            &#9733; Rate and Review Product
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        
                    </div>
                </div>
            </div > */}
        </>
    );
}

export default OrdersItem;