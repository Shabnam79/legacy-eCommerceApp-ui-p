import React, { Component, useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll, removeFromWishlist } from '../../utils/wishlistSlice';
import { toast } from "react-toastify";
import { deleteRecordFromFirebaseService } from '../../firebase/services/product.service';
import { DeleteProductFromWishList } from '../../firebase/services/wishlist.service';

export default function WishlistItem({ item, value, fetchAddToWishlistData, removeWishlist }) {
    const { id, company, title, img, price, } = item;
    const { user } = useContext(userContext);
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const dispatch = useDispatch();

    const removeProductHandler = async (item) => {
        try {
            //const addToWishlistDoc = await getWishlistByIdService(item.id);
            //await deleteRecordFromFirebaseService(addToWishlistDoc);
            await DeleteProductFromWishList(item.id);

            toast.warning(
                `Product removed from the Wishlist`,
                {
                    autoClose: 1000,
                }
            );

            fetchAddToWishlistData();
            dispatch(removeFromWishlist(item));

        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{ width: "15rem", height: "12rem" }} className="img-fluid" alt="product" />
            </div>
            <div style={{ marginTop: '30px', width: '200px' }}>
                <span style={{ ...fontfamily }}> </span><span id="spWishlistTitle" style={{ ...fontfamily, fontSize: '14px', fontWeight: 'bold', color: '#12499E' }}>{title}</span><div></div>
                <span style={{ ...fontfamily, ...fontsize }}>by </span><span id="spWishlistCompany" style={{ ...fontfamily, ...fontsize }}>{company}</span><div></div>
                <span style={{ ...fontfamily, ...fontsize }}>$</span><span id="spWishlistCompany" style={{ ...fontfamily, fontSize: '15px' }}>{price}</span>
            </div>
            {/* <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none" style={{...fontfamily}}>product : </span>{title}
            </div> */}
            {/* <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none" style={{...fontfamily}}>price : </span>{price}
            </div> */}
            {/**/}
            <div className="col-10 mx-auto col-lg-2" style={{ marginTop: '30px' }}>
                <div className="cart-icon" data-testid="trash-icon" onClick={() => removeProductHandler(item)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}
