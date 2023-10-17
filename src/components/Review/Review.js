import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Title from '../Title';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { ButtonContainer } from '../Button';
import StarRating from '../StarRating';
import { getProductReviewByOrderIdService, saveProductReview } from '../../firebase/services/review.service';
import { toast } from 'react-toastify';
import userContext from '../../utils/userContext';

const schema = yup.object().shape({
    title: yup.string()
        .required(),
    description: yup.string()
        .required(),
});

const Review = () => {
    let { orderId } = useParams();
    const { user } = useContext(userContext);
    const [productReviewDetails, setProductReviewDetails] = useState({});

    useEffect(() => {
        fetchProductReview(orderId);
    }, []);

    const fetchProductReview = async (orderId) => {
        const data = await getProductReviewByOrderIdService(orderId);
        if (data.length > 0) {
            setProductReviewDetails(data[0]);
        }
    }

    const addUpdateProductReview = async (values) => {
        let reviewObj = {
            userId: user.userId,
            orderId: orderId,
            reviewDate: Date(),
            title: values.title,
            description: values.description,
            rating: productReviewDetails.rating
        }

        await saveProductReview(reviewObj);

        toast.success(`review submitted successfully`, {
            autoClose: 1000,
        });
    }

    const setRating = (rating) => {
        setProductReviewDetails({ rating: rating });
    }

    return (
        <>
            <div className="container">
                <Title name="Ratings & Reviews" />

                <h4>Rate this product</h4>
                <StarRating parentCallback={setRating} myProductRating={productReviewDetails.rating} />
                <hr />

                {
                    productReviewDetails.rating > 0
                        ?
                        <Formik
                            validationSchema={schema}
                            onSubmit={addUpdateProductReview}
                            // onSubmit={(e) => {
                            //     const data = { title: e.title, description: e.description };
                            //     alert(JSON.stringify(data));
                            // }}
                            initialValues={{
                                // title: '',
                                // description: '',
                                ...productReviewDetails
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Title</Form.Label>

                                        <Form.Control
                                            type="text"
                                            placeholder="Review title..."
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            isInvalid={!!errors.title} />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.title}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>

                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Description..."
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.description} />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlFile1">
                                <Form.Label>Photos</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group> */}

                                    <ButtonContainer type="submit" style={{ "float": "right" }}>
                                        <i className="fas fa-user">Submit</i>
                                    </ButtonContainer>
                                </Form>
                            )}
                        </Formik >
                        :
                        null
                }

            </div>
        </>
    );
}

export default Review;