import React, { useEffect, useState } from 'react';
import Product from "./Product";
import Title from "./Title";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { getCategoryService } from '../firebase/services/product.service';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
const ProductList = () => {
    const dispatch = useDispatch();
    const { allproducts } = useSelector((state) => state.allproducts);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
        document.title = "Our Products"; 
    }, []);

    const fetchCategorylist = async () => {
        debugger
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
        }
    }

    // const fetchProductCategorylist = (id) => {
    //     debugger
    //     let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
    //     setSelectedValue(filterCategoryName);
    //     dispatch(fetchProducts(id));
    // }

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        {
                            allproducts.map(product => {
                                return <Product key={product.id} product={product} />;
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;

