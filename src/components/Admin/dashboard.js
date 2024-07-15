import { Button, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from 'react';
import userContext from "../../utils/userContext.js";
import { getProductsService, DeleteItemFromProduct } from '../../firebase/services/product.service';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { removeFromCart } from '../../utils/cartSlice';
import AdminColumns from './AdminColumns.js';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { variables } from '../../utils/variables.js';

function Dashboard() {

    const { user } = useContext(userContext);
    const dispatch = useDispatch();
    const [ProductData, setProductData] = useState([]);
    const [ProductIdValue, setProductIdValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedInfo, setExpandedInfo] = useState({});
    // const productsPerPage = 10;

    const productsPerPage = variables.PAGINATION_ProductListAdmin.PRODUCTS_PER_PAGE;

    useEffect(() => {
        fetchStoreProductData();
        document.title = "Admin - Product Management"
    }, [user.userId]);

    const fetchStoreProductData = async () => {
        if (user.userId) {
            setTimeout(async () => {
                let data = await getProductsService();
                if (data != undefined) {
                    setProductData(data);
                    setLoading(false);
                }
            }, 5000);
        } else {
            console.log("Please login to see past Product");
        }
    }

    const removeProductHandler = async (item) => {

        try {
            await DeleteItemFromProduct(item.id);
            toast.warning(
                `Product removed from the admin List.`,
                {
                    autoClose: 1000,
                }
            );
            fetchStoreProductData();
            dispatch(removeFromCart(item));
        }
        catch (e) {
            console.log(e);
        }
    };

    const truncateText = (text, wordCount) => {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return {
                truncated: words.slice(0, wordCount).join(' ') + '...',
                fullText: text
            };
        }
        return {
            truncated: text,
            fullText: text
        };
    };

    const toggleReadMore = (productId) => {
        setExpandedInfo(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className='container my-5'>
                    <div className='d-flex justify-content-between'>
                        <Link className='d-grid gap-2' to='/admin/addproduct'>
                            <Button size="md" style={{
                                backgroundColor: 'rgb(5, 54, 69)',
                                border: 'none'
                            }}>Add Product</Button>
                        </Link>
                        <input type='text' className='searchbar-input' placeholder='Search Product...' onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div style={{ overflowX: "scroll", minWidth: "200px" }}>
                        <Table striped bordered hover style={{ marginTop: "20px" }}>
                            <AdminColumns />
                            <tbody>
                                {
                                    ProductData && ProductData.data?.length > 0 ? ProductData?.data.map((item) => {
                                        const description = truncateText(item.description, 30);
                                        const isExpanded = expandedInfo[item.id];

                                        return (
                                            <tr key={item.id}>
                                                <td>{item.categoryName}</td>
                                                <td style={{ maxWidth: "10rem" }}>
                                                    <img src={`data:image/png;base64, ${item.imageData}`} style={{
                                                        width: "100px",
                                                        height: 'auto'
                                                    }} className="img-fluid" alt="product" />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.companyName}</td>
                                                <td>
                                                    <div dangerouslySetInnerHTML={{ __html: isExpanded ? description.fullText : description.truncated }}></div>
                                                    {description.fullText.split('').length > 30 && (
                                                        <button onClick={() => toggleReadMore(item.id)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', outline: 'none', padding: '0px' }}>
                                                            {isExpanded ? 'Read Less' : 'Read More'}
                                                        </button>
                                                    )}
                                                </td>
                                                <td>${item.price}</td>
                                                <td className='d-flex border-0'>
                                                    <Link to={`/admin/editproduct/${item.id}`}>
                                                        <Button size='sm' style={{
                                                            backgroundColor: 'rgb(5, 54, 69)',
                                                            border: 'none'
                                                        }}>EDIT</Button>
                                                    </Link>
                                                    <Button variant="outline-danger" className='ml-2' size='sm' onClick={() => removeProductHandler(item)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    }) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </LoadingOverlay >
        </>
    );
}

export default Dashboard;