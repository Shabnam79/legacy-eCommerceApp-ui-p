import React, { Component, useEffect, useState } from 'react';
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from '../utils/context';
import { db } from '../config/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const ProductList = () => {
    // const [storeProductList, setstoreProductList] = useState([]);
    // const collectionRef = collection(db, 'storeProducts');

    // useEffect(() => {
    //      const setProducts = async () => {
    //         await getDocs(collectionRef).then((storeProduct) => {
    //             let storeProductData = storeProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //             setstoreProductList(storeProductData)
    //         })
    //     }
    //     setProducts();
    // }, [])

    // console.log('DataList',storeProductList)

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products" />
                    <div className="row">
                        <ProductConsumer>
                            {value => {
                                return value.products.map(product => {
                                    return <Product key={product.id} product={product} />;
                                });
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;

