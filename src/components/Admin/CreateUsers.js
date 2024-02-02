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
import { Link, useNavigate } from 'react-router-dom';
import { variables } from "../../utils/variables";
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

export default function CreateUsers() {
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [RoleIdValue, setRoleIdValue] = useState('');

    useEffect(() => {
        fetchRolelist();
        document.title = "Admin - Create Users"
    }, []);


    const fetchRolelist = async () => {
        let data = await getRolesService();
        if (data != undefined) {
            setDropdown(data);
        }
    }

    const fetchRoleSelectlist = (id) => {
        let filterRoleName = dropdown.filter(x => x.id == id).map(x => x.role)[0];
        setSelectedValue(filterRoleName);
        setRoleIdValue(id);
    }

    const authentication = (values, { resetForm }) => {
        const payload = {
            email : values.email,
            password : values.password,
            role : selectedValue,
            roleId : RoleIdValue,
            isActive:true
        }

        axios({
            method: 'post',
            url: variables.API_URL + 'User/AddUser',
            data: payload, 
        }).then(function (response) {
            debugger
            toast.success(`User Detail Added Successfully`, {
                autoClose: 3000,
            });
        }).catch((error) => {
            toast.error(error.message, {
                autoClose: 1000,
            });
        });
        navigate('/admin/UserList');
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
                                                <Dropdown.Item key={item.id} eventKey={item.id}>{item.role}</Dropdown.Item>
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
