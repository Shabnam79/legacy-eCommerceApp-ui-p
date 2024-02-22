import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
//import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import userContext from "../utils/userContext";
//import { auth } from "../firebase/config/firebase.config";
import { useLocalStorage } from '../hooks/useLocalStorage';
//import { ButtonContainer } from './Button';
import LoginModal from './LoginModal';
import { toast } from "react-toastify";
import { variables } from "../utils/variables";
import axios from 'axios';
import { getRolesByEmailService } from '../firebase/services/user.service';

const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(6, 'Must be greater than 6 characters')
        .max(10, 'Must be less than or equal to 10 characters')
        .required(),
});

const Login = () => {
    const { user, setUser } = useContext(userContext);
    const { setItem } = useLocalStorage();
    const [modalShow, setModalShow] = useState(false);
    //const [isActive, setIsActive] = useState(false);

    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const borderHello = { border: "none" };
    const stylingLoginButton = {
        color: 'white',
        backgroundColor: 'rgb(5, 54, 69)',
        border: '1px solid #6855e0',
        borderRadius: '5px'
    };
    const loginButtonTrans = {
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

    const authentication = async (values) => {
        debugger
        let data = await getRolesByEmailService(values.email);
        if (data != undefined) {
            //console.log(data[0]);
            //setIsActive(data[0].isActive);

            if (data.isActive == true) {
                const payload = {
                    email: values.email,
                    password: values.password
                }

                axios({
                    method: 'post',
                    url: variables.API_URL + 'Auth/Login',
                    data: payload,

                }).then((response) => {
                    let userData = {
                        userId: response.data.localId,
                        email: response.data.email,
                        roleId: data.roleId
                    };

                    setItem("user", JSON.stringify(userData));

                    setUser({
                        ...user,
                        userId: response.data.localId,
                        email: response.data.email,
                        roleId: data.roleId
                    });
                }).catch(error => {
                    //console.log(error.code);
                    if (error.code === "ERR_BAD_REQUEST") {
                        toast.error("Invalid login credentials.", {
                            autoClose: 1000,
                        });
                    }
                });

            }
            else if (data.isActive == false) {
                toast.warning(
                    `your Account is Inactive.Please connect with Admin.`,
                    {
                        autoClose: 1000,
                    }
                );
            }
            else{
                toast.warning(
                    `your Account is Inactive.Please connect with Admin.`,
                    {
                        autoClose: 1000,
                    }
                );
            }

        } else {
            toast.warning(
                `To Login you need to signUp first`,
                {
                    autoClose: 1000,
                }
            );
        }

        // debugger
        // const payload = {
        //     email : values.email,
        //     password : values.password
        // }

        // axios({
        //     method: 'post',
        //     url: variables.API_URL + 'Auth/Login',
        //     data: payload, 

        // }).then(function(response) {
        //     debugger
        //     console.log(response.localId);
        //     let userData = {
        //                     userId: response.data.localId,
        //                     email: response.data.email
        //                 };

        //                 setItem("user", JSON.stringify(userData));

        //                 setUser({
        //                     ...user,
        //                     userId: response.data.localId,
        //                     email: response.data.email
        //                 });


        //     }).catch((error) => {
        //         debugger
        //             console.log(error.code);
        //             if (error.code === "ERR_BAD_REQUEST") {
        //                 toast.error("Invalid login credentials.", {
        //                     autoClose: 1000,
        //                 });
        //             }
        //     });



        // const getAuthentication = getAuth();
        // signInWithEmailAndPassword(getAuthentication, values.email, values.password)
        //     .then((res) => {
        //         // console.log("login success");
        //         // console.log("Auth Token", res._tokenResponse.refreshToken);

        //         let userData = {
        //             userId: auth.currentUser.uid,
        //             email: values.email
        //         };

        //         setItem("user", JSON.stringify(userData));

        //         setUser({
        //             ...user,
        //             userId: auth.currentUser.uid,
        //             email: values.email
        //         });
        //     })
        //     .catch((error) => {
        //         // console.log(error.code);
        //         if (error.code === "auth/wrong-password") {
        //             // alert("Please check the password");
        //             toast.error("Please check the password", {
        //                 autoClose: 1000,
        //             });
        //         } else if (error.code === "auth/user-not-found") {
        //             // alert("Please check the email");
        //             toast.error("Please check the email", {
        //                 autoClose: 1000,
        //             });
        //         } else if (error.code === "auth/invalid-login-credentials") {
        //             // alert("invalid-login-credentials");
        //             toast.error("invalid-login-credentials", {
        //                 autoClose: 1000,
        //             });
        //         }
        //     });
    }

    return (
        <>
            <Row className='d-flex justify-content-center'>
                <div className='login-form'>
                    <Formik validationSchema={schema}
                        onSubmit={authentication}
                        initialValues={{
                            email: 'noorsre@gmail.com',
                            password: '12345678',
                        }} >
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
                                    <Form.Control
                                        className='login-signup-input'
                                        placeholder="******"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <div className='d-flex justify-content-center mt-2'>
                                    <button style={{ ...stylingLoginButton, ...loginButtonTrans }} type="submit">
                                        <span>Login</span>
                                    </button>
                                </div>

                                <LoginModal
                                    name="Signup"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}

                                />
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span className='mr-1' style={{ fontSize: '14px' }}>New User? </span>
                                    <span onClick={(e) => {
                                        e.preventDefault();
                                        setModalShow(true);
                                    }} style={{
                                        fontSize: '15px',
                                        color: 'blue',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}>Click Here
                                    </span>
                                </div>
                            </Form>
                        )}
                    </Formik >
                </div>
            </Row>
        </>
    );
}

export default Login;