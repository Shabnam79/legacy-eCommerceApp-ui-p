import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from 'react';
import { Button, button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
<<<<<<< HEAD
    DeleteCategoryByIdService,
    getCategoryServiceByUserId,
    getCategoryByIdService,
    getCategoryByCategoryIdService
=======
    deleteRecordFromFirebaseService,
    getAllCategoryService
>>>>>>> 215c4cf078f478c9e87a07bc89bb1ae909523ec3
} from '../../firebase/services/category.service';
import userContext from "../../utils/userContext.js";
import { toast } from "react-toastify";


export default function CategoryList() {
    const { user } = useContext(userContext);
    const [CategoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchStoreCategoryData();
        document.title = "Admin - Category List"
    }, []);

    const fetchStoreCategoryData = async () => {
       
            let data = await getAllCategoryService();
            if (data != undefined) {
                setCategoryData(data);
            }
    }

    const removeCategoryHandler = async (item) => {
        try {
<<<<<<< HEAD
            debugger
                let CategoryAlreadyExistInProduct_Data = await getCategoryByCategoryIdService(item.id);
                console.log(CategoryAlreadyExistInProduct_Data[0]);
                if (CategoryAlreadyExistInProduct_Data[0] != undefined) 
                {
                    toast.warning(
                        `Category already exist into product List`,
                        {
                            autoClose: 1000,
                        }
                    );
                }
                else
                {
                    debugger
                    const deleteCategory = await getCategoryByIdService(item.id);
                    await DeleteCategoryByIdService(deleteCategory);
=======
                //let CategoryAlreadyExistInProduct_Data = await getCategoryByCategoryIdService(item.id);
                // if (CategoryAlreadyExistInProduct_Data[0] == undefined) 
                // {
                //     toast.warning(
                //         `Category already exist into product List`,
                //         {
                //             autoClose: 1000,
                //         }
                //     );
                // }
                // else
                // {
                   // const deleteCategory = await getCategoryByCategoryIdService(item.id);
                    await deleteRecordFromFirebaseService(item);
>>>>>>> 215c4cf078f478c9e87a07bc89bb1ae909523ec3

                    toast.warning(
                            `Category removed from the List`,
                            {
                                autoClose: 1000,
                            }
                        );
                //}
            fetchStoreCategoryData();
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <div style={{ margin: "10rem" }}>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>
                                CATEGORY
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            CategoryData && CategoryData.length > 0 ?

                                CategoryData.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.Category}
                                            </td>
                                            <td>
                                                <Link to={`/admin/EditCategory/${item.id}`}>
                                                    <Button className="btn btn-primary mx-3">EDIT</Button>
                                                </Link>
                                                <Button className="btn btn-primary" data-testid={`delete-button-${item.id}`} onClick={() => removeCategoryHandler(item)}>DELETE</Button>
                                            </td>

                                        </tr>
                                    )

                                }) : null
                        }
                    </tbody>
                </Table>
                <br></br>
                <Link className='d-grid gap-2' to='/admin/AddCategories'>
                    <Button size="lg">Add Category</Button>
                </Link>
            </div>
        </>

    )
}
