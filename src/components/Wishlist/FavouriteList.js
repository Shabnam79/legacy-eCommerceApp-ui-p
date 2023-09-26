import React from 'react'
import WishlistItem from './WishlistItem';

const FavouriteList = ({ wishlist }) => {
    return (
        <div className="container-fluid">
            {wishlist.map(item => {
                return <WishlistItem key={item.id} item={item} />
            })}
            {/* <WishlistItem /> */}
        </div>
    );
}

export default FavouriteList;