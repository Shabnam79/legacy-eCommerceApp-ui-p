import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { useParams } from 'react-router-dom';
import { getCategoryService, getProductByProductIdService, saveUpdateProductStore } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditProducts() {

    const borderHello = { border: "none" };

    const { user } = useContext(userContext);
    const navigate = useNavigate();
    const [ProductData, setProductData] = useState({
        name: '',
        category: '',
        categoryId: '',
        price: '',
        quantity: '',
        description: '',
        companyName: '',
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
    const [loading, setLoading] = useState(false);

    //File Upload  State
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        fetchStoreProductData(productId);
        fetchCategorylist();
        document.title = "Admin - Edit Product"
    }, [user.userId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [name, setName] = useState({
        category: '',
        categoryId: '',
        companyName: '',
        description: '',
        price: '',
        name: '',
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
        let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.name)[0];
        setSelectedValue(filterCategoryName);
        setCategoryIdValue(id);
    }

    const fetchStoreProductData = async (productId) => {

        let data = await getProductByProductIdService(productId);
        console.log(data)
        if (data != undefined) {
            setProductData(data);
            setSelectedValue(data.categoryName);
            setCategoryIdValue(data.categoryId);
            setIsStockValue(data.isStock);
            setIdValue(data.id);
            setImageUrls(data.imageData);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProductData((prevName) => ({
            companyName: prevName.companyName,
            description: prevName.description,
            price: prevName.price,
            name: prevName.name,
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

    const handleEditorChange = (html) => {
        setProductData(prevName => ({
            ...prevName,
            description: html
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let addToCartProductObj = {
            id: idValue,
            categoryId: CategoryIdValue,
            name: ProductData.name,
            companyName: ProductData.companyName,
            description: ProductData.description,
            price: ProductData.price
        };
        if (!imageUpload || imageUpload.length == 0) {
            await saveUpdateProductStore(addToCartProductObj);
        }
        else {
            await saveUpdateProductStore(addToCartProductObj, imageUpload[0]);
        }
        setLoading(false);

        toast.success('Product Updated in admin list ', {
            autoClose: 1000,
        });
        navigate('/admin');
    }

    const handleMediaChange = (e) => {
        const files = e.target.files;
        const allowedTypes = ['image/jpeg', 'image/png']; // Allowed file types
        const maxSizeKB = 300; // Maximum file size in KB
        const minSizeKB = 100; // Minimum file size in KB

        // Iterate through selected files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileSizeKB = file.size / 1024; // File size in KB

            // Check file type
            if (!allowedTypes.includes(file.type)) {
                toast.error('Only .png and .jpeg/.jpg files are allowed.');
                return; // Stop further processing
            }

            // Check file size
            if (fileSizeKB < minSizeKB || fileSizeKB > maxSizeKB) {
                toast.error('File size must be between 100 KB and 300 KB.');
                return; // Stop further processing
            }
        }

        // If all files pass validation, update state
        setImageUpload(files);
        setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    };


    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className='container my-5'>
                    <Form className='d-grid gap-2' onSubmit={(e) => handleSubmit(e)}>
                        <div className="my-3">
                            <Dropdown title="All Category" onSelect={(e) => fetchProductCategorylist(e)}>
                                <Dropdown.Toggle id="dropdown-basic" className='font-weight-bold tx-dropdown' style={{ background: 'rgba(243, 243, 243, 0.24', backdropFilter: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px', ...borderHello, color: 'black' }}>
                                    {selectedValue || 'Select Categories'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='tx-dropdown-menu tx-dropdown-menu2' style={{ ...borderHello }}>
                                    {dropdown.map((item) => (
                                        <Dropdown.Item eventKey={item.id}>{item.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Form.Group className='mb-3' controlId='FormImage'>
                            <Form.Label><b>Upload Product Image:</b></Form.Label>
                            <Form.Control
                                type='file'
                                className='editproduct-upload'
                                name="pictures"
                                placeholder='Upload image'
                                accept="image/*"
                                onChange={handleMediaChange}
                            />
                            <p className='image-validation'>* Please upload .png, .jpg, or .jpeg files and size should be within the allowed range (100KB - 300KB).</p>
                            <div className="d-flex flex-column my-3">
                                <img src={`data:image/png;base64, ${imageUrls}`} style={{
                                    height: "auto",
                                    width: "250px"
                                }} className="img-fluid" alt="product" />

                            </div>
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
                            <Form.Label><b>Enter Product Name:</b></Form.Label>
                            <Form.Control
                                className='editproduct-input'
                                type='text'
                                name="name"
                                value={ProductData.name}
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
                        <Form.Group className='mb-3' controlId='FormInfo'>
                            <Form.Label><b>Enter Product Description:</b></Form.Label>
                            <ReactQuill
                                className='editproduct-textarea'
                                placeholder="Enter Product Description..."
                                theme="snow"
                                value={ProductData.description}
                                addRange={300}
                                onChange={handleEditorChange}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                        { 'indent': '-1' }, { 'indent': '+1' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ],
                                }}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='FormCompany'>
                            <Form.Label><b>Enter Product Company:</b></Form.Label>
                            <Form.Control
                                className='editproduct-input'
                                type='text'
                                name="companyName"
                                value={ProductData.companyName}
                                placeholder='Enter Product Company...'
                                required
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <div className='pt-3'>
                            <Button type='submit' style={{
                                backgroundColor: 'rgb(5, 54, 69)',
                                border: 'none'
                            }}>Update</Button>
                            <Link to={`/admin`}>
                                <Button className="btn btn-primary mx-3" style={{
                                    backgroundColor: 'rgb(5, 54, 69)',
                                    border: 'none'
                                }}>Back to Product List</Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </LoadingOverlay>
        </>
    )
}



export default EditProducts;