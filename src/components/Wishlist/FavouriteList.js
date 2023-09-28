import React from 'react'
import WishlistItem from './WishlistItem';

const FavouriteList = ({ wishlist ,removeWishlist}) => {
    return (
        <div className="container-fluid">
            {wishlist.map(item => {
                return <WishlistItem key={item.id} item={item} removeWishlist ={removeWishlist}/>
            })}
            {/* <WishlistItem /> */}
        </div>
    );
}

export default FavouriteList;