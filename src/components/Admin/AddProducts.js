import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveProductIntoStoreProductService, getCategoryService, saveUpdateProductStore, getProductByProductIdService } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddProducts() {

    const borderHello = { border: "none" };
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const [name, setName] = useState({
        categoryId: '',
        name: '',
        companyName: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEditorChange = (html) => {
        setName(prevName => ({
            ...prevName,
            description: html
        }));
    };

    {/* Added code for Category dropdown bind - By noor */ }
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [ProductIdValue, setProductIdValue] = useState('');
    const [CategoryIdValue, setCategoryIdValue] = useState('');
    const [isStockValue, setIsStockValue] = useState(true);
    const [loading, setLoading] = useState(false);

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
        if (!name.name || !name.price || !name.description || !name.companyName || !selectedValue || imageUpload.length === 0) {
            toast.error('Please fill in all fields, select a category, and upload an image.', {
                autoClose: 2000,
            });
            return;
        }
        setLoading(true);
        let addToProductObj = {
            ...name,
            categoryId: CategoryIdValue,
            category: selectedValue,
            isStock: isStockValue,
        };
        let docRef = await saveProductIntoStoreProductService(addToProductObj, imageUpload[0]);
        setLoading(false);
        navigate('/admin');
    }

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

    const GetProductGUID = () => {
        const unique_id = uuid();
        setProductIdValue(unique_id);
    }


    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);

        setImageUpload(files);
        setSelectedFiles([...selectedFiles, ...files]);
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
                    <Form className='d-grid gap-2' onSubmit={handleSubmit}>
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
                            <Form.Control
                                type='file'
                                className='addproduct-upload'
                                name="pictures"
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
                                name="name"
                                className='addproduct-input'
                                value={name.name}
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
                        <Form.Group className='mb-3' controlId='FormDescription'>
                            <ReactQuill
                                className='addproduct-textarea'
                                theme="snow"
                                placeholder="Enter Product Description..."
                                name="description"
                                value={name.description}
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
                            <Form.Control
                                type='text'
                                className='addproduct-input'
                                name="companyName"
                                value={name.companyName}
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
            </LoadingOverlay>
        </>
    )
}
export default AddProducts;