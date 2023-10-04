import React from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import { useSelector } from 'react-redux';

const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);

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