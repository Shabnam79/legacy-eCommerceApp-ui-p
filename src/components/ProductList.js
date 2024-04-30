// ProductList.js

import React, { useEffect, useState } from 'react';
import Product from "./Product";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { Link } from 'react-router-dom';
import { getCategoryService } from '../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import LoadingOverlay from 'react-loading-overlay';
import { variables } from '../utils/variables';
import Carousel from 'react-bootstrap/Carousel';

const ProductList = () => {
    const dispatch = useDispatch();
    const { allproducts } = useSelector((state) => state.allproducts);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const fontfamily = { fontFamily: "Times New Roman" };
    const borderHello = { border: "none" };
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    //const [productsPerPage] = useState(18);

    const productsPerPage = variables.PAGINATION_ProductList.PRODUCTS_PER_PAGE;

    const carouselImages = [
        require('../carouselimage/Carousel-1.png'),
        require('../carouselimage/Carousel-2.png'),
        require('../carouselimage/Carousel-3.png'),
        require('../carouselimage/Carousel-4.png'),
        require('../carouselimage/Carousel-5.png'),
        require('../carouselimage/Carousel-6.png')
    ];

    // Index state to track current image
    const [index, setIndex] = useState(0);

    // Function to handle slide change
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
        document.title = "Our Products";
        console.log(searchTerm)
        //   filterProductsBySearchTerm(searchTerm)
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            await dispatch(fetchProducts(''));
            setLoading(false);
        };
        fetchProductData();
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(
            filterProductsBySearchTerm(allproducts, searchTerm)
        );
    }, [searchTerm, allproducts]);

    const fetchCategorylist = async () => {
        setLoading(true);
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
            setLoading(false);
        }
    }

    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
        setFilteredProducts(filterProductsBySearchTerm(allproducts, searchTerm));
        setSelectedValue(filterCategoryName);
        dispatch(fetchProducts(id));
    }

    const filterProductsBySearchTerm = (products, searchTerm) => {
        return products?.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const SearchTerm = (e) => {
        setSearchTerm(e)
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Logic to get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className="py-5">
                    <div className="">
                        <div className="row m-0">
                            <div className='carousel-area'>
                                <Carousel activeIndex={index} onSelect={handleSelect} interval={1500}> {/* Set interval to 3 seconds */}
                                    {carouselImages.map((image, idx) => (
                                        <Carousel.Item key={idx}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`Slide ${idx}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="container-fluid d-flex justify-content-center">
                                <Dropdown title="All Category" onSelect={(e) => fetchProductCategorylist(e)}>
                                    <Dropdown.Toggle id="dropdown-basic" className='tx-dropdown' style={{ background: 'rgba(243, 243, 243, 0.24', backdropFilter: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px', ...borderHello, color: '#053645' }}>
                                        <strong>
                                            {selectedValue || 'All'}
                                        </strong>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='tx-dropdown-menu'>
                                        <Dropdown.Item eventKey="">{'All'}</Dropdown.Item>
                                        {dropdown.map((item) => (
                                            <Dropdown.Item id={item.id} eventKey={item.id}>{item.Category}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <input type='text'
                                    className='searchbar-input'
                                    value={searchTerm}
                                    onChange={(e) => SearchTerm(e.target.value)}
                                    placeholder='Search your product...' />
                                <button className='searchbar-button'>&#128269;</button>
                            </div>
                            <div className='px-5'>
                                <div className='mt-1 row' style={{ justifyContent: 'space-evenly' }}>
                                    {
                                        currentProducts?.map((product) => (
                                            <Link to='/details' className='my-4 product-card' key={product.id}>
                                                <Product product={product} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='w-100'>
                                <ul className='pagination justify-content-center'>
                                    {
                                        Array.from({ length: Math.ceil(filteredProducts?.length / productsPerPage) }).map((_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button onClick={() => handlePageChange(index + 1)} className='pagination-button'>
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    );
}

export default ProductList;