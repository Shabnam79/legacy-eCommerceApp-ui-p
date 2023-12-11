import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import userContext from "../utils/userContext";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ButtonContainer } from './Button';
import LoginModal from './LoginModal';
import { toast } from "react-toastify";

const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(6, 'Must be grater than 6 characters')
        .max(10, 'Must be less than or equal to 10 characters')
        .required(),
});

const Signup = () => {
    const [modalShow, setModalShow] = useState(false);
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const stylingSignupButton={
        color: 'white',
        backgroundColor: 'black',
        border: '1px solid #6855e0'
      };
    const SignupButtonTrans= {
        cursor: 'pointer',
        border: '0',
        borderradius: '4px',
        fontweight: '600',
        margin: '14px 16px',
        height:'30px',
        width: '200px',
        padding: '0px 10px',
        boxshadow: '0 0 20px #6855e0',
        transition: '0.4s',
      }
    const authentication = (values, { resetForm }) => {
        const getAuthentication = getAuth();
        createUserWithEmailAndPassword(getAuthentication, values.email, values.password)
            .then((res) => {
                // alert("Signup successfully");
                toast.success(`Signup successfully`, {
                    autoClose: 1000,
                });
                resetForm();
            })
            .catch((error) => {
                // console.log(error.code);
                if (error.code === "auth/email-already-in-use") {
                    // alert("auth/email-already-in-use");
                    toast.error("auth/email-already-in-use", {
                        autoClose: 1000,
                    });
                }
            });
    }

    return (
        <>
            <Row>
                <Col></Col>
                <Col>
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
                                    <Form.Label style={{fontSize:'16px',...fontfamily,fontWeight:'bold'}}>Email</Form.Label>

                                    <Form.Control  style={{...fontsize,...fontfamily}}
                                        type="email"
                                        placeholder="jane@formik.com"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />

                                    <Form.Control.Feedback type="invalid" style={{...fontsize,...fontfamily}}>
                                        {errors.email}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group controlId="validationFormik02">
                                    <Form.Label style={{fontSize:'16px',...fontfamily,fontWeight:'bold'}}>Password</Form.Label>

                                    <Form.Control style={{...fontsize,...fontfamily}}
                                        type="text"
                                        placeholder="******"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password} 
                                    />

                                    <Form.Control.Feedback type="invalid" style={{...fontsize,...fontfamily}}>
                                        {errors.password}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                {/* <Button
                                    type="submit"
                                    style={{ marginTop: "10px", background: "#fc8019", border: "#fc8019" }}
                                // onClick={() => authentication()}
                                >Login</Button> */}
{/* 
                                <ButtonContainer type="submit">
                                    <i className="fas fa-user">Signup</i>
                                </ButtonContainer> */}
                                <button style={{...fontfamily,marginLeft:'50x',...stylingSignupButton,...SignupButtonTrans}} type="submit">
                                    <span style={{...fontfamily}}>Signup</span>
                                </button> <br></br>
                                <br></br>
                                   <span style={{fontSize:'14px',...fontfamily,margin:'45px'}}>Exisiting User? </span>
                                 <span onClick={(e) => {
                                    e.preventDefault();
                                    setModalShow(true);
                                }}><span style={{fontSize:'15px',...fontfamily,margin:'-45px',color:'blue',fontWeight:'lightblue',cursor:'pointer'}}>Click Here</span>
                                </span>  
                                {/* <ButtonContainer onClick={(e) => {
                                    e.preventDefault();
                                    setModalShow(true);
                                }}>
                                    <i className="fas fa-user">Login</i>
                                </ButtonContainer> */}

                                <LoginModal
                                    name="Login"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </Form>
                        )}
                    </Formik >
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

export default Signup;