// ProductList.js

import React, { useEffect, useState } from 'react';
import Product from "./Product";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { Link } from 'react-router-dom';
import { getCategoryService } from '../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import LoadingOverlay from 'react-loading-overlay';

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


    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
        document.title = "Our Products";
        console.log(searchTerm)
        //   filterProductsBySearchTerm(searchTerm)
    }, []);

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
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const SearchTerm = (e) => {
        setSearchTerm(e)
    }
    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
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
                            <div className='container'>
                                <div className='mt-1 row'>
                                    {
                                        filteredProducts.map((product) => (
                                            <Link to='/details' className='my-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 product-card' key={product.id}>
                                                <Product product={product} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    );
}

export default ProductList;