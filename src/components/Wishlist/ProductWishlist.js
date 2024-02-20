import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";
import { fetchWishlistProducts } from '../../utils/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

const ProductWishlist = () => {
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const borderHello = { border: "none" };
    //const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(userContext);
    const wishlistItems = useSelector((store) => store.wishlist);
    //console.log(wishlistItems,'Data')
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.userId) {
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
                       <center> <h1 className='my-3 text-title' style={{...fontfamily}} name="your" title="wishlist" >Your WishList</h1></center>
                        <WishlistColumns />
                        <FavouriteList value={wishlistItems} />
                    </React.Fragment>
                    :
                    <EmptyWishlist />
            }</LoadingOverlay>
        </section>
    );
}
export default ProductWishlist;