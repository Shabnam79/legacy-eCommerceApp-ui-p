import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from 'react';
import { Button, button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteRecordFromFirebaseService, 
    getCategoryServiceByUserId, 
    getCategoryByIdService } from '../../firebase/services/category.service';
import userContext from "../../utils/userContext.js";
import { toast } from "react-toastify";


export default function CategoryList() {
  
    const { user } = useContext(userContext);
    const [CategoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchStoreCategoryData();
    }, [user.userId]);

    const fetchStoreCategoryData = async () => {
        
        if (user.userId) {
            let data = await getCategoryServiceByUserId(user.userId);
            if (data != undefined) {
                setCategoryData(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const removeCategoryHandler = async (item) => {

        debugger
        try {
            const deleteStroeProcduct= await getCategoryByIdService(item.id);
            await deleteRecordFromFirebaseService(deleteStroeProcduct);

            toast.warning(
                `Ctaegory removed from the List`,
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
                                                {item.category}
                                            </td>
                                            <td>
                                                <Link to={`/admin/EditCategory/${item.id}`}>
                                                    <Button className="btn btn-primary mx-3">EDIT</Button>
                                                </Link>
                                                <Button className="btn btn-primary" onClick={() => removeCategoryHandler(item)}>DELETE</Button>
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
