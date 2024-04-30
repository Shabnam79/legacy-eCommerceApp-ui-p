import { Button, button, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from 'react'
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
    // const productsPerPage = 10;

    const productsPerPage = variables.PAGINATION_ProductListAdmin.PRODUCTS_PER_PAGE;

    useEffect(() => {
        fetchStoreProductData();
        document.title = "Admin - Product Management"
    }, [user.userId]);

    const fetchStoreProductData = async () => {
        let data = await getProductsService();
        if (data != undefined) {
            setProductData(data);
            setLoading(false);
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

    const filteredProducts = ProductData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [expandedInfo, setExpandedInfo] = useState({});

    // Function to toggle read more
    const toggleReadMore = (productId) => {
        setExpandedInfo(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    const truncateText = (text, count) => {
        const words = text.split(' ');
        if (words.length > count) {
            return words.slice(0, count).join(' ') + '...';
        }
        return text;
    };

    // Function to render item info with read more option
    const renderInfoWithReadMore = (item) => {
        const isExpanded = expandedInfo[item.productId];
        const truncatedInfo = truncateText(item.info.replace(/<[^>]*>?/gm, ''), 25);
        const hasReadMore = item.info.split(' ').length > 25;

        return (
            <td style={{ maxWidth: "500px" }}>
                {isExpanded ? <p className='paragraph-description' dangerouslySetInnerHTML={{ __html: item.info }}></p> : truncatedInfo}
                <br></br>
                {hasReadMore && (
                    <span className='ReadMoreLess' onClick={() => toggleReadMore(item.productId)}>
                        {isExpanded ? " Read Less" : " Read More"}
                    </span>
                )}
            </td>
        );
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
                                {currentProducts.map((item) => (
                                    <tr key={item.productId}>
                                        <td>{item.category}</td>
                                        <td style={{ maxWidth: "10rem" }}>
                                            <img src={item.img} style={{
                                                width: "100px",
                                                height: 'auto'
                                            }} className="img-fluid" alt="product" />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        {renderInfoWithReadMore(item)}

                                        <td className='d-flex border-0'>
                                            <Link to={`/admin/editproduct/${item.productId}`}>
                                                <Button size='sm' style={{
                                                    backgroundColor: 'rgb(5, 54, 69)',
                                                    border: 'none'
                                                }}>EDIT</Button>
                                            </Link>
                                            <Button variant="outline-danger" className='ml-2' size='sm' onClick={() => removeProductHandler(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className='w-100'>
                        <ul className="pagination justify-content-center">
                            {
                                Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                        <button onClick={() => paginate(i + 1)} className="pagination-button">
                                            {i + 1}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </LoadingOverlay >
        </>
    );
}

export default Dashboard;