import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";
import { fetchWishlistProducts } from '../../utils/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import LoginModal from '../LoginModal';

const ProductWishlist = () => {
    const { user } = useContext(userContext);
    const wishlistItems = useSelector((store) => store.wishlist);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (user.userId) {
            setModalShow(false);
        }
        else
        {
            setModalShow(true);
        }
    }, [user.userId]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        <>
        <section className='mb-5 mt-5'>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                {
                    wishlistItems.wishlist.length > 0
                        ?
                        <React.Fragment>
                            <center>
                                <h1 className='my-3 text-title' name="your" title="wishlist" >Your WishList</h1>
                            </center>
                            <WishlistColumns />
                            <FavouriteList value={wishlistItems} />
                        </React.Fragment>
                        :
                        <EmptyWishlist />
                }
            </LoadingOverlay>
        </section>
         <LoginModal
         name="Login"
         show={modalShow}
         onHide={() => setModalShow(false)}
         
        />
     </>
    );
}
export default ProductWishlist;