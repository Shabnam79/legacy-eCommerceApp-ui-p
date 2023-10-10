import React, { Component,useContext, useEffect, useState } from 'react';
import { collection, addDoc, writeBatch, doc, where,deleteDoc, query ,getDocs} from "firebase/firestore";
import { db } from '../config/firebase.config';
import userContext from "../utils/userContext";
import Product from "./Product";
import Title from "./Title";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const { allproducts } = useSelector((state) => state.allproducts);
    const [dropdown, setDropdown] = useState([]);
    const { user, setUser } = useContext(userContext);

    useEffect(() => {
        dispatch(fetchProducts(''))
    }, []);

    useEffect(() => {
        fetchCategorylist();
    }, user.userId);

    const fetchCategorylist = async () => {
        debugger
        if (user.userId) {
            const q = query(
                collection(db, "productCategory")
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setDropdown(newData);
            });
        } else {
            console.log("Please login to see category list");
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

