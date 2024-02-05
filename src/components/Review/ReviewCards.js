import React from 'react'
import Card from 'react-bootstrap/Card';
import StaticStarRating from './StaticStarRating';
import { Col, Image, Row } from 'react-bootstrap';

const ReviewCards = ({ review }) => {
    const { rating, title, description, img } = review;
    console.log(review);
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <StaticStarRating myProductRating={rating} />
                {/* <div style={{ padding: "10px" }}>
                    <i className="fas fa-user"> Anonymous</i>
                </div> */}
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ paddingLeft: "10px" }}>{title}</Card.Title>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a" }}>
                    {description}
                </Card.Text>
                <div className="container my-3">
                                            <Row>
                                                <Col xs={6} md={4}>
                                                {img.length != 0 ? (
                                                    <img src={img} style={{
                                                        width: "100%",
                                                        aspectRatio: "3/2",
                                                        objectFit: "contain"
                                                    }} className="img-fluid" alt="product" />
                                                ) : null}
                                                </Col>
                    </Row>
                </div>
            </Card.Body>
        </Card >
    )
}

export default ReviewCards;