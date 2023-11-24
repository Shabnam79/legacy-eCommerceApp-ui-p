import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveCategoryIntoProductCategoryService } from '../../firebase/services/category.service';
import { Link } from 'react-router-dom';

export default function AddCategories() {
  
    const { user } = useContext(userContext);
    const [name, setName] = useState({
        category: ''
    });
   
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setName(() => ({
        
            [name]: value,
            userId: user.userId

        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let addToCategoryObj = {
            ...name
        };
        console.log(addToCategoryObj);
        let docRef = await saveCategoryIntoProductCategoryService(addToCategoryObj);
        console.log("Document written with ID: ", docRef.id);
        toast.success('Category added in admin list ', {
            autoClose: 3000,
        });
        name.category = '';
    }
  
    return (
        <>
            <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                
                <Form.Group className='mb-3' controlId='FormCategory'>
                    <Form.Control
                        type='text'
                        name="category"
                        value={name.category}
                        placeholder='Enter Category Name'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                
                <Button type='submit'>Submit</Button>
                <Link to={`/admin/CategoryList`}>
                    <Button className="btn btn-primary mx-3">Back to Category List</Button>
                </Link>
            </Form>
        </>
        
  )
}
