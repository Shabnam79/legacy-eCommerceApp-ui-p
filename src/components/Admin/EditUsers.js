import Form from 'react-bootstrap/Form';
import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { getRolesService, getUserDataByIdService, updateRoleUsersService } from '../../firebase/services/user.service';
import userContext from '../../utils/userContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function EditUsers() {
    const navigate = useNavigate();
    const [UserRoleData, setUserRoleData] = useState({
        role: '',
        roleId: '',
        id: ''

    });

    let { UserRoleId } = useParams();
    const { user } = useContext(userContext);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [RoleIdValue, setRoleIdValue] = useState('');
    const [UserIdValue, setUserIdValue] = useState('');

    const [name, setName] = useState({
        role: '',
        roleId: ''
    });

    useEffect(() => {
        fetchUserData(UserRoleId);
        fetchRolelist();
        document.title = "Admin - Edit Users"
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

    const fetchUserData = async (UserRoleId) => {
        let data = await getUserDataByIdService(UserRoleId);
        if (data != undefined) {
            setUserRoleData(data[0]);
            setSelectedValue(data[0].role);
            setRoleIdValue(data[0].roleId);
            setUserIdValue(data[0].UID);
        }
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserRoleData((prevName) => ({
            ...prevName,

            roleId: RoleIdValue,
            role: selectedValue,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let addToUserRoleObj = {
            roleId: RoleIdValue,
            role: selectedValue,
            userId: UserIdValue
        };
        await updateRoleUsersService(addToUserRoleObj);

        // toast.success('Role Updated in admin list ', {
        //     autoClose: 1000,
        // });
        if (navigate) {
            navigate('/admin/UserList');
        } else {
            console.error('Navigate is not defined or not a function');
        }
    }

    return (
        <>
            <Form className='d-grid gap-2' style={{ margin: '10rem' }} onSubmit={(e) => handleSubmit(e)}>
                <div className="container my-3">
                    <Form.Group controlId="validationFormik03">
                        <Dropdown title="All Roles" onSelect={(e) => fetchRoleSelectlist(e)}>
                            <Dropdown.Toggle id="dropdown-basic">
                                {selectedValue || 'Select Roles'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {dropdown.map((item) => (
                                    <Dropdown.Item eventKey={item.id}>{item.role}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Form.Group>
                </div>

                <Form.Group className='mb-3' controlId='FormEmail'>
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                        disabled
                        type='text'
                        name="email"
                        value={UserRoleData.email}
                        placeholder='email'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button type='submit'>Update</Button>
                <Link to={`/admin/UserList`}>
                    <Button className="btn btn-primary mx-3">Back to User List</Button>
                </Link>
            </Form>
        </>
    )
}
