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
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQueryUser, setSearchQueryUser] = useState('');

    const productsPerPage = variables.PAGINATION_UserListAdmin.PRODUCTS_PER_PAGE;

    useEffect(() => {
        fetchUserData(currentPage, productsPerPage, searchQueryUser);
        document.title = "Admin - User Management"
    }, [user.userId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchUserData = async (currentPage, productsPerPage, searchQueryUser) => {

        if (user.userId) {
            setTimeout(async () => {
                let data = await getUserData(currentPage, productsPerPage, searchQueryUser);
                const details = data.data;
                if (details != undefined) {
                    setUserData(details);
                    setTotalPage(data.totalPages);
                    setCurrentPage(data.pageNumber);
                    setSearchQueryUser(data.searchKeyword);
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
            await axios.delete(variables.API_URL_NEW + `Admin/UpdateUserStatus?id=${item.id}`)
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
            await axios.delete(variables.API_URL_NEW + `Admin/UpdateUserStatus?id=${item.id}`)
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
        fetchUserData(currentPage, productsPerPage, searchQueryUser);
    };

    const setPageNumber = async (item) => {
        try {
            setLoading(true);
            setTimeout(async () => {
                fetchUserData(item, productsPerPage, searchQueryUser);

            }, 1000);
        }
        catch (e) {
            console.log(e);
        }
    };

    const setSearching = async (Searchitem) => {
        try {
            fetchUserData(currentPage, productsPerPage, Searchitem);
        }
        catch (e) {
            console.log(e);
        }
    };


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
                            <input type='text' className='searchbar-input mb-3' placeholder='Search User...' onChange={(e) => setSearching(e.target.value)} />
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
                                    UserData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.userName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.roleName}</td>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-end w-100 mr-1'>
                                                    <Link to={`/admin/EditUsers/${item.email}`}>
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
                    <div className='w-100'>
                        <ul className="pagination justify-content-center">
                            {
                                Array.from({ length: totalPage }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                        <button onClick={() => setPageNumber(i + 1)} className="pagination-button">
                                            {i + 1}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    );
}