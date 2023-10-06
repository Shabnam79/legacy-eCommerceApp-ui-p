import React,{ useEffect } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts } from '../../utils/cartSlice';

const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartProducts());
    }, []);

    return (
        <section>
            {
                cartItems.cart.length > 0
                    ?
                    <React.Fragment>
                        <Title name="your" title="cart" />
                        <CartColumns />
                        <CartList value={cartItems} />
                        <CartTotals value={cartItems} history={history} />
                    </React.Fragment>
                    :
                    <EmptyCart />
            }
        </section>
    );
}

export default Store;