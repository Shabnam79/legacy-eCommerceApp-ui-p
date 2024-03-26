import React, { useContext, useEffect, useState } from 'react';
import { getUserData } from '../../firebase/services/user.service.js';
import userContext from "../../utils/userContext.js";
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

export default function UserList() {

    const { user } = useContext(userContext);
    const [UserData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchUserData();
        document.title = "Admin - User Management"
    }, [user.userId]);

    const fetchUserData = async () => {
        if (user.userId) {
            setTimeout(async () => {
                let data = await getUserData();
                if (data != undefined) {
                    setUserData(data);
                    setLoading(false);
                }
            }, 5000);
        } else {
            console.log("Please login to see past orders");
        }
    }

    const UserActive = async (item) => {
        if (item.isActive == true) {
            alert("Please click Ok to make your Account Inactive.");
            await axios.put(variables.API_URL + `User/UpdateIsActive?userId=${item.UID}&isActive=${false}`)
                .then(function (response) {
                    toast.success(`User Active status is Updated Successfully`, {
                        autoClose: 3000,
                    });
                }).catch((error) => {
                    toast.error(error.message, {
                        autoClose: 1000,
                    });
                });
        }
        else {
            alert("Please click Ok to make your Account Active.");
            await axios.put(variables.API_URL + `User/UpdateIsActive?userId=${item.UID}&isActive=${true}`)
                .then(function (response) {
                    toast.success(`User Active status is Updated Successfully`, {
                        autoClose: 3000,
                    });
                }).catch((error) => {
                    toast.error(error.message, {
                        autoClose: 1000,
                    });
                });
        }
        fetchUserData();
    };

    const filteredUserData = UserData ? UserData.filter(item =>
        (item.email && item.email.toLowerCase().includes(searchInput.toLowerCase()))
    ) : [];

    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className='container mt-5'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex justify-content-between'>
                            <Link className='d-grid gap-2' to='/admin/CreateUsers'>
                                <Button className="mb-3" style={{
                                    backgroundColor: 'rgb(5, 54, 69)',
                                    border: 'none'
                                }}>Create User</Button>
                            </Link>
                            <input type='text' className='searchbar-input mb-3' placeholder='Search User...' onChange={(e) => setSearchInput(e.target.value)} />
                        </div>
                        <Table striped bordered hover size='sm'>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th className='d-flex justify-content-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredUserData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.userName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-end w-100 mr-1'>
                                                    <Link to={`/admin/EditUsers/${item.UID}`}>
                                                        <Button style={{
                                                            backgroundColor: 'rgb(5, 54, 69)',
                                                            border: 'none'
                                                        }}>EDIT</Button>
                                                    </Link>
                                                </div>
                                                <div className='d-flex justify-content-start w-100 ml-1'>
                                                    <Button style={{
                                                        backgroundColor: 'rgb(5, 54, 69)',
                                                        border: 'none'
                                                    }} onClick={() => UserActive(item)}>{item.isActive == true ? "Active" : "Inactive"}</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    );
}