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
 
    const borderHello = { border: "none" };
 
    const navigate = useNavigate();
    const [UserRoleData, setUserRoleData] = useState({
        role: '',
        roleId: '',
        id: '',
        email:'',
        userName:''
 
    });
 
    let { UserRoleId } = useParams();
    const { user } = useContext(userContext);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [RoleIdValue, setRoleIdValue] = useState('');
    const [UserIdValue, setUserIdValue] = useState('');
    const [userNameValue, setUserNameValue] = useState('');
 
    const [name, setName] = useState({
        role: '',
        roleId: '',
        email:'',
        userName:''
    });
 
    useEffect(() => {
        debugger
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
        debugger
        let data = await getUserDataByIdService(UserRoleId);
        if (data != undefined) {
            setUserRoleData(data);
            setSelectedValue(data.role);
            setRoleIdValue(data.roleId);
            setUserIdValue(data.UID);
            setUserNameValue(data.userName);
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
        debugger
        e.preventDefault();
        let addToUserRoleObj = {
            roleId: RoleIdValue,
            role: selectedValue,
            userId: UserIdValue,
            userName : UserRoleData.userName
        };
        await updateRoleUsersService(addToUserRoleObj);

        if (navigate) {
            navigate('/admin/UserList');
        } else {
            console.error('Navigate is not defined or not a function');
        }
    }
 
    return (
        <>
            <div className='container mt-5'>
                <Form className='d-grid gap-2' onSubmit={(e) => handleSubmit(e)}>
                    <div className="my-3">
                        <Form.Group controlId="validationFormik03">
                            <Dropdown title="All Roles" onSelect={(e) => fetchRoleSelectlist(e)}>
                                <Dropdown.Toggle id="dropdown-basic" className='font-weight-bold tx-dropdown' style={{ background: 'rgba(243, 243, 243, 0.24', backdropFilter: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px', ...borderHello, color: 'black' }}>
                                    {selectedValue || 'Select Roles'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu2' style={{ ...borderHello }}>
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
                            className='editusers-input'
                            disabled
                            type='text'
                            name="email"
                            value={UserRoleData.email}
                            placeholder='email'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormUserName'>
                        <Form.Label>User Name :</Form.Label>
                        <Form.Control
                            className='editusers-input'
                            type='text'
                            name="userName"
                            value={UserRoleData.userName}
                            placeholder='userName'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button type='submit' style={{
                        backgroundColor: 'rgb(5, 54, 69)',
                        border: 'none'
                    }}>Update</Button>
                    <Link to={`/admin/UserList`}>
                        <Button className="btn btn-primary mx-3" style={{
                            backgroundColor: 'rgb(5, 54, 69)',
                            border: 'none'
                        }}>Back to User List</Button>
                    </Link>
                </Form>
            </div>
        </>
    )
}
 