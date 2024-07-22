import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../utils/wishlistSlice';
import { toast } from "react-toastify";
import { DeleteProductFromWishList } from '../../firebase/services/wishlist.service';
import { saveProductIntoCartService } from '../../firebase/services/cart.service';
import userContext from "../../utils/userContext";

export default function WishlistItem({ item, value, fetchAddToWishlistData, removeWishlist }) {
    const { user } = useContext(userContext);
    const { id, companyName, name, imageData, price, } = item;
    const fontsize = { fontSize: 'small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const removeProductHandler = async (item) => {
        try {
            await DeleteProductFromWishList(item.wishlistId);
            fetchAddToWishlistData();
            toast.warning(
                `Product removed from the Wishlist`,
                {
                    autoClose: 1000,
                }
            );
            // dispatch(removeFromWishlist(item));
        }
        catch (e) {
            console.log(e);
        }
    };

    const productRemovedFromWishlist = async (item) => {
        try {
            await DeleteProductFromWishList(item.wishlistId);
            fetchAddToWishlistData();
        }
        catch (e) {
            console.log(e);
        }
    };

    const productMoveToCart = async () => {
        try {
            let productObj = {
                productId: id,
                userId: user.userId,
                quantity: 1
            }
            await saveProductIntoCartService(productObj);
        }
        catch (e) {
            console.log(e);
        }
    };

    const productMoveToCartAndRemovedFromWishlist = (item) => {
        productMoveToCart();
        productRemovedFromWishlist(item);
        toast.success(
            `Product is moved to cart`,
            {
                autoClose: 1000,
            }
        );
    }

    return (
        <div className="m-3 wishlist-card">
            <div className='tx-wishlist-product-card'>
                <div className="wishlistImageArea" style={{ height: '270px' }}>
                    <img src={`data:image/png;base64, ${imageData}`} style={{ width: "100%", height: '100%' }} className="img-fluid" alt="product" />
                </div>
                <div className='d-flex flex-column' style={{ padding: '.5rem 1rem', height: '115px' }}>
                    <div className='d-flex flex-column'>
                        <span className='spWishlistTitle' id="spWishlistTitle" style={{ fontSize: '16px', fontWeight: '100', color: 'rgb(5, 54, 69)', boxSizing: 'none' }}>{name}</span>
                        <div style={{ color: '#007185', fontSize: '14px' }}>
                            <span style={{ ...fontsize }}>By: </span>
                            <span id="spWishlistCompany"><b>{companyName}</b></span>
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
                    <button onClick={() => productMoveToCartAndRemovedFromWishlist(item)}>MOVE TO CART</button>
                </div>
            </div>
        </div>
    )
}
