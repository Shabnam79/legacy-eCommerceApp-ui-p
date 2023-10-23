import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { saveProductIntoCartService } from '../../firebase/services/cart.service';
import { toast } from "react-toastify";



function AddProducts() {
    const [name, setName] = useState({
        category: '',
        img: '',
        name: '',
        price: '',
        quantity: '',
        description: ''
    });



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



        let addToCartProductObj = {
            ...name
        };



        let docRef = await saveProductIntoCartService(addToCartProductObj);



        console.log("Document written with ID: ", docRef.id);



        toast.success('Product added in admin list ', {
            autoClose: 1000,
        });
    }



    return (
        <>
            <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className='mb-3' controlId='FormCategory'>
                    <Form.Control
                        type='text'
                        name="category"
                        value={name.category}
                        placeholder='Enter category'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormImage'>
                    <Form.Control
                        type='text'
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
                        type='text'
                        name="price"
                        value={name.price}
                        placeholder='Enter product Price'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormQuantity'>
                    <Form.Control
                        type='text'
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