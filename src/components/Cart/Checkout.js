import React,{ useEffect,useContext } from 'react'
import Title from '../Title';
import CheckoutColumns from './CheckoutColumns';
import EmptyCart from './EmptyCart';
import CheckoutList from './CheckoutList';
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from 'react-redux';
import userContext from "../../utils/userContext";
import {fetchCartProducts} from '../../utils/cartSlice'


const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { user } = useContext(userContext);

    useEffect(() => {
        dispatch(fetchCartProducts(user.userId));
    }, []);

    return (
        <section>
            {
                cartItems.cart.length > 0
                    ?
                    <React.Fragment>
                        <Title name="your" title="orderSummary" />
                        <CheckoutColumns />
                        <CheckoutList value={cartItems} />
                        {/* <CartTotals value={cartItems} history={history} /> */}
                        <CheckoutForm value={cartItems}/>
                    </React.Fragment>
                    :
                    <EmptyCart />
            }
        </section>
    );
}

export default Store;