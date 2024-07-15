import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import Title from '../Title';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import StarRating from './StarRating';
import { getProductReviewByOrderIdService, getProductReviewByProductIdService, saveProductReview, updateProductReview } from '../../firebase/services/review.service';
import { toast } from 'react-toastify';
import userContext from '../../utils/userContext';

const schema = yup.object().shape({
    title: yup.string()
        .required(),
    description: yup.string()
        .required(),
});

const Review = (props) => {
    let { productId, orderId } = useParams();
    const { user } = useContext(userContext);
    const [productReviewDetails, setProductReviewDetails] = useState({});
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUpdateReview, setIsUpdateReview] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductReview(orderId);
        document.title = "Ratings & Reviews";
    }, [user.userId]);

    const handleMediaChange = (e) => {
        const file = e.target.files;
        setImageUpload(e.target.files);
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const fetchProductReview = async (OrderItemId, ProductItemId) => {
        const orderData = await getProductReviewByOrderIdService(OrderItemId);

        if (orderData) {
            setProductReviewDetails(orderData);
            setImageUrls(orderData.imageData);
            setIsUpdateReview(true);
        } else {
            const productData = await getProductReviewByProductIdService(ProductItemId);
            if (productData) {
                setProductReviewDetails(productData);
                setIsUpdateReview(false);
            }
        }
    };


    const addUpdateProductReview = async (values) => {
        let reviewObj = {
            Id: values.id,
            Title: values.title,
            Description: values.description,
            ProductId: productId,
            UserId: user.userId,
            OrderItemId: orderId,
            Rating: productReviewDetails.rating,
            reviewDate: Date(),
        }
        if (isUpdateReview == false) {
            if (!imageUpload || imageUpload.length == 0) {
                await saveProductReview(reviewObj);
            }
            else {
                await saveProductReview(reviewObj, imageUpload);
            }
            toast.success(`review submitted successfully`, {
                autoClose: 1000,
            });
        }
        else if (isUpdateReview == true) {
            if (!imageUpload || imageUpload.length == 0) {
                await updateProductReview(reviewObj);
            }
            else {
                await updateProductReview(reviewObj, imageUpload[0]);
            }
            toast.success(`review updated successfully`, {
                autoClose: 1000,
            });

        }

        navigate('/orders');
    }

    const setRating = (rating) => {
        setProductReviewDetails({ rating: rating });
    }

    return (
        <>
            <div className="container mt-5">
                <Title className="title-text" name="Ratings & Reviews" />
                <h4 style={{ color: '#053645' }}>Rate this product</h4>
                <StarRating parentCallback={setRating} myProductRating={productReviewDetails.rating} />
                <hr />
                {
                    productReviewDetails.rating > 0
                        ?
                        <Formik
                            validationSchema={schema}
                            onSubmit={addUpdateProductReview}
                            initialValues={{
                                ...productReviewDetails
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3 reviewLabelInput" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            className='review-input'
                                            type="text"
                                            placeholder="Review title..."
                                            name="title"
                                            style={{ height: '60px' }}
                                            value={values.title}
                                            onChange={handleChange}
                                            isInvalid={!!errors.title} />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.title}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className="mb-3 reviewLabelInput" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className='review-textarea'
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

                                    <Form.Group className="mb-3 reviewLabelInput" controlId="exampleForm.ControlFile1">
                                        <Form.Label>Photos</Form.Label>
                                        <Form.Control
                                            className='review-input'
                                            type="file"
                                            style={{ height: '70px' }}
                                            accept="image/*, video/*"
                                            onChange={handleMediaChange}
                                        />
                                        <div className="">
                                            {imageUrls.length != 0 ? (
                                                <img src={`data:image/png;base64, ${imageUrls}`} style={{
                                                    height: "auto",
                                                    width: "250px"
                                                }} className="img-fluid mt-3" alt="product" />
                                            ) : null}
                                        </div>
                                        {selectedFiles.map((file, index) => (
                                            <div className='d-flex flex-column my-3' key={index}>
                                                <strong className='mb-2'>Selected File {index + 1}:</strong>
                                                {file.type.startsWith('image/') ? (
                                                    <img src={URL.createObjectURL(file)} alt="Selected" rounded style={{ height: "auto", width: "250px" }} />
                                                ) : file.type.startsWith('video/') ? (
                                                    <video src={URL.createObjectURL(file)} controls rounded style={{ height: "auto", width: "250px" }} />
                                                ) : null}
                                                <Button className="mt-2" onClick={() => handleFileRemove(index)} style={{
                                                    width: '100px',
                                                    backgroundColor: '#8C7569',
                                                    border: 'none'
                                                }}>Remove</Button>
                                            </div>
                                        ))}
                                    </Form.Group>
                                    <Button type="submit" style={{
                                        backgroundColor: '#8C7569',
                                        border: 'none',
                                        float: 'right',
                                        marginBottom: '50px'
                                    }}>
                                        <i className="fas fa-user">&ensp;<span>Submit</span></i>
                                    </Button>
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