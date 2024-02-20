import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState, useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config/firebase.config";
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { getRolesService } from '../../firebase/services/user.service';
import userContext from '../../utils/userContext';
import { Link, useNavigate } from 'react-router-dom';
import { createUsersService } from '../../firebase/services/user.service';

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
    const borderHello = { border: "none" };
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
            email: values.email,
            password: values.password,
            role: selectedValue,
            roleId: RoleIdValue,
            isActive: true
        }
        createUsersService(payload);
        navigate('/admin/UserList');
    }

    return (
        <>
            <div className='container mt-4'>
                <div>
                    <Col>
                        <Formik
                            validationSchema={schema}
                            onSubmit={authentication}
                            initialValues={{
                                email: '',
                                password: '',
                            }}>
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

                                    <div className="my-3">
                                        <Form.Group controlId="validationFormik03">
                                            <Dropdown title="All Roles" onSelect={(e) => fetchRoleSelectlist(e)}>
                                                <Dropdown.Toggle id="dropdown-basic" className='font-weight-bold tx-dropdown' style={{ background: 'rgba(243, 243, 243, 0.24', backdropFilter: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px', ...borderHello, color: 'black' }}>
                                                    {selectedValue || 'Select Roles'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu2' style={{ ...borderHello }}>
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
                                            className='userlist-input'
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
                                            className='userlist-input'
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
                                    <div className='mt-3'>
                                        <Button type="submit" style={{
                                            backgroundColor: 'rgb(5, 54, 69)',
                                            border: 'none'
                                        }}>
                                            <span>Sign Up</span>
                                        </Button>
                                        <Link to={`/admin/UserList`}>
                                            <Button className="btn btn-primary mx-3" style={{
                                                backgroundColor: 'rgb(5, 54, 69)',
                                                border: 'none'
                                            }}>Back to User List</Button>
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik >
                    </Col>
                </div>
            </div>
        </>
    );
}
