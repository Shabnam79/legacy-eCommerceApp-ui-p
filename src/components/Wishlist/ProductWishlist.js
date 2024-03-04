import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";
import { fetchWishlistProducts } from '../../utils/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from "react-toastify";

const ProductWishlist = () => {
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const borderHello = { border: "none" };
    const { user } = useContext(userContext);
    const wishlistItems = useSelector((store) => store.wishlist);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.userId) {
            debugger
            dispatch(fetchWishlistProducts(user.userId));
            setLoading(false);
        } else {
            console.log("Please login to see past Cart products");
        }
        document.title = "Product Wishlist";
    }, [user.userId]);


    return (
        <section className='mb-5'>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                {
                    wishlistItems.wishlist.length > 0
                        ?
                        <React.Fragment>
                            <center> <h1 className='my-3 text-title' name="your" title="wishlist" >Your WishList</h1></center>
                            <WishlistColumns />
                            <FavouriteList value={wishlistItems} />
                        </React.Fragment>
                        :
                        <EmptyWishlist />
                }
            </LoadingOverlay>
        </section>
    );
}
export default ProductWishlist;