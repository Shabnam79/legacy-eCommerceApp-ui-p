import React, { useContext, useEffect, useState } from 'react';
import { getUserData, updateIsActiveUsersService } from '../../firebase/services/user.service.js';
import userContext from "../../utils/userContext.js";
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { toast } from "react-toastify";
import { variables } from "../../utils/variables";
import axios from 'axios';

export default function UserList() {

    const { user } = useContext(userContext);
    const [UserData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
        document.title = "Admin - User Management"
    }, []);

    const fetchUserData = async () => {
        let data = await getUserData();
        if (data != undefined) {
            setUserData(data);
        }
    }

    const UserActive = async (item) => {
        console.log(item);
        debugger;
        const payload = {
            userId: item.UID,
            isActive: item.isActive
        }
        axios({
            method: 'put',
            url: variables.API_URL + 'User/UpdateIsActive',
            data: payload
        })
            .then(function (response) {
                console.log(response.data);
                toast.success(`Is Active Status is Updated Successfully`, {
                    autoClose: 3000,
                });
            }).catch((error) => {
                toast.error(error.message, {
                    autoClose: 1000,
                });
            });
    };

    return (
        <>
            <div style={{ margin: "7rem" }}>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>
                                Email
                            </th>
                            <th>
                                Role
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserData && UserData.length > 0 ?

                                UserData.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.email}
                                            </td>

                                            <td>
                                                {item.role}
                                            </td>

                                            <td>
                                                <Link to={`/admin/EditUsers/${item.UID}`}>
                                                    <Button>EDIT</Button>
                                                </Link>

                                                <Button onClick={() => UserActive(item)}>{item.isActive == "true" ? "Active" : "Inactive"}</Button>
                                            </td>

                                        </tr>
                                    )

                                }) : null
                        }
                    </tbody>
                </Table>
                <br></br>
                <Link className='d-grid gap-2' to='/admin/CreateUsers'>
                    <Button size="lg">Create User</Button>
                </Link>
            </div>
        </>
    );
}
