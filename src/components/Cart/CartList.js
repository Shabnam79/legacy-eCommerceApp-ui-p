import CartItem from './CartItem';
import userContext from '../../utils/userContext';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../config/firebase.config';
import { collection, doc, where, deleteDoc, query, getDocs } from "firebase/firestore";

export default function CartList({ value }) {
    const { cart } = value;

    const [CartData, setCartData] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchAddToCartData();
    }, user.userId,[]);

    const fetchAddToCartData = async () => {
        if (user.userId) {
            const q = query(
                collection(db, "addToCartStore"), where("userId", "==", user.userId)
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCartData(newData);
            });
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    return (
        <div className="container-fluid">
            {CartData.map(item => {
                return <CartItem key={item.id} item={item} value={value} fetchAddToCartData={fetchAddToCartData} />
            })}

        </div>
    );
}
