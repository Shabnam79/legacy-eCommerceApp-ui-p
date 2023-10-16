import React from 'react';
import { useParams } from "react-router-dom"
import Title from '../Title';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { ButtonContainer } from '../Button';
import StarRating from '../StarRating';

const Review = () => {
    // let { orderId } = useParams();

    return (
        <>
            <div className="container">
                <Title name="Ratings & Reviews" />

                <h4>Rate this product</h4>
                <StarRating />
                <hr />

                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Review title..." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description..." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Photos</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>

                    <ButtonContainer type="submit" style={{ "float": "right" }}>
                        <i className="fas fa-user">Submit</i>
                    </ButtonContainer>
                </Form>
            </div>
        </>
    );
}

export default Review;