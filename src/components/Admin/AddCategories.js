import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveCategoryIntoProductCategoryService, getCategoryByCategoryIdService } from '../../firebase/services/category.service';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

export default function AddCategories() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const [name, setName] = useState({
        Category: ''
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Admin - Add Category"
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setName(() => ({
            [name]: value,
            //userId: user.userId
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        let addToCategoryObj = {
            ...name
        };

        let docRef = await saveCategoryIntoProductCategoryService(addToCategoryObj);
        setLoading(false);
        toast.success('Category added in admin list ', {
            autoClose: 1000,
        });
        name.Category = '';
        navigate('/admin/CategoryList');
    }

    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className='container mt-5'>
                    <Form className='d-grid gap-2' onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className='mb-3' controlId='FormCategory'>
                            <Form.Control
                                type='text'
                                className='addcategories-input'
                                name="name"
                                value={name.Category}
                                placeholder='Enter Category Name'
                                required
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button style={{
                            backgroundColor: 'rgb(5, 54, 69)',
                            border: 'none'
                        }} type='submit'>Submit</Button>
                        <Link to={`/admin/CategoryList`}>
                            <Button style={{
                                backgroundColor: 'rgb(5, 54, 69)',
                                border: 'none'
                            }} className='ml-3'>Back to Category List</Button>
                        </Link>
                    </Form>
                </div>
            </LoadingOverlay>
        </>

    )
}
