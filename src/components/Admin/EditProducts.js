import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { useParams } from 'react-router-dom';
import { getCategoryService, getProductByProductIdService, saveUpdateProductStore } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase/config/firebase.config"
import { Col, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
 
function EditProducts() {
 
    const borderHello = { border: "none" };
 
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    const [ProductData, setProductData] = useState({
        category: '',
        categoryId: '',
        title: '',
        price: '',
        quantity: '',
        info: '',
        company: '',
        isStock: true,
        userId: user.userId,
        productId: '',
        count: 0
 
    });
 
    let { productId } = useParams();
 
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [idValue, setIdValue] = useState('');
    const [isStockValue, setIsStockValue] = useState(true);
    const [CategoryIdValue, setCategoryIdValue] = useState('');
 
    //File Upload  State
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
 
    useEffect(() => {
        fetchStoreProductData(productId);
        fetchCategorylist();
        //GetProductGUID();
        document.title = "Admin - Edit Product"
    }, [user.userId]);
 
    const [name, setName] = useState({
        category: '',
        categoryId: '',
        company: '',
        info: '',
        price: '',
        title: '',
        isStock: true,
        userId: user.userId,
        productId: '',
        quantity: '',
        count: 0,
        id: ''
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
 
        let data = await getProductByProductIdService(productId);
        if (data != undefined) {
            setProductData(data);
            setSelectedValue(data.category);
            setCategoryIdValue(data.categoryId);
            setIsStockValue(data.isStock);
            setIdValue(data.id);
            setImageUrls(data.img);
        }
    }
 
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProductData((prevName) => ({
            company: prevName.company,
            info: prevName.info,
            price: prevName.price,
            title: prevName.title,
            isStock: prevName.isStock,
            userId: user.userId,
            productId: prevName.productId,
            quantity: prevName.quantity,
            count: prevName.count,
            categoryId: CategoryIdValue,
            category: selectedValue,
            isStock: isStockValue,
            [name]: value
        }));
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let addToCartProductObj = {
            company: ProductData.company,
            info: ProductData.info,
            price: ProductData.price,
            title: ProductData.title,
            isStock: ProductData.isStock,
            userId: user.userId,
            productId: ProductData.productId,
            quantity: ProductData.quantity,
            count: ProductData.count,
            categoryId: CategoryIdValue,
            category: selectedValue,
            isStock: isStockValue,
            id: idValue
        };
        debugger
        if (!imageUpload || imageUpload.length == 0) {
            await saveUpdateProductStore(addToCartProductObj);
        }
        else {
            await saveUpdateProductStore(addToCartProductObj, imageUpload[0]);
        }
 
        toast.success('Product Updated in admin list ', {
            autoClose: 1000,
        });
        //uploadFile();
        navigate('/admin');
    }
 
    const handleMediaChange = (e) => {
        setImageUpload(e.target.files);
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
 
    };
 
    // const uploadFile = () => {
    //     if (!imageUpload || imageUpload.length == 0) return;
    //     for (let index = 0; index < imageUpload.length; index++) {
    //         const imageRef = ref(storage, `ProductImages/${ProductIdValue}/${imageUpload[index].name}`);
    //         debugger
    //         uploadBytes(imageRef, imageUpload[index]).then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //                 fetchProductDataForImage(ProductIdValue, url);
    //             });
    //         });
    //     }
    // };
 
    // const fetchProductDataForImage = async (productId, url) => {
 
    //     let data = await getProductByProductIdService(productId);
    //     if (data != undefined) {
    //         let updateImageToProductObj = {
    //             category: data.category,
    //             categoryId: data.categoryId,
    //             info: data.info,
    //             company: data.company,
    //             price: data.price,
    //             quantity: data.quantity,
    //             title: data.title,
    //             isStock: data.isStock,
    //             id: data.id,
    //             count: data.count,
    //             productId: ProductIdValue,
    //             userId: user.userId,
    //             img: data.img,
    //         };
    //         saveUpdateProductStore(updateImageToProductObj);
    //     }
    //     navigate('/admin');
    // }
 
    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };
 
    // const GetProductGUID = () => {
    //     // Generate New unique id for Product Id
    //     const unique_id = uuid();
    //     setProductIdValue(unique_id);y
    // }
 
    return (
        <>
            <div className='container my-5'>
                <Form className='d-grid gap-2' onSubmit={(e) => handleSubmit(e)}>
                    <div className="my-3">
                        <Dropdown title="All Category" onSelect={(e) => fetchProductCategorylist(e)}>
                            <Dropdown.Toggle id="dropdown-basic" className='font-weight-bold tx-dropdown' style={{ background: 'rgba(243, 243, 243, 0.24', backdropFilter: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px', ...borderHello, color: 'black' }}>
                                {selectedValue || 'Select Categories'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu2' style={{ ...borderHello }}>
                                {dropdown.map((item) => (
                                    <Dropdown.Item eventKey={item.id}>{item.Category}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Form.Group className='mb-3' controlId='FormImage'>
                        <Form.Label><b>Upload Product Image:</b></Form.Label>
                        <Form.Control
                            type='file'
                            className='editproduct-input'
                            name="img"
                            placeholder='Upload image'
                            multiple accept="image/*"
                            onChange={handleMediaChange}
                        />
                        <div className="d-flex flex-column my-3">
                            <img src={imageUrls} style={{
                                height: "auto",
                                width: "250px"
                            }} className="img-fluid" alt="product" />
 
                        </div>
                        {selectedFiles.map((file, index) => (
                            <div key={index}>
                                <p>Selected File {index + 1}:</p>
                                {file.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(file)} alt="Selected" rounded style={{ height: "200px", width: "200px" }} />
                                ) : null}
                                <button onClick={() => handleFileRemove(index)}>Remove</button>
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormName'>
                        <Form.Label><b>Enter Product Name:</b></Form.Label>
                        <Form.Control
                            className='editproduct-input'
                            type='text'
                            name="title"
                            value={ProductData.title}
                            placeholder='Enter Product Name'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormPrice'>
                        <Form.Label><b>Enter Product Price:</b></Form.Label>
                        <Form.Control
                            className='editproduct-input'
                            type='number'
                            name="price"
                            value={ProductData.price}
                            placeholder='Enter product Price'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormQuantity'>
                        <Form.Label><b>Enter Quantity of Product:</b></Form.Label>
                        <Form.Control
                            className='editproduct-input'
                            type='number'
                            name="quantity"
                            value={ProductData.quantity}
                            placeholder='Enter Quantity of Product'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormDescription'>
                        <Form.Label><b>Enter Product Description:</b></Form.Label>
                        <Form.Control
                            className='editproduct-textarea'
                            as="textarea"
                            rows={3}
                            placeholder="Enter Product Description..."
                            name="info"
                            value={ProductData.info}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormCompany'>
                        <Form.Label><b>Enter Product Company:</b></Form.Label>
                        <Form.Control
                            className='editproduct-input'
                            type='text'
                            name="company"
                            value={ProductData.company}
                            placeholder='Enter Product Company...'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormisStock'>
                        <Form.Label><b>In Stock:</b></Form.Label>
                        <Form.Check
                            type='checkbox'
                            name="isStock"
                            style={{ marginLeft: "95px", marginTop: "-29px" }}
                            checked={isStockValue}
                            placeholder='Select Stock...'
                            onChange={(e) => {
                                debugger
                                setIsStockValue(e.target.checked)
                                debugger
                            }}
                        />
                    </Form.Group>
                    <div className='pt-3'>
                        <Button type='submit'>Update</Button>
                        <Link to={`/admin`}>
                            <Button className="btn btn-primary mx-3">Back to Product List</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </>
    )
}
 
 
 
export default EditProducts;