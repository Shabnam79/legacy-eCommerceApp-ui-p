import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import { Row } from 'react-bootstrap';
import userContext from "../utils/userContext";
import { useLocalStorage } from '../hooks/useLocalStorage';
import LoginModal from './LoginModal';
import { toast } from "react-toastify";
import { variables } from "../utils/variables";
import axios from 'axios';
import { getRolesByEmailService } from '../firebase/services/user.service';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(6, 'Must be greater than 6 characters')
        .max(40, 'Must be less than or equal to 40 characters')
        .required(),
});

const Login = () => {
    const { user, setUser } = useContext(userContext);
    const { setItem } = useLocalStorage();
    const [modalShow, setModalShow] = useState(false);
    const fontsize = { fontSize: 'x-small' };
    const stylingLoginButton = {
        color: 'white',
        backgroundColor: '#8C7569',
        border: '1px solid #8C7569',
        borderRadius: '5px'
    };
    const loginButtonTrans = {
        cursor: 'pointer',
        border: '0',
        borderRadius: '5px',
        fontweight: '600',
        margin: '14px 0px',
        padding: '0.375rem 0.75rem',
        boxshadow: '0 0 20px #6855e0',
        transition: '0.4s',
    }

    const authentication = async (values) => {
        let data = await getRolesByEmailService(values);
        if (data != undefined) {
            const payload = {
                email: values.email,
                password: values.password
            }

            axios({
                method: 'post',
                url: variables.API_URL_NEW + 'Auth/Login',
                data: payload,

            }).then((response) => {
                let userData = {
                    email: data.email,
                    roleId: data.roleId,
                    userId: data.id,
                    userName: data.userName
                };

                setItem("user", JSON.stringify(userData));
                setUser({
                    ...user,
                    userId: response.data,
                    email: response.data.email,
                    roleId: data.roleId,
                    userName: data.userName

                });
            }).catch(error => {
                console.error(error.message);
            });

        } else {
            toast.warning(
                `Please check your credentials, your Email Id and Password are not matching!`,
                {
                    autoClose: 3000,
                }
            );
        }
    }

    return (
        <>
            <Row className='d-flex'>
                <div className='login-form'>
                    <Formik validationSchema={schema}
                        onSubmit={authentication}
                        initialValues={{
                            email: '',
                            password: '',
                        }} >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className='formInputArea' controlId="validationFormik01">
                                    <Form.Label style={{ fontSize: '14px' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="username@mailserver.domain"
                                        className='login-signup-input'
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        autocomplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ ...fontsize, textTransform: 'uppercase' }}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="validationFormik02" className='mt-2 formInputArea'>
                                    <Form.Label style={{ fontSize: '14px' }}>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        className='login-signup-input'
                                        placeholder="******"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        autocomplete="off"
                                    />

                                    <Form.Control.Feedback type="invalid" style={{ ...fontsize, textTransform: 'uppercase' }}>
                                        {errors.password}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <div className='d-flex justify-content-between align-items-center'>
                                    <Link className='forgotPassword' style={{ textDecoration: 'underline' }}>Forgot your password?</Link>
                                    <button style={{ ...stylingLoginButton, ...loginButtonTrans }} type="submit">
                                        <span>Login</span>
                                    </button>
                                </div>

                                <LoginModal
                                    name="Signup"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}

                                />
                                <div className='d-flex justify-content-center align-items-center mt-4'>
                                    <span className='mr-1' style={{ fontSize: '14px', fontWeight: '200' }}>Don't have an account? </span>
                                    <span onClick={(e) => {
                                        e.preventDefault();
                                        setModalShow(true);
                                    }} style={{
                                        fontSize: '15px',
                                        color: '#33333399',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}>Sign up now
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