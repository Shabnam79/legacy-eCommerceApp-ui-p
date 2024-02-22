import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { useParams } from 'react-router-dom';
import { getCategoryByCategoryIdService, updateCategoryIntoProductCategoryService } from '../../firebase/services/category.service';
import { Link, useNavigate } from 'react-router-dom';


export default function EditCategory() {

    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const [CategoryData, setCategoryData] = useState("");
    let { categoryId } = useParams();


    useEffect(() => {
        fetchProductCategoryData(categoryId);
        document.title = "Admin - Edit Category"
    }, []);

    const fetchProductCategoryData = async (categoryId) => {

        let data = await getCategoryByCategoryIdService(categoryId);
        if (data != undefined) {
            setCategoryData(data);
        }
    }

    const handleInputChange = (event) => {
        setCategoryData(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateCategoryIntoProductCategoryService(CategoryData, categoryId, user.userId);
        toast.success('Category updated in admin list', {
            autoClose: 1000,
        });
        navigate('/admin/CategoryList');
    }

    return (
        <>
            <div className='container mt-5'>
                <Form className='d-grid gap-2' onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            className='editcategory-input'
                            type='text'
                            name="category"
                            value={CategoryData}
                            placeholder='Enter Category Name'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button type='submit' style={{
                        backgroundColor: 'rgb(5, 54, 69)',
                        border: 'none'
                    }}>Update</Button>
                    <Link to={`/admin/CategoryList`}>
                        <Button className="btn btn-primary mx-3" style={{
                            backgroundColor: 'rgb(5, 54, 69)',
                            border: 'none'
                        }}>Back to Category List</Button>
                    </Link>
                </Form>
            </div>
        </>
    )
}
