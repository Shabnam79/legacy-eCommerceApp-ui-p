import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProductConsumer } from '../../utils/context';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import { useSelector } from 'react-redux';

const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);

    return (
        <section>
            <ProductConsumer>
                {value => {
                    const { cart } = cartItems;
                    if (cart.length > 0) {
                        return (
                            <React.Fragment>
                                <Title name="your" title="cart" />
                                <CartColumns />
                                <CartList value={cartItems} />
                                <CartTotals value={cartItems} history={history} />
                            </React.Fragment>
                        );
                    } else {
                        return <EmptyCart />;
                    }
                }}
            </ProductConsumer>
        </section>
    );
}

export default Store;