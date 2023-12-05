import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveProductIntoStoreProductService, getCategoryService, saveUpdateProductStore, getProductByProductIdService } from '../../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase/config/firebase.config"


function AddProducts() {

    const { user } = useContext(userContext);
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
        quantity:'',
        img: ''
        // count: '',
        // inCart: false,
        // inWishlist: false,
        // total: '',
    });

     {/* Added code for Category dropdown bind - By noor */}
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [ProductIdValue, setProductIdValue] = useState('');
    const [CategoryIdValue, setCategoryIdValue] = useState('');
    const [isStockValue, setIsStockValue] = useState(true);

    //File Upload  State
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

      {/* Added code for Category dropdown bind - By Noor */}
      useEffect(() => {
        fetchCategorylist();
        GetProductGUID();
    }, [user.userId]);
    

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setName((prevName) => ({
            
            ...prevName,
            
            categoryId: CategoryIdValue,
            category: selectedValue,
            productId: ProductIdValue,
            isStock : isStockValue,
            userId: user.userId,
            [name]: value
            

        }));
    };

    const handleSubmit = async (e) => {
        debugger

        e.preventDefault();
        let addToProductObj = {
            ...name,
            isStock : isStockValue,
            quantity : name.quantity,
        };
        let docRef = await saveProductIntoStoreProductService(addToProductObj);
        uploadFile();
        //console.log("Document written with ID: ", docRef.id);
        toast.success('Product added in admin list ', {
            autoClose: 1000,
        });
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
        debugger
        setImageUpload(e.target.files);
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        console.log(imageUpload);
    };
    
    const uploadFile = () => {
        if (imageUpload.length == 0) return;
        for (let index = 0; index < imageUpload.length; index++) {
            const imageRef = ref(storage, `ProductImages/${ProductIdValue}/${imageUpload[index].name}`);
            uploadBytes(imageRef, imageUpload[index]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    fetchStoreProductData(ProductIdValue, url);
                });
            });
        }
    };

    const fetchStoreProductData = async (productId, url) => {
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

    return (
                 <>
                        <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={handleSubmit}>
                            <div className="container my-3">
                                {/* Added code for Category dropdown bind - By noor */}
                                
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
                                <Form.Control
                                    type='file'
                                    name="img"
                                    required
                                    placeholder='Upload image'
                                    onChange={handleMediaChange}
                                />
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
                                <Form.Control
                                    type='text'
                                    name="title"
                                    value={name.title}
                                    placeholder='Enter Product Name...'
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
                            <Form.Group className='mb-3' controlId='FormInfo'>
                            <Form.Control
                                    as="textarea"
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
                                    name="company"
                                    value={name.company}
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
                                                     setIsStockValue(e.target.checked)
                                                    }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form.Group>
                            <Button type='submit'>Submit</Button>
                        </Form>
                   
                </>
    )
}



export default AddProducts;