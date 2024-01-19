import React, { useEffect, useState } from 'react';
import Product from "./Product";
import Title from "./Title";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { getCategoryService } from '../firebase/services/product.service';
import Dropdown from 'react-bootstrap/Dropdown';

const ProductList = () => {
    const dispatch = useDispatch();
    const { allproducts } = useSelector((state) => state.allproducts);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const fontfamily = {fontFamily: "Times New Roman"};
    const borderHello={border:"none"};

    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
        document.title = "Our Products"; 
    }, []);

    const fetchCategorylist = async () => {
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
        }
    }
    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
        setSelectedValue(filterCategoryName);
        dispatch(fetchProducts(id));
    }

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="container-fluid">
                        
                        <Dropdown  title="All Category"  onSelect={(e) => fetchProductCategorylist(e)}>
                            <Dropdown.Toggle  id="dropdown-basic" style={{background:'LightGray',...borderHello,...fontfamily,color:'black'}}>
                                {selectedValue || 'All'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item eventKey="">{'All'}</Dropdown.Item>
                            {dropdown.map((item) => (
                                <Dropdown.Item id={item.id} eventKey={item.id}>{item.Category}</Dropdown.Item>
                            ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
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

