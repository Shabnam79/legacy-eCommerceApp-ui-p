import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../utils/cartSlice';
import React from 'react';
import { toast } from "react-toastify";
import { getProductByIdService, DeleteItemFromYourCart } from '../../firebase/services/cart.service';

export default function CheckoutItem({ item, value, fetchAddToCartData }) {
    const dispatch = useDispatch();
    const { id, title, img, price, total, count, quantity } = item;

    const removeProductHandler = async (item) => {
        try {
            const addToCartDoc = await getProductByIdService(item.id);
            await DeleteItemFromYourCart(addToCartDoc);

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


    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="d-flex align-items-center justify-content-center" style={{ width: '20%' }}>
                <img src={img} style={{ width: "5rem" }} className="img-fluid" alt="product" />
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{ width: '50%' }}>
                <span className="d-lg-none">Product:</span>
                <span>{title}</span>
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{ width: '10%' }}>
                <span className="d-lg-none">Price:</span>
                <span>{price}</span>
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{ width: '10%' }}>
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1">{count}</span>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-end" style={{ width: '10%' }}>
                <strong>&#8377; {price * count}</strong>
            </div>
        </div>
    )
}
