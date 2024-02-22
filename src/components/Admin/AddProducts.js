import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveProductIntoStoreProductService, getCategoryService, saveUpdateProductStore, getProductByProductIdService } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase/config/firebase.config"
import { Link, useNavigate } from 'react-router-dom';
 
function AddProducts() {
 
    const borderHello = { border: "none" };
 
    const navigate = useNavigate();
    const { user } = useContext(userContext);
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
        count: 0
    });
 
    {/* Added code for Category dropdown bind - By noor */ }
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [ProductIdValue, setProductIdValue] = useState('');
    const [CategoryIdValue, setCategoryIdValue] = useState('');
    const [isStockValue, setIsStockValue] = useState(true);
 
    //File Upload  State
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
 
    useEffect(() => {
        fetchCategorylist();
        GetProductGUID();
        document.title = "Admin - Add Product"
    }, [user.userId]);
 
 
    const handleInputChange = (e) => {
 
        const { name, value } = e.target;
        setName((prevName) => ({
            ...prevName,
            categoryId: CategoryIdValue,
            category: selectedValue,
            productId: ProductIdValue,
            isStock: isStockValue,
            userId: user.userId,
            [name]: value
        }));
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let addToProductObj = {
            ...name,
            isStock: isStockValue,
            quantity: name.quantity
        };
        let docRef = await saveProductIntoStoreProductService(addToProductObj, imageUpload[0]);
 
        //uploadFile();
        //console.log("Document written with ID: ", docRef.id);
 
        toast.success('Product added in admin list ', {
            autoClose: 2000,
        });
        navigate('/admin');
    }
 
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
 
    const GetProductGUID = () => {
        // Generate New unique id for Product Id
        const unique_id = uuid();
        setProductIdValue(unique_id);
    }
 
 
    const handleMediaChange = (e) => {
        setImageUpload(e.target.files);
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };
 
    // const uploadFile = () => {
    //     if (imageUpload.length == 0) return;
    //     for (let index = 0; index < imageUpload.length; index++) {
    //         const imageRef = ref(storage, `ProductImages/${ProductIdValue}/${imageUpload[index].name}`);
    //         uploadBytes(imageRef, imageUpload[index]).then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //                 fetchStoreProductData(ProductIdValue, url);
    //             });
    //         });
    //     }
    // };
 
    // const fetchStoreProductData = async (productId, url) => {
 
    //     let data = await getProductByProductIdService(productId);
    //     if (data != undefined) {
    //         let updateImageToProductObj = {
    //             category: data[0].category,
    //             categoryId: data[0].categoryId,
    //             info: data[0].info,
    //             company: data[0].company,
    //             price: data[0].price,
    //             quantity: data[0].quantity,
    //             title: data[0].title,
    //             isStock: data[0].isStock,
    //             id: data[0].id,
    //             count: data[0].count,
    //             productId: ProductIdValue,
    //             userId: user.userId,
    //             img: url,
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
 
    return (
        <>
            <div className='container my-5'>
                <Form className='d-grid gap-2' onSubmit={handleSubmit}>
                    <div className="my-3">
                        {/* Added code for Category dropdown bind - By noor */}
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
                        <Form.Control
                            type='file'
                            className='addproduct-input'
                            name="img"
                            required
                            placeholder='Upload image'
                            onChange={handleMediaChange}
                        />
                        {selectedFiles.map((file, index) => (
                            <div className='d-flex flex-column my-3' key={index}>
                                <strong className='mb-2'>Selected File {index + 1}:</strong>
                                {file.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(file)} alt="Selected" rounded style={{ height: "auto", width: "250px" }} />
                                ) : null}
                                <Button className='mt-2' onClick={() => handleFileRemove(index)} style={{
                                    width: '100px',
                                    backgroundColor: 'rgb(5, 54, 69)',
                                    border: 'none'
                                }}>Remove</Button>
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormName'>
                        <Form.Control
                            type='text'
                            name="title"
                            className='addproduct-input'
                            value={name.title}
                            placeholder='Enter Product Name...'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormPrice'>
                        <Form.Control
                            type='number'
                            className='addproduct-input'
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
                            className='addproduct-input'
                            name="quantity"
                            value={name.quantity}
                            placeholder='Enter Quantity of Product'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormInfo'>
                        <Form.Control
                            as="textarea"
                            className='addproduct-textarea'
                            rows={3}
                            placeholder="Enter Product Description..."
                            name="info"
                            value={name.info}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormCompany'>
                        <Form.Control
                            type='text'
                            className='addproduct-input'
                            name="company"
                            value={name.company}
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
                                setIsStockValue(e.target.checked)
                            }}
                        />
                    </Form.Group>
                    <div className='pt-3'>
                        <Button type='submit' style={{
                            backgroundColor: 'rgb(5, 54, 69)',
                            border: 'none'
                        }}>Submit</Button>
                        <Link to={`/admin`}>
                            <Button className="btn btn-primary mx-3" style={{
                                backgroundColor: 'rgb(5, 54, 69)',
                                border: 'none'
                            }}>Back to Product List</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default AddProducts;