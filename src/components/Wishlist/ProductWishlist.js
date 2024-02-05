import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import Title from "../Title";
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";
import { fetchWishlistProducts } from '../../utils/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

const ProductWishlist = () => {
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const borderHello={border:"none"};
    //const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(userContext);
    const wishlistItems = useSelector((store) => store.wishlist);
    //console.log(wishlistItems,'Data')
    const dispatch = useDispatch();

    useEffect(() => {
        debugger
        if (user.userId) {
            dispatch(fetchWishlistProducts(user.userId));
        } else {
            console.log("Please login to see past Cart products");
        }
        document.title = "Product Wishlist";
    }, [user.userId]);


    return (
        <section>
            {
                wishlistItems.wishlist.length > 0
                    ?
                    <React.Fragment>
                       <center> <h1 style={{...fontfamily}} name="your" title="wishlist" >Your WishList</h1></center>
                        <WishlistColumns />
                        <FavouriteList value={wishlistItems} />
                    </React.Fragment>
                    :
                    <EmptyWishlist />
            }
        </section>
    );
}
export default ProductWishlist;