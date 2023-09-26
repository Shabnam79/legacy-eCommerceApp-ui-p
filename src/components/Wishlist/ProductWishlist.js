import React, { Component,useContext, useEffect, useState } from 'react';
import { collection, addDoc, writeBatch, doc, where, query ,getDocs} from "firebase/firestore";
import userContext from '../../utils/userContext';
import { db } from '../../config/firebase.config';
import Title from "../Title";
import { ProductConsumer } from '../../utils/context';
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";
const ProductWishlist = () => {
    debugger
    const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(userContext);

      useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        if (user.userId) {
            const q = query(
                collection(db, "storeWishlist"), where("userId", "==", user.userId)
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setWishlist(newData);
            });
        } else {
            console.log("Please login to see past wishlist");
        }
    }
    return (
        <section>
            <ProductConsumer>
                {value => {
                    if (wishlist.length > 0) {
                        return (
                            <React.Fragment>
                                <Title name="your" title="wishlist" />
                                <WishlistColumns />
                                <FavouriteList wishlist={wishlist} />
                            </React.Fragment>
                        );
                    } else {
                        return <EmptyWishlist />;
                    }
                }}
            </ProductConsumer>
        </section>
    );
}
export default ProductWishlist;