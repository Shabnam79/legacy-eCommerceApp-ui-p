import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { useParams } from 'react-router-dom';
import { getCategoryServiceByUserId, updateCategoryIntoProductCategoryService } from '../../firebase/services/category.service';
import { Link } from 'react-router-dom';


export default function EditCategory() {

  const { user } = useContext(userContext);
  const [CategoryData, setCategoryData] = useState("");
  let { categoryId } = useParams();


  useEffect(() => {
      fetchProductCategoryData(categoryId);
  }, [user.userId]);

  const fetchProductCategoryData = async (categoryId) => {
      if (user.userId) {
          let data = await getCategoryServiceByUserId(user.userId);
          if (data != undefined) {
           
          let filteredCategoryData = data.filter(x => x.id == categoryId).map(x => x.Category)[0];
            setCategoryData(filteredCategoryData);
          }
      } else {
          console.log("Please login to see past Cart category");
      }
  }


  const handleInputChange = (event) => {
        setCategoryData(event.target.value);
  };


  const handleSubmit = async (e) => {
      e.preventDefault();

      if (user.userId) {
        let data = await getCategoryServiceByUserId(user.userId);
        if (data != undefined) {
           
        let filteredCategoryData = data.filter(x => x.Category.toUpperCase() == CategoryData.toUpperCase()).map(x => x.id)[0];
           if (filteredCategoryData == undefined) {
               await updateCategoryIntoProductCategoryService(CategoryData, categoryId,user.userId);
                toast.success('Category updated in admin list', {
                    autoClose: 1000,
                });
            }
            else{
                toast.warning('Category already added in admin list ', {
                    autoClose: 3000,
                });
                return;
            }
        }
    } else {
        console.log("Please login to see past Cart category");
    } 
  }

  return (
            <> 
                <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                   
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='text'
                            name="category"
                            value={CategoryData}
                            placeholder='Enter Category Name'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    
                    <Button type='submit'>Update</Button>
                    <Link to={`/admin/CategoryList`}>
                    <Button className="btn btn-primary mx-3">Back to Category List</Button>
                </Link>
                </Form>
          </>
  )
}
