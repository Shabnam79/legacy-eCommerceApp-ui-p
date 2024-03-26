// ReviewCards.js

import React from 'react'
import Card from 'react-bootstrap/Card';
import StaticStarRating from './StaticStarRating';

const ReviewCards = ({ review }) => {
    const { rating, title, description, img, reviewDate } = review;
    return (
        <Card style={{
            width: '100%',
            color: '#053645',
            backdropFilter: 'blur(8px)',
            borderRadius: '0px',
            background: 'rgba(243, 243, 243, 0.24)',
            boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px',
            border: 'none',
        }} className='my-3' >
            <Card.Body>
                <div className='d-flex align-items-center'>
                    <Card.Title className='mr-2 text-uppercase mb-0' style={{ paddingLeft: "10px" }}>{title}</Card.Title>
                    <h2 className='mr-2'>|</h2>
                    <StaticStarRating myProductRating={rating} />
                </div>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a" }}>
                    <strong>Reviewed on:</strong> {reviewDate}
                </Card.Text>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a" }}>
                    <strong>Review:</strong> {description}
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