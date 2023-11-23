import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveProductIntoStoreProductService, getCategoryService } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';


function AddProducts() {
    const { user } = useContext(userContext);

    const [name, setName] = useState({
        category: '',
        categoryId: '',
        company: '',
        count: '',
        img: '',
        inCart: '',
        inWishlist: '',
        info: '',
        price: '',
        title: '',
        total: '',
        userId: user.userId,
        productId:''
    });

     {/* Added code for Category dropdown bind - By noor */}
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setName((prevName) => ({

            ...prevName,

            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();
debugger
        let addToCartProductObj = {
            ...name
        };

        let docRef = await saveProductIntoStoreProductService(addToCartProductObj);
        console.log("Document written with ID: ", docRef.id);
        toast.success('Product added in admin list ', {
            autoClose: 1000,
        });
    }

    {/* Added code for Category dropdown bind - By Noor */}
    useEffect(() => {
        fetchCategorylist();
    }, []);

    const fetchCategorylist = async () => {
        let data = await getCategoryService();
        console.log(data);
        if (data != undefined) {
            setDropdown(data);
        }
    }
    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.map(x => x.Category)[0];
        setSelectedValue(filterCategoryName);
        
    }

    return (
        <>
            <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                <div className="container my-3">
                    {/* Added code for Category dropdown bind - By noor */}
                    
                    <Dropdown title="All Category" onSelect={(e) => fetchProductCategorylist(e)}>
                        <Dropdown.Toggle  id="dropdown-basic">
                            {selectedValue || 'Select Category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {dropdown.map((item) => (
                            <Dropdown.Item eventKey={item.id}>{item.Category}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>     
                </div>

                <Form.Group className='mb-3' controlId='FormImage'>
                    <Form.Control
                        type='file'
                        name="img"
                        value={name.img}
                        placeholder='Upload image'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormName'>
                    <Form.Control
                        type='text'
                        name="name"
                        value={name.name}
                        placeholder='Enter Product Name'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormPrice'>
                    <Form.Control
                        type='number'
                        name="price"
                        value={name.price}
                        placeholder='Enter product Price'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormQuantity'>
                    <Form.Control
                        type='number'
                        name="quantity"
                        value={name.quantity}
                        placeholder='Enter Quantity of Product'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormDescription'>
                    <Form.Control
                        type='text'
                        name="description"
                        value={name.description}
                        placeholder='Enter Product Description'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </>
    )
}



export default AddProducts;