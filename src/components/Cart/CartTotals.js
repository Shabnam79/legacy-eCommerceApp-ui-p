import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../utils/cartSlice';
import { toast } from "react-toastify";
import { saveCartOrderService } from '../../firebase/services/order.service';
import { DeleteItemFromYourCart } from '../../firebase/services/cart.service';

export default function CartTotals({ value }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store);
    const fontsize = { fontSize: 'small' };
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
        cart.forEach((data) => {
            DeleteItemFromYourCart(data.id);
        });
        dispatch(removeAll());
    }

    return (
        <React.Fragment>
            <div data-testid='cart-totals cartTotalsArea'
                style={{
                    margin: '0px 0px 0px 20px',
                    padding: '15px',
                    maxHeight: '350px',
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(243, 243, 243, 0.24)',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 10px 0px',
                    border: 'none',
                }}>
                <div className="d-flex justify-content-end">
                    <div className="d-flex flex-column align-items-end" style={{ width: '300px' }}>
                        <h5>
                            <span>Subtotal: </span>
                            <strong>${cartItems.cart.subTotal}</strong>
                        </h5>
                        <button id="btnClearCart"
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={() => {
                                clearCart();
                            }}>
                            clear cart
                        </button>
                        <div className='mt-2 d-flex flex-column align-items-end'>
                            <h5 id="hdCartSubtotal">
                                <span className="text-title">SUBTOTAL: </span>
                                <strong>${cartItems.cart.subTotal}</strong>
                            </h5>
                            <h5 id="hdCartTax">
                                <span className="text-title">TAX: </span>
                                <strong>${cartItems.cart.tax}</strong>
                            </h5>
                            <h5 id="hdCartTotalAmt">
                                <span className="text-title">TOTAL AMOUNT: </span>
                                <strong>${cartItems.cart.total}</strong>
                            </h5>
                        </div>
                    </div>
                </div>

                <div className='mt-3 d-flex justify-content-end'>
                    <div className='d-flex flex-column align-items-end' style={{ width: '300px' }}>
                        <h5>
                            <span style={{ ...fontsize }} className="text-title">Tax: </span>
                            <strong style={{ ...fontsize }}>${cartItems.cart.tax}</strong>
                        </h5>
                        <h5>
                            <span>Total Amount: </span>
                            <strong>${cartItems.cart.total}</strong>
                        </h5>

                        <Link to="/checkout">
                            <button
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                type="button">
                                Proceed To Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
