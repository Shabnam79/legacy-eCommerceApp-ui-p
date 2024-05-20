// ReviewCards.js

import React from 'react'
import Card from 'react-bootstrap/Card';
import StaticStarRating from './StaticStarRating';

const ReviewCards = ({ review }) => {
    const { rating, title, description, img, reviewDate } = review;
    return (
        <Card style={{
            width: '100%',
            borderRadius: '0px',
            border: 'none',
            borderBottom: '1px solid #EAEAEC'
        }} className='my-3' >
            <Card.Body>
                <div className='d-flex align-items-center'>
                    <Card.Title className='font-weight-bold text-uppercase mb-0' style={{ padding: "10px 10px 2.5px 10px", color: '#FF905A' }}>{title}</Card.Title>
                    <h2 className='mr-1 font-weight-light' style={{ marginBottom: '5px', color: '#007185' }}>|</h2>
                    <StaticStarRating myProductRating={rating} />
                </div>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a", fontWeight: '100' }}>
                    <strong style={{ fontWeight: '500' }}>Reviewed on:</strong> {reviewDate}
                </Card.Text>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a", fontWeight: '100' }}>
                    <strong style={{ fontWeight: '500' }}>Review:</strong> {description}
                </Card.Text>
                <div className='d-flex flex-column my-3' style={{ paddingLeft: '10px' }} >
                    {img && img.length !== 0 ? (
                        <img src={img} style={{ height: "auto", width: "250px" }} className="img-fluid" alt="product" />
                    ) : null}
                </div>
            </Card.Body>
        </Card >
    )
}

export default ReviewCards;