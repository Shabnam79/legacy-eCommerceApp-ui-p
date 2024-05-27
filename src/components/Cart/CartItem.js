import { useDispatch } from 'react-redux';
import { incrementProduct, reduceProduct, removeAll, updateProductQuantity, removeFromCart } from '../../utils/cartSlice';
import React from 'react';
import { toast } from "react-toastify";
import { incrementCartProductsService, decrementCartProductsService, getProductByIdService, UpdateItemQuantity, DeleteItemFromYourCart } from '../../firebase/services/cart.service';

export default function CartItem({ item, value, fetchAddToCartData }) {

    const dispatch = useDispatch();

    const fontsize = { fontSize: 'x-small' };
    const { company, title, img, price, total, count } = item;

    const removeProductHandler = async (item) => {
        try {
            await DeleteItemFromYourCart(item.id);
            toast.warning(
                `Product removed from the Cart`,
                {
                    autoClose: 1000,
                }
            );

            fetchAddToCartData();
            dispatch(removeFromCart(item));
        }
        catch (e) {
            console.log(e);
        }
    };

    const handleQuantityChange = async (event, item) => {
        const newQuantity = parseInt(event.target.value);
        const addToCartDoc = await getProductByIdService(item.id);

        await UpdateItemQuantity(addToCartDoc.id, newQuantity);

        fetchAddToCartData();

        dispatch(updateProductQuantity({ ...item, count: newQuantity }));
    };

    return (
        <div className='w-100 cartItemsArea'>
            <div className="d-flex align-items-center w-100">
                <div className="d-flex justify-content-start" style={{ width: "9rem", height: "10rem" }}>
                    <img src={img} className="img-fluid w-100" alt="product" />
                </div>
                <div className='d-flex flex-column align-items-start ml-4'>
                    <span className='' style={{ fontSize: '18px', fontWeight: 'bold' }}>{company}</span>
                    <span className='' style={{ fontSize: '14px', fontWeight: '100' }}>{title}</span>
                    <strong className='my-2' style={{ fontSize: '14px', color: '#F16565' }}>Price: ${price}</strong>
                    <strong className='d-flex align-items-center quantityArea' style={{ ...fontsize }}>
                        <span style={{ fontSize: '14px' }}>Qty:</span>
                        <div className='d-flex align-items-center'>
                            <select
                                value={count}
                                onChange={(event) => handleQuantityChange(event, item)}
                                className="ml-1 quantityAreaDropdown"
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </strong>
                    <div id="dvCartTotalPrice" className="d-flex align-items-center cartTotalPrice">
                        <strong>Total:</strong>
                        <strong className='ml-2'>${price * count}</strong>
                    </div>
                </div>
                <div className="deleteProductFromCart" onClick={() => removeProductHandler(item)} style={{ width: '1.5rem' }}>
                    &#x2715;
                </div>

            </div>
        </div>
    )
}
