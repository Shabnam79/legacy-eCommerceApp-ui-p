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

    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
        document.title = "Our Products";
    }, []);

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
        setSelectedValue(filterCategoryName);
        dispatch(fetchProducts(id));
    }

    return (
        <>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="container-fluid">

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
                            </div>
                            <div className='container'>
                                <div className='mt-1 row'>
                                    {
                                        allproducts.map(product => {
                                            return (
                                                <Link to="/details" className='my-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 product-card'>
                                                    <Product key={product.id} product={product} />
                                                </Link>
                                            );
                                        })
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