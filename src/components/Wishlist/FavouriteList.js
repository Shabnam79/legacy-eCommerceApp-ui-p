import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import WishlistItem from './WishlistItem';
import { getWishlistService } from '../../firebase/services/wishlist.service';

const FavouriteList = ({ wishlist, removeWishlist }) => {
    const [WishlistData, setWishlistData] = useState([]);
    const { user } = useContext(userContext);

    const userId = user && Object.keys(user).length > 0 ? user.userId : null

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchAddToWishlistData();
        document.title = "Favourite List";
    }, [user.userId]);

    const fetchAddToWishlistData = async () => {
        if (userId) {
            let data = await getWishlistService(userId);
            if (data != undefined) {
                setWishlistData(data);
            }
        } else {
            console.log("Please login to see past Wishlist products");
        }
    }
    return (
        <div className='wishlistSection my-4'>
            <div className="d-table main-wishlist-section" data-testid="wishlist-items">
                {WishlistData.map(item => {
                    return <WishlistItem key={item.id} item={item} wishlist={wishlist} fetchAddToWishlistData={fetchAddToWishlistData} />
                })}
            </div>
        </div>
    );
}

export default FavouriteList;