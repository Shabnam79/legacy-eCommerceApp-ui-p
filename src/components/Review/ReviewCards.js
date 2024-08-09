// ReviewCards.js

import React from 'react'
import Card from 'react-bootstrap/Card';
import StaticStarRating from './StaticStarRating';

const ReviewCards = ({ review }) => {
    const { rating, title, description, imageData, reviewedDate, userName } = review;

    // Format date and time
    // const formattedDateTime = formatDate(items[0].orderDate);
    // setDateTime(formattedDateTime);

    // Function to format date and time with month name
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);

        // Get day, month, year
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        // Get time
        // const hours = date.getHours().toString().padStart(2, '0');
        // const minutes = date.getMinutes().toString().padStart(2, '0');
        // const seconds = date.getSeconds().toString().padStart(2, '0');
        // const time = `${hours}:${minutes}:${seconds}`;

        // Format the date
        //const formattedDateTime = `${day} ${month} ${year} ${time}`;
        const formattedDateTime = `${day} ${month} ${year}`;
        return formattedDateTime;
    };

    return (
        <Card style={{
            width: '100%',
            borderRadius: '0px',
            border: 'none',
            borderBottom: '1px solid #EAEAEC'
        }} className='my-3' >
            <Card.Body>
                <div className='d-flex align-items-center'>
                    <Card.Title className='font-weight-bold text-uppercase mb-0' style={{ padding: "10px 10px 2.5px 10px", color: '#000' }}>{userName}</Card.Title>
                    <h2 className='mr-1 font-weight-light' style={{ marginBottom: '5px', color: '#007185' }}>|</h2>
                    <StaticStarRating myProductRating={rating} />
                </div>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a", fontWeight: '100', marginBottom: '0px' }}>
                    <strong style={{ fontWeight: '500' }}>Reviewed on:</strong> {formatDate(reviewedDate)}
                </Card.Text>
                <Card.Title className='font-weight-bold text-uppercase mb-0' style={{ padding: "10px 10px 2.5px 10px", color: '#FF905A' }}>{title}</Card.Title>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a", fontWeight: '100' }}>
                    <strong style={{ fontWeight: '500' }}>Review:</strong> {description}
                </Card.Text>
                <div className='d-flex flex-column my-3' style={{ paddingLeft: '10px' }} >
                    {imageData && imageData.length !== 0 ? (
                        <img src={`data:image/png;base64, ${imageData}`} style={{ height: "auto", width: "250px" }} className="img-fluid" alt="product" />
                    ) : null}
                </div>
            </Card.Body>
        </Card >
    )
}

export default ReviewCards;