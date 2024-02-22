import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
//import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import LoginModal from './LoginModal';
import { toast } from "react-toastify";
//import {collection, addDoc} from "firebase/firestore";
//import { db } from "../firebase/config/firebase.config";
import { variables } from "../utils/variables";
import axios from 'axios';

const schema = yup.object().shape({
    email: yup.string()
        .email()
        .max(254, 'Must be less than or equal to 254 characters')
        .required(),
    password: yup.string()
        .min(6, 'Must be greater than 6 characters')
        .max(10, 'Must be less than or equal to 10 characters')
        .required(),
});

const Signup = () => {
    const [modalShow, setModalShow] = useState(false);
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const stylingSignupButton = {
        color: 'white',
        backgroundColor: 'rgb(5, 54, 69)',
        border: '1px solid #6855e0',
        borderRadius: '5px'
    };
    const SignupButtonTrans = {
        cursor: 'pointer',
        border: '0',
        borderRadius: '5px',
        fontweight: '600',
        margin: '14px 0px',
        width: '150px',
        padding: '0.375rem 0.75rem',
        boxshadow: '0 0 20px #6855e0',
        transition: '0.4s',
    }
    //const usersCollectionRef = collection(db,"userroles");
    const authentication = (values, { resetForm }) => {

        const payload = {
            email: values.email,
            password: values.password
        }

        axios({
            method: 'post',
            url: variables.API_URL + 'Auth/SignUp',
            data: payload,

        }).then(function (response) {
            toast.success(`Signup successfully`, {
                autoClose: 3000,
            });
            //resetForm();
            setModalShow(true);

        }).catch(function (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                toast.error("Email already in use.", {
                    autoClose: 1000,
                });
            }
        });

        // const getAuthentication = getAuth();
        // createUserWithEmailAndPassword(getAuthentication, values.email, values.password)
        //     .then((res) => {

        //         addDoc(usersCollectionRef,{
        //             UID: res.user.uid,
        //             email: values.email,
        //             role : "Customer",
        //             roleId : "tMcXpUvDofmo6DVMtBeD",
        //             isActive :"true",
        //             })
        //         debugger
        //         // alert("Signup successfully");
        //         toast.success(`Signup successfully`, {
        //             autoClose: 1000,
        //         });
        //         //resetForm();
        //         setModalShow(true);
        //     })
        //     .catch((error) => {
        //         // console.log(error.code);
        //         if (error.code === "auth/email-already-in-use") {
        //             // alert("auth/email-already-in-use");
        //             toast.error("auth/email-already-in-use", {
        //                 autoClose: 1000,
        //             });
        //         }
        //     });
    }

    return (
        <>
            <Row className='d-flex justify-content-center'>
                <div className='login-form'>
                    <Formik
                        validationSchema={schema}
                        onSubmit={authentication}
                        initialValues={{
                            email: '',
                            password: '',
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
                                <Form.Group controlId="validationFormik01">
                                    <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="jane@formik.com"
                                        className='login-signup-input'
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ ...fontsize }}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="validationFormik02" className='mt-2'>
                                    <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Password</Form.Label>
                                    <Form.Control style={{ ...fontsize }}
                                        type="text"
                                        placeholder="******"
                                        className='login-signup-input'
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ ...fontsize }}>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className='d-flex justify-content-center mt-2'>
                                    <button style={{ ...stylingSignupButton, ...SignupButtonTrans }} type="submit">
                                        Signup
                                    </button>
                                </div>
                                <LoginModal
                                    name="Login"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span className='mr-1' style={{ fontSize: '14px' }}>Exisiting User? </span>
                                    <span onClick={(e) => {
                                        e.preventDefault();
                                        setModalShow(true);
                                    }} style={{
                                        fontSize: '15px',
                                        color: 'blue',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}>Click Here</span>
                                </div>
                            </Form>
                        )}
                    </Formik >
                </div>
            </Row>
        </>
    );
}

export default Signup;