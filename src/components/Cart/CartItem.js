import { useDispatch, useSelector } from 'react-redux';
import { incrementProduct, reduceProduct, removeAll, removeFromCart } from '../../utils/cartSlice';
import React from 'react';
import { toast } from "react-toastify";
import { deleteRecordFromFirebaseService } from '../../firebase/services/product.service';
import { incrementCartProductsService, decrementCartProductsService, getProductByIdService, UpdateItemQuantity } from '../../firebase/services/cart.service';

export default function CartItem({ item, value, fetchAddToCartData }) {

    const dispatch = useDispatch();
    
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const { id, title, img, price, total, count, quantity } = item;
    const removeProductHandler = async (item) => {
        try {
            const addToCartDoc = await getProductByIdService(item.id);
            await deleteRecordFromFirebaseService(addToCartDoc);

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
        // await incrementCartProductsService(addToCartDoc, count);
        const CountIncrement = await incrementCartProductsService(count);
        await UpdateItemQuantity(addToCartDoc.id, CountIncrement);
        fetchAddToCartData();

        dispatch(incrementProduct(item))
    }

    const decrement = async (item) => {
        const addToCartDoc = await getProductByIdService(item.id);
        if (count != 1) {
            // await decrementCartProductsService(addToCartDoc, count);
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
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{ width: "15rem", height: "12rem" }} className="img-fluid" alt="product" />
            </div>
            <div style={{marginTop:'30px',width: '200px'}}>
                <span style={{...fontfamily}}> </span><span style={{...fontfamily,fontSize:'14px',fontWeight:'bold',color:'#12499E'}}>{title}</span><div></div>
                <span style={{...fontfamily,...fontsize}}>$ </span><span style={{...fontfamily,...fontsize}}>{price}</span><div></div>
                <span  style={{...fontfamily,...fontsize}}>QTY<div>
                        <span className="btn btn-black mx-1" onClick={() => decrement(item)}>-</span>
                        <span className="btn btn-black mx-1">{count}</span>
                        <span className="btn btn-black mx-1" onClick={() => increment(item)}>+</span>
                    </div></span>
            </div>
            <div className="col-10 mx-auto col-lg-2" style={{marginTop:'50px'}}>
                <div className="cart-icon" onClick={() => removeProductHandler(item)}>
                    <i className="fas fa-trash" data-testid="trash-icon"></i>
                </div>
            </div>
            <div id="dvCartTotalPrice" className="col-10 mx-auto col-lg-2" style={{marginTop:'50px'}}>
                <strong style={{...fontfamily}}>item total : $ {price * count}</strong>
            </div>
        </div>
    )
}
