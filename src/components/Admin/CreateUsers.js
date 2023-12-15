import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState, useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";
import {collection, addDoc} from "firebase/firestore";
import { db } from "../../firebase/config/firebase.config";
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { getRolesService } from '../../firebase/services/user.service';
import userContext from '../../utils/userContext';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(6, 'Must be grater than 6 characters')
        .max(10, 'Must be less than or equal to 10 characters')
        .required(),
});

export default function CreateUsers() {

    const { user } = useContext(userContext);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [RoleIdValue, setRoleIdValue] = useState('');

    const usersCollectionRef = collection(db,"userroles");

    useEffect(() => {
        fetchRolelist();
        document.title = "Admin - Create Users"
    }, [user.userId]);


    const fetchRolelist = async () => {
        let data = await getRolesService();
        if (data != undefined) {
            setDropdown(data);
        }
    }

    const fetchRoleSelectlist = (id) => {
        let filterRoleName = dropdown.filter(x => x.id == id).map(x => x.roles)[0];
        setSelectedValue(filterRoleName);
        setRoleIdValue(id);
    }


    const authentication = (values, { resetForm }) => {
        const getAuthentication = getAuth();
        createUserWithEmailAndPassword(getAuthentication, values.email, values.password)
            .then((res) => {

                addDoc(usersCollectionRef,{
                    UID: res.user.uid,
                    email: values.email,
                    role : selectedValue,
                    roleId : RoleIdValue,
                    isActive :"true",
                    })

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
    <div style={{ margin: "3rem" }}>
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

                                <div className="container my-3">
                                    <Form.Group controlId="validationFormik03">
                                        <Dropdown title="All Roles" onSelect={(e) => fetchRoleSelectlist(e)}>
                                            <Dropdown.Toggle  id="dropdown-basic">
                                                {selectedValue || 'Select Roles'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            {dropdown.map((item) => (
                                                <Dropdown.Item  eventKey={item.id}>{item.roles}</Dropdown.Item>
                                            ))}
                                            </Dropdown.Menu>
                                        </Dropdown> 
                                        
                                    </Form.Group>    
                                </div>

                                <Form.Group controlId="validationFormik01">
                                    <Form.Label >Email</Form.Label>
                                    <Form.Control  
                                        type="email"
                                        placeholder="Enter email..."
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="validationFormik02">
                                    <Form.Label >Password</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="******"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password} 
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br></br>
                                <Button  type="submit">
                                    <span>Sign Up</span>
                                </Button>
                                 
                                <Link to={`/admin/UserList`}>
                                    <Button className="btn btn-primary mx-3">Back to User List</Button>
                                </Link>
                                
                            </Form>
                        )}
                    </Formik >
                </Col>
                <Col></Col>
            </Row>
            </div>
        </>
  );
}
