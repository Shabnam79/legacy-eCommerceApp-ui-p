import React, { Component,useContext, useEffect, useState } from 'react';
import { collection, addDoc,deleteDoc, writeBatch, doc, where, query ,getDocs} from "firebase/firestore";
import userContext from '../../utils/userContext';
import { db } from '../../config/firebase.config';
import WishlistItem from './WishlistItem';

const FavouriteList = ({ wishlist, removeWishlist }) => {
    const [WishlistData, setWishlistData] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchAddToWishlistData();
    }, user.userId, []);

    const fetchAddToWishlistData = async () => {
        if (user.userId) {
            const q = query(
                collection(db, "storeWishlist"), where("userId", "==", user.userId)
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setWishlistData(newData);
            });
        } else {
            console.log("Please login to see past Wishlist products");
        }
    }
    return (
        <div className="container-fluid">
            {WishlistData.map(item => {
                return <WishlistItem key={item.id} item={item} wishlist={wishlist} fetchAddToWishlistData ={fetchAddToWishlistData}/>
            })}
            {/* <WishlistItem /> */}
        </div>
    );
}

export default FavouriteList;