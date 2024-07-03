import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../utils/cartSlice';
import { toast } from "react-toastify";
import { saveCartOrderService } from '../../firebase/services/order.service';
import { DeleteAllItemFromYourCart } from '../../firebase/services/cart.service';

export default function CartTotals({ value }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart);
    const fontsize = { fontSize: 'medium' };
    const { cart } = value;
    const { user } = useContext(userContext)

    const placeProductOrder = async () => {
        if (cartItems.length > 0) {
            const userId = cartItems[0].userId;
            const dataArray = cartItems.map(item => ({
                name: item.company,
                orderDate: new Date().toString(),
                orderId: uuidv4(),
                price: item.price,
                productId: item.productId,
                quantity: item.count,
                total: item.price * item.count,
                userId: userId,
                image: item.img,
                id: item.id,
            }));
            await saveCartOrderService(dataArray);
            clearCart();
        } else {
            toast.warning('To make order you need to login first', { autoClose: 1000 });
        }
    };

    const clearCart = () => {
        if (cartItems.cart.length > 0) {
            DeleteAllItemFromYourCart(cartItems.cart[0].userId);
        }
        dispatch(removeAll());
    };

    const roundToWholeNumber = (number) => {
        return Math.round(number);
    };

    return (
        <React.Fragment>
            <div className='cartTotalsArea' data-testid='cart-totals cartTotalsArea'
                style={{
                    margin: '0px 0px 0px 20px',
                    padding: '15px',
                    border: 'none',
                    borderLeft: '1px solid #EAEAEC'
                }}>
                <div className='mt-3 cartTotalsAreaBox'>
                    <div className='d-flex flex-column align-items-end' style={{ width: '300px' }}>
                        <h5 className='d-flex justify-content-between w-100'>
                            <span>Total MRP: </span>
                            <strong>$ {cartItems.subTotal}</strong>
                        </h5>
                        <h5 className='d-flex justify-content-between w-100'>
                            <span>Tax: </span>
                            <strong>$ {roundToWholeNumber(cartItems.tax)}</strong>
                        </h5>
                        <h5 className='d-flex justify-content-between w-100 pt-2' style={{ borderTop: '1px solid grey', color: '#B12704 !important' }}>
                            <span>Total Amount: </span>
                            <strong>$ {roundToWholeNumber(cartItems.total)}</strong>
                        </h5>
                        <Link to="/checkout" className='w-100 mt-2'>
                            <button className="proceedCheckoutClearCartButton proceedCheckoutClearCartButton1 mb-3" type="button">
                                Proceed To Checkout
                            </button>
                        </Link>
                        <div className='w-100'>
                            <button id="btnClearCart" className="proceedCheckoutClearCartButton proceedCheckoutClearCartButton2 mb-3" type="button" onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
