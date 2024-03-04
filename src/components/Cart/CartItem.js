import { useDispatch } from 'react-redux';
import { incrementProduct, reduceProduct, removeAll, removeFromCart } from '../../utils/cartSlice';
import React from 'react';
import { toast } from "react-toastify";
import { incrementCartProductsService, decrementCartProductsService, getProductByIdService, UpdateItemQuantity, DeleteItemFromYourCart } from '../../firebase/services/cart.service';

export default function CartItem({ item, value, fetchAddToCartData }) {

    const dispatch = useDispatch();

    const fontsize = { fontSize: 'x-small' };
    const { title, img, price, total, count } = item;
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

    const increment = async (item) => {
        const addToCartDoc = await getProductByIdService(item.id);
        const CountIncrement = await incrementCartProductsService(count);
        await UpdateItemQuantity(addToCartDoc.id, CountIncrement);
        fetchAddToCartData();

        dispatch(incrementProduct(item))
    }

    const decrement = async (item) => {
        const addToCartDoc = await getProductByIdService(item.id);
        if (count != 1) {
            const CountDecrement = await decrementCartProductsService(count);
            await UpdateItemQuantity(addToCartDoc.id, CountDecrement);
            fetchAddToCartData();
            dispatch(reduceProduct(item))
        }
        else {
            removeProductHandler(item)
        }
    }

    return (
        <div className='w-100 my-3'>
            <div className="d-flex align-items-center justify-content-between w-100">
                <div className="" style={{ width: "15rem", height: "12rem" }}>
                    <img src={img} className="img-fluid w-100 h-100" alt="product" />
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#12499E' }}>{title}</span>
                    <strong className='mb-2' style={{ fontSize: '14px' }}>$ {price}</strong>
                    <strong className='d-flex flex-column align-items-center' style={{ ...fontsize }}>
                        <span>QTY</span>
                        <div>
                            <span style={{ cursor: 'pointer' }} className="btn btn-black mx-1" onClick={() => decrement(item)}>
                                <strong>-</strong>
                            </span>
                            <span className="btn btn-black mx-1">{count}</span>
                            <span style={{ cursor: 'pointer' }} className="btn btn-black mx-1" onClick={() => increment(item)}>
                                <strong>+</strong>
                            </span>
                        </div>
                    </strong>
                </div>
                <div className="">
                    <div className="cart-icon" onClick={() => removeProductHandler(item)}>
                        <i style={{ color: '#dc3545' }} className="fas fa-trash-alt" data-testid="trash-icon"></i>
                    </div>
                </div>
                <div id="dvCartTotalPrice" className="">
                    <strong>Total Item: ${price * count}</strong>
                </div>
            </div>
        </div>
    )
}
