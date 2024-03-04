import React from 'react'
import Card from 'react-bootstrap/Card';
import StaticStarRating from './StaticStarRating';

const ReviewCards = ({ review }) => {
    const { rating, title, description, img } = review;
    return (
        <Card style={{
            width: '100%',
            color: '#053645',
            backdropFilter: 'blur(8px)',
            background: 'rgba(243, 243, 243, 0.24)',
        }} className='my-3' >
            <Card.Header style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <StaticStarRating myProductRating={rating} />
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ paddingLeft: "10px" }}>{title}</Card.Title>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a" }}>
                    {description}
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