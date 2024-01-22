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
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const borderHello={border:"none"};
    const stylingLoginButton={
        color: 'white',
        backgroundColor: 'black',
        border: '1px solid #6855e0'
      };
    const loginButtonTrans= {
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
    // if (auth != null)
    //     if (auth.currentUser != null)
    //         if (auth.currentUser.uid != null)
    //             console.log("myauth2", auth.currentUser.uid);

    const authentication = (values) => {
        debugger
        const payload = {
            email : values.email,
            password : values.password
        }

        axios({
            method: 'post',
            url: variables.API_URL + 'Auth/Login',
            data: payload, 

        }).then(function(response) {
            debugger
            console.log(response.localId);
            let userData = {
                            userId: response.data.localId,
                            email: response.data.email
                        };
        
                        setItem("user", JSON.stringify(userData));
        
                        setUser({
                            ...user,
                            userId: response.data.localId,
                            email: response.data.email
                        });


            }).catch((error) => {
                debugger
                    console.log(error.code);
                    if (error.code === "ERR_BAD_REQUEST") {
                        toast.error("Invalid login credentials.", {
                            autoClose: 1000,
                        });
                    }
                    // if (error.code === "auth/wrong-password") {
                    //     toast.error("Please check the password", {
                    //         autoClose: 1000,
                    //     });
                    // } else if (error.code === "auth/user-not-found") {
                    //     toast.error("Please check the email", {
                    //         autoClose: 1000,
                    //     });
                    // } else if (error.code === "auth/invalid-login-credentials") {
                    //     toast.error("invalid-login-credentials", {
                    //         autoClose: 1000,
                    //     });
                    // }
            });



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
            <Row>
                <Col></Col>
                <Col>
                    {/* <h2>Login</h2> */}
                    <Formik
                        validationSchema={schema}
                        onSubmit={authentication}
                        // onSubmit={(e) => {
                        //     const data = { email: e.email, password: e.password };
                        //     alert(JSON.stringify(data));
                        // }}
                        initialValues={{
                            email: 'noorsre@gmail.com',
                            password: '12345678',
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

                                    <Form.Control style={{...fontsize,...fontfamily}}
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

                                    <Form.Control
                                        type="text" style={{...fontsize,...fontfamily}}
                                        placeholder="******"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        { errors.password}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                {/* <Button
                                    type="submit"
                                    style={{ marginTop: "10px", background: "#fc8019", border: "#fc8019" }}
                                // onClick={() => authentication()}
                                >Login</
                                Button> */}

                                <button style={{...fontfamily,marginLeft:'50x',...stylingLoginButton,...loginButtonTrans}} type="submit">
                                    <span style={{...fontfamily}}>Login</span>
                                </button>                         

                                <LoginModal
                                    name="Signup"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)} 
                                    
                                /><br></br>
                                <br></br>
                                   <span style={{fontSize:'14px',...fontfamily,margin:'45px'}}>New User ? </span>
                                 <span onClick={(e) => {
                                    e.preventDefault();
                                    setModalShow(true);
                                }}><span style={{fontSize:'15px',...fontfamily,margin:'-45px',color:'blue',fontWeight:'lightblue',cursor:'pointer'}}>Click Here</span>
                                </span>
                            </Form>
                        )}
                    </Formik >
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

export default Login;