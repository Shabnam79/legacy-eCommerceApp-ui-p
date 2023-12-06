import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { useParams } from 'react-router-dom';
import { getCategoryService, getProductByProductIdService, saveUpdateProductStore } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import {ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase/config/firebase.config"
import { Col, Image, Row } from 'react-bootstrap';

function EditProducts() {
    const { user } = useContext(userContext);

    const [ProductData, setProductData] = useState({
        category: '',
        categoryId: '',
        title: '',
        price: '',
        quantity:'',
        info: '',
        company: '',
        isStock:true,
        userId: user.userId,
        productId:'',
        img:''
        
    });

    let { productId } = useParams();

    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [ProductIdValue, setProductIdValue] = useState('');
    const [isStockValue, setIsStockValue] = useState(true);
    const [CategoryIdValue, setCategoryIdValue] = useState('');

    //File Upload  State
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        fetchStoreProductData(productId);
        fetchCategorylist();
        GetProductGUID();
        document.title = "Admin - Edit Product"
    }, [user.userId]);

    const [name, setName] = useState({
        category: '',
        categoryId: '',
        company: '',
        info: '',
        price: '',
        title: '',
        isStock:true,
        userId: user.userId,
        productId:'',
        quantity:''
    });

    const fetchCategorylist = async () => {
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
        }
    }

    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
        setSelectedValue(filterCategoryName);
        setCategoryIdValue(id);
    }

    const fetchStoreProductData = async (productId) => {
        if (user.userId) {
            let data = await getProductByProductIdService(productId);
            if (data != undefined) {
                setProductData(data[0]);
                setSelectedValue(data[0].category);
                setCategoryIdValue(data[0].categoryId);
                setIsStockValue(data[0].isStock);
                setProductIdValue(data[0].productId);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProductData((prevName) => ({
            ...prevName,

            categoryId: CategoryIdValue,
            category: selectedValue,
            isStock : isStockValue,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let addToCartProductObj = {
            ...ProductData,
            categoryId: CategoryIdValue,
            category: selectedValue,
            isStock : isStockValue
        };
        
        await saveUpdateProductStore(addToCartProductObj);
        
        toast.success('Product Updated in admin list ', {
            autoClose: 1000,
        });
        uploadFile();
    }

    const handleMediaChange = (e) => {
        setImageUpload(e.target.files);
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);

    };

    const uploadFile = () => {
        if (imageUpload.length == 0) return;
        for (let index = 0; index < imageUpload.length; index++) {
            const imageRef = ref(storage, `ProductImages/${ProductIdValue}/${imageUpload[index].name}`);
            debugger
            uploadBytes(imageRef, imageUpload[index]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    fetchProductDataForImage(ProductIdValue, url);
                });
            });
        }
    };

    const fetchProductDataForImage = async (productId, url) => {
        if (user.userId) {
            let data = await getProductByProductIdService(productId);
            if (data != undefined) {
                let updateImageToProductObj ={
                    category:data[0].category,
                    categoryId:data[0].categoryId,
                    info:data[0].info,
                    company:data[0].company,
                    price:data[0].price,
                    quantity:data[0].quantity,
                    title:data[0].title,
                    isStock:data[0].isStock,
                    id:data[0].id,
                    productId:ProductIdValue,
                    userId:user.userId,
                    img : url,
                };
                saveUpdateProductStore(updateImageToProductObj);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const GetProductGUID = () => {
        // Generate New unique id for Product Id
        const unique_id = uuid();
        setProductIdValue(unique_id);
}

    return (
            <> 
               <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                    <div className="container my-3">
                            <Dropdown title="All Category" onSelect={(e) => fetchProductCategorylist(e)}>
                                <Dropdown.Toggle  id="dropdown-basic">
                                        {selectedValue || 'Select Categories'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {dropdown.map((item) => (
                                        <Dropdown.Item  eventKey={item.id}>{item.Category}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>     
                    </div>
                    <Form.Group className='mb-3' controlId='FormImage'>
                    <Form.Label>Upload Product Image :</Form.Label>
                        <Form.Control
                            type='file'
                            name="img"
                            placeholder='Upload image'
                            multiple accept="image/*"
                            onChange={handleMediaChange}
                        />
                        <div className="container my-3">
                            <Row>
                                <Col xs={6} md={4}>
                                    <img src={ProductData.img}  style={{ width: "10rem", height: "10rem" }} className="img-fluid" alt="product" />
                                </Col>        
                            </Row>
                        </div>
                         {selectedFiles.map((file, index) => (
                                <div key={index}>
                                    <p>Selected File {index + 1}:</p>
                                        {file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(file)} alt="Selected"  rounded style={{ height: "200px", width: "200px" }} />
                                        ) : null}
                                    <button onClick={() => handleFileRemove(index)}>Remove</button>
                                </div>
                        ))} 
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormName'>
                    <Form.Label>Enter Product Name :</Form.Label>
                        <Form.Control
                            type='text'
                            name="title"
                            value={ProductData.title}
                            placeholder='Enter Product Name'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormPrice'>
                    <Form.Label>Enter Product Price :</Form.Label>
                        <Form.Control
                            type='number'
                            name="price"
                            value={ProductData.price}
                            placeholder='Enter product Price'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormQuantity'>
                    <Form.Label>Enter Quantity of Product :</Form.Label>
                        <Form.Control
                            type='number'
                            name="quantity"
                            value={ProductData.quantity}
                            placeholder='Enter Quantity of Product'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormDescription'>
                    <Form.Label>Enter Product Description :</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Product Description..."
                            name="info"
                            value={ProductData.info}
                            onChange={handleInputChange}
                            />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormCompany'>
                    <Form.Label>Enter Product Company :</Form.Label>
                        <Form.Control
                            type='text'
                            name="company"
                            value={ProductData.company}
                            placeholder='Enter Product Company...'
                            required
                            onChange={handleInputChange}
                            />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormisStock'>
                        <div className="container text-left">
                            <div className="row">
                                <div className="col-md-auto">
                                <Form.Label><b>In Stock :</b></Form.Label>
                                </div>
                                <div class="col-md-auto">
                                <Form.Check
                                    type='checkbox'
                                    name="isStock"
                                    checked={isStockValue}
                                    placeholder='Select Stock...'
                                    onChange={(e) => {
                                        debugger
                                        setIsStockValue(e.target.checked)
                                        debugger
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Button type='submit'>Update</Button>
                    
            </Form>
        </>
    )
}



export default EditProducts;