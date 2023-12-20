import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveCategoryIntoProductCategoryService, getCategoryServiceByUserId } from '../../firebase/services/category.service';
import { Link, useNavigate } from 'react-router-dom';

export default function AddCategories() {
  
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const [name, setName] = useState({
        Category: ''
    });
   
    useEffect(() => {
        document.title = "Admin - Add Category"
    }, []);


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
        
            let data = await getCategoryServiceByUserId(user.userId);
            if (data != undefined) {
            let filteredCategoryData = data.filter(x => x.Category.toUpperCase() == addToCategoryObj.Category.toUpperCase()).map(x => x.id)[0];
               if (filteredCategoryData == undefined) {

                    let docRef = await saveCategoryIntoProductCategoryService(addToCategoryObj);
                    console.log("Document written with ID: ", docRef.id);
                    toast.success('Category added in admin list ', {
                                autoClose: 1000,
                        });
                    name.Category = '';
                }
                else{

                    toast.warning('Category already added in admin list ', {
                        autoClose: 3000,
                    });
                    return;
                }
            }
            navigate('/admin/CategoryList');
    }
  
    return (
        <>
            <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                
                <Form.Group className='mb-3' controlId='FormCategory'>
                    <Form.Control
                        type='text'
                        name="Category"
                        value={name.Category}
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
