import React, { useEffect, useState } from 'react';
import Product from "./Product";
import Title from "./Title";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { getCategoryService } from '../firebase/services/product.service';

const ProductList = () => {
    const dispatch = useDispatch();
    const { allproducts } = useSelector((state) => state.allproducts);
    const [dropdown, setDropdown] = useState([]);

    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
    }, []);

    const fetchCategorylist = async () => {
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
        }
    }

    const fetchProductCategorylist = (id) => {
        dispatch(fetchProducts(id));
    }

    return (
        <>
            <div className="py-12 mt-2" style={{ textAlign: "right" }}>
                <div className="container">
                    <select className="dropdown" onChange={(e) => fetchProductCategorylist(e.target.value)}>
                        {/* <select className="dropdown" onChange={(e) => value.fetchProductCategorylist(e.target.value)}> */}
                        <option value="">All Category</option>
                        {dropdown.map((item) => (
                            <option value={item.id}>{item.Category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products" />
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

