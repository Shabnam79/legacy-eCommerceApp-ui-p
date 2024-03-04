import React, { useEffect, useContext } from 'react'
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import { useDispatch, useSelector } from 'react-redux';
import userContext from "../../utils/userContext";
import { fetchCartProducts } from '../../utils/cartSlice'
import { toast } from "react-toastify";

const Cart = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { user } = useContext(userContext);

    useEffect(() => {
        if (user.userId) {
            dispatch(fetchCartProducts(user.userId));
        } else {
            console.log("Please login to see past Cart products");
        }
        document.title = "Shopping Cart";
    }, [user.userId]);

    return (
        <section>
            {
                cartItems.cart.length > 0
                    ?
                    <React.Fragment>
                        <center><h1>Shopping Cart</h1></center>
                        <div className='mt-5 container'>
                            <div className='d-flex justify-content-between'>
                                <CartList value={cartItems} />
                                <CartTotals value={cartItems} history={history} />
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <EmptyCart />
            }
        </section>
    );
}

export default Cart;