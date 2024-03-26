// ReviewModal.js

import React, { useEffect, useState } from 'react'
import ReviewCards from './ReviewCards';
import Dropdown from 'react-bootstrap/Dropdown';
import { getProductReviewByProductIdService } from '../../firebase/services/review.service';

const ReviewModal = (props) => {
    const borderHello = { border: "none" };
    const [reviews, setReviews] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Top Reviews');

    useEffect(() => {
        fetchProductReviews();
    }, [selectedOption]);

    const fetchProductReviews = async () => {
        let data = await getProductReviewByProductIdService(props.productId);
        if (data != undefined) {
            // Sort reviews based on the selected option
            if (selectedOption === 'Top Reviews') {
                data.sort((a, b) => b.rating - a.rating);
            } else if (selectedOption === 'Most Recent') {
                data.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
            }

            setReviews(data);
        }
    }

    const handleSelectChange = (eventKey) => {
        setSelectedOption(eventKey);
    };
    return (
        <>
            <hr />
            <h1 className='text-title'>
                <center>Reviews</center>
            </h1>
            <Dropdown onSelect={handleSelectChange}>
                <Dropdown.Toggle className='tx-dropdown' style={{ background: 'rgba(243, 243, 243, 0.24', backdropFilter: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px', ...borderHello, color: '#053645' }}>
                    {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu className='tx-dropdown-menu'>
                    <Dropdown.Item eventKey="Top Reviews">Top Reviews</Dropdown.Item>
                    <Dropdown.Item eventKey="Most Recent">Most Recent</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div {...props} aria-labelledby="contained-modal-title-vcenter" >
                <div>
                    {
                        reviews.length > 0 ? reviews.map(review => {
                            return <ReviewCards key={review.id} review={review} />;
                        }) : <div className='text-center my-4'>
                            "No review has been published yet for the product"
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ReviewModal;
