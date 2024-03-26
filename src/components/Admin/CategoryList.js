import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    DeleteCategoryByIdService,
    getAllCategoryService
} from '../../firebase/services/category.service';
import userContext from "../../utils/userContext.js";
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';


export default function CategoryList() {
    const { user } = useContext(userContext);
    const [CategoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStoreCategoryData();
        document.title = "Admin - Category List"
    }, []);

    const fetchStoreCategoryData = async () => {

        let data = await getAllCategoryService();
        if (data != undefined) {
            setCategoryData(data);
            setLoading(false);
        }
    }

    const removeCategoryHandler = async (item) => {
        try {
            await DeleteCategoryByIdService(item);

            toast.warning(
                `Category removed from the List`,
                {
                    autoClose: 1000,
                }
            );
            fetchStoreCategoryData();
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className="container mt-5">
                    <div className="d-flex flex-column">
                        <Link className='mb-3' to='/admin/AddCategories'>
                            <Button style={{
                                backgroundColor: 'rgb(5, 54, 69)',
                                border: 'none'
                            }}>Add Category</Button>
                        </Link>
                        <Table striped bordered hover size='sm' style={{ width: '500px' }}>
                            <thead>
                                <tr>
                                    <th>CATEGORY</th>
                                    <th className="d-flex justify-content-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CategoryData && CategoryData.length > 0 ? CategoryData.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.Category}</td>
                                                <td className="d-flex justify-content-center">
                                                    <Link to={`/admin/EditCategory/${item.id}`}>
                                                        <Button className="mr-2" size='sm' style={{
                                                            backgroundColor: 'rgb(5, 54, 69)',
                                                            border: 'none'
                                                        }}>EDIT</Button>
                                                    </Link>
                                                    <Button className="ml-2" size='sm' variant="outline-danger" data-testid={`delete-button-${item.id}`} onClick={() => removeCategoryHandler(item)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    )
}
