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
    const productsPerPage = variables.PAGINATION_ProductList.PRODUCTS_PER_PAGE;

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const carouselImages = [
        require('../carouselimage/Carousel-1.png'),
        require('../carouselimage/Carousel-2.png'),
        require('../carouselimage/Carousel-3.png'),
        require('../carouselimage/Carousel-4.png'),
        require('../carouselimage/Carousel-5.png'),
        require('../carouselimage/Carousel-6.png')
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        fetchCategorylist();
        fetchProductData();
        document.title = "Our Products";
    }, []);

    useEffect(() => {
        setFilteredProducts(filterProductsBySearchTerm(allproducts?.data, searchTerm));
    }, [searchTerm, allproducts]);

    useEffect(() => {
        if (selectedValue) {
            fetchProductCategorylist(dropdown.find(category => category.name === selectedValue)?.id || '');
        }
    }, [selectedValue, allproducts]);

    const fetchCategorylist = async () => {
        setLoading(true);
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
            setLoading(false);
        }
    };

    const fetchProductData = async () => {
        setLoading(true);
        await dispatch(fetchProducts(''));
        setLoading(false);
    };

    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.find(x => x.id == id)?.name || 'All';
        setSelectedValue(filterCategoryName);

        if (id) {
            const filteredByCategory = allproducts?.data?.filter(product => product.categoryId == id);
            setFilteredProducts(filterProductsBySearchTerm(filteredByCategory, searchTerm));
        } else {
            setFilteredProducts(filterProductsBySearchTerm(allproducts?.data, searchTerm));
        }
    };

    const filterProductsBySearchTerm = (products, searchTerm) => {
        return products?.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const SearchTerm = (e) => {
        setSearchTerm(e);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                                <Carousel activeIndex={index} onSelect={handleSelect} interval={1500}>
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
                            <div className="mb-3 container-fluid d-flex justify-content-center">
                                <Dropdown onSelect={(e) => fetchProductCategorylist(e)}>
                                    <Dropdown.Toggle id="dropdown-basic" className='tx-dropdown-category'>
                                        <strong>{selectedValue || 'All'}</strong>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='tx-dropdown-menu-category'>
                                        <Dropdown.Item eventKey="">{'All'}</Dropdown.Item>
                                        {dropdown.map((item) => (
                                            <Dropdown.Item key={item.id} eventKey={item.id}>{item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <input type='text'
                                    className='searchbar-input'
                                    value={searchTerm}
                                    onChange={(e) => SearchTerm(e.target.value)}
                                    placeholder='Search your product...'
                                    style={{
                                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' x=\'0px\' y=\'0px\' width=\'20\' height=\'20\' viewBox=\'0,0,256,256\'%3E%3Cg fill=\'%23717288\' fill-rule=\'nonzero\' stroke=\'none\' stroke-width=\'1\' stroke-linecap=\'butt\' stroke-linejoin=\'miter\' stroke-miterlimit=\'10\' stroke-dasharray=\'\' stroke-dashoffset=\'0\' font-family=\'none\' font-weight=\'none\' font-size=\'none\' text-anchor=\'none\' style=\'mix-blend-mode: normal\'%3E%3Cg transform=\'scale(5.12,5.12)\'%3E%3Cpath d=\'M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z\'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                        backgroundPosition: '12px 50%',
                                        backgroundRepeat: 'no-repeat',
                                        padding: '12px 20px 12px 40px'
                                    }}
                                />
                            </div>
                            <div className='w-100 d-flex justify-content-center'>
                                <div className='px-5'>
                                    <div className='mt-1 d-table main-product-section'>
                                        {currentProducts && currentProducts.map((product) => (
                                            <div className='m-3 product-card' key={product.id}>
                                                <Product
                                                    product={product}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='w-100'>
                                <ul className='mt-5 pagination justify-content-center'>
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
};

export default ProductList;
