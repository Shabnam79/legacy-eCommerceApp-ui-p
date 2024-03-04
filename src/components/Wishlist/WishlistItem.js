<<<<<<< HEAD
import React, { useContext } from 'react';
import userContext from '../../utils/userContext';
=======
import React from 'react';
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../utils/wishlistSlice';
import { toast } from "react-toastify";
import { DeleteProductFromWishList } from '../../firebase/services/wishlist.service';

export default function WishlistItem({ item, value, fetchAddToWishlistData, removeWishlist }) {
    const { id, company, title, img, price, } = item;
    const fontsize = { fontSize: 'small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const dispatch = useDispatch();

    const removeProductHandler = async (item) => {
        try {
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
        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <div className='tx-wishlist-product-card'>
                <div className="" style={{ height: '325px', padding: '0.75rem' }}>
                    <img src={img} style={{ width: "100%", height: '100%' }} className="img-fluid" alt="product" />
                </div>
                <div className='d-flex justify-content-between' style={{ padding: '0 0.75rem 0.75rem 0.75rem' }}>
                    <div className='d-flex flex-column'>
                        <span className='' id="spWishlistTitle" style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgb(5, 54, 69)', boxSizing: 'none' }}>{title}</span>
                        <div style={{ color: 'rgb(5, 54, 69)' }}>
                            <span style={{ ...fontsize }}>By: </span>
                            <span id="spWishlistCompany"><b>{company}</b></span>
                        </div>
                    </div>
                    <b style={{ color: 'rgb(5, 54, 69)' }}>
                        <span>$ </span>
                        <span id="spWishlistCompany">{price}</span>
                    </b>
                </div>
                <div className="d-flex justify-content-end" style={{ padding: '0 0.75rem 0.75rem 0.75rem' }}>
                    <div className="d-flex justify-content-center cart-icon w-25 p-2 wishlist-card-trash-button" data-testid="trash-icon" onClick={() => removeProductHandler(item)}>
                        <i className="fa fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
