import React, { useContext } from 'react';
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
        console.log(item.productId, item.userId);
        try {
            await DeleteProductFromWishList(item.productId, item.userId);
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
        <div className="m-3 wishlist-card">
            <div className='tx-wishlist-product-card'>
                <div className="wishlistImageArea" style={{ height: '270px' }}>
                    <img src={img} style={{ width: "100%", height: '100%' }} className="img-fluid" alt="product" />
                </div>
                <div className='d-flex flex-column' style={{ padding: '.5rem 1rem', height: '115px' }}>
                    <div className='d-flex flex-column'>
                        <span className='spWishlistTitle' id="spWishlistTitle" style={{ fontSize: '16px', fontWeight: '100', color: 'rgb(5, 54, 69)', boxSizing: 'none' }}>{title}</span>
                        <div style={{ color: '#007185', fontSize: '14px' }}>
                            <span style={{ ...fontsize }}>By: </span>
                            <span id="spWishlistCompany"><b>{company}</b></span>
                        </div>
                    </div>
                    <strong className='d-flex' style={{ color: '#007185', fontSize: '14px' }}>
                        <span>Price:</span>
                        <span className='ml-1' style={{ fontSize: '10px', fontWeight: '100' }}>$ </span>
                        <span id="spWishlistCompany">{price}</span>
                    </strong>
                </div>
                <div className="d-flex justify-content-end" style={{ padding: '0 0.75rem 0.75rem 0.75rem' }}>
                    <div className="d-flex justify-content-center cart-icon wishlist-card-trash-button" data-testid="trash-icon" onClick={() => removeProductHandler(item)}>
                        &#x2715;
                    </div>
                </div>
                <div className='moveToBag'>
                    <button>MOVE TO BAG</button>
                </div>
            </div>
        </div>
    )
}
