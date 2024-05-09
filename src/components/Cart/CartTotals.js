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
    const cartItems = useSelector((store) => store);
    const fontsize = { fontSize: 'medium' };
    const { cart } = value;
    const { user } = useContext(userContext)

    const placeProductOrder = async (e) => {
        if (user.userId) {
            const dataArray = [];
            cart.forEach(element => {
                dataArray.push({
                    name: element.company,
                    orderDate: Date(),
                    orderId: uuidv4(),
                    price: element.price,
                    productId: element.productId,
                    quantity: element.count,
                    total: element.price * element.count,
                    userId: user.userId,
                    image: element.img,
                    id: element.id
                })
            });
            await saveCartOrderService(dataArray);
            clearCart();
        } else {
            toast.warning(
                `To make order you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }
    }

    const clearCart = () => {
        if (user?.userId) {
            DeleteAllItemFromYourCart(user.userId);
        }
        dispatch(removeAll());
    }

    const roundToWholeNumber = (number) => {
        return Math.round(number);
    };

    return (
        <React.Fragment>
            <div data-testid='cart-totals cartTotalsArea'
                style={{
                    margin: '0px 0px 0px 20px',
                    padding: '15px',
                    maxHeight: '260px',
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(243, 243, 243, 0.24)',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px',
                    border: 'none',
                }}>

                <div className='mt-3 d-flex justify-content-end'>
                    <div className='d-flex flex-column align-items-end' style={{ width: '300px' }}>
                        <h5 className='d-flex justify-content-between w-100'>
                            <span>Total MRP: </span>
                            <strong>$ {cartItems.cart.subTotal}</strong>
                        </h5>
                        <h5 className='d-flex justify-content-between w-100'>
                            <span style={{ ...fontsize }} className="">Tax: </span>
                            <strong style={{ ...fontsize }}>$ {roundToWholeNumber(cartItems.cart.tax)}</strong>
                        </h5>
                        <h5 className='d-flex justify-content-between w-100 pt-2' style={{ borderTop: '1px solid grey', color: '#B12704 !important' }}>
                            <span>Total Amount: </span>
                            <strong>$ {roundToWholeNumber(cartItems.cart.total)}</strong>
                        </h5>

                        <Link to="/checkout" className='w-100 mt-2'>
                            <button
                                className="btn btn-outline-danger mb-3 px-3 w-100"
                                type="button">
                                Proceed To Checkout
                            </button>
                        </Link>
                        <div className='w-100'>
                            <button id="btnClearCart"
                                className="btn btn-outline-danger  mb-3 px-3"
                                type="button"
                                onClick={() => {
                                    clearCart();
                                }}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
