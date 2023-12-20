import React, { useContext, useEffect, useState } from 'react';
import { getUserData, updateIsActiveUsersService } from '../../firebase/services/user.service.js';
import userContext from "../../utils/userContext.js";
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { toast } from "react-toastify";

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
                debugger
                setUserData(data);
            }
    }

    const UserActive = async (item) => {
  
        try {
                if(item.isActive == "true")
                {
                    alert("Please click Ok to make your Account Inactive.");
                    await updateIsActiveUsersService(item.id ,"false");
                        toast.warning(
                            `User Account has been Inactive.`,
                            {
                                autoClose: 1000,
                            }
                        );
                }
                else{
                    alert("Please click Ok to make your Account Active.");
                    await updateIsActiveUsersService(item.id ,"true");
                        toast.warning(
                            `User Account has been Active.`,
                            {
                                autoClose: 1000,
                            }
                        );
                }
                fetchUserData();
        }
        catch (e) {
            console.log(e);
        }
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
