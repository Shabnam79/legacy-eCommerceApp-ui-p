import React, { useEffect, useContext, useState } from 'react'
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import { useDispatch, useSelector } from 'react-redux';
import userContext from "../../utils/userContext";
import { fetchCartProducts } from '../../utils/cartSlice'
import LoginModal from '../LoginModal';

const Cart = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { user } = useContext(userContext);
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        if (user.userId) {
            setModalShow(false);
        }
        else
        {
            setModalShow(true);
        }
    }, [user.userId]);

    useEffect(() => {
        if (user.userId) {
            dispatch(fetchCartProducts(user.userId));
        } else {
            console.log("Please login to see past Cart products");
        }
        document.title = "Shopping Cart";
    }, [user.userId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
        <section>
            {
                cartItems.cart.length > 0
                    ?
                    <React.Fragment>
                        <center className='mt-5'>
                            <h1 className='text-title'>Shopping Cart</h1>
                        </center>
                        <div className='mt-5 container'>
                            <div className='cartListTotals' style={{ borderTop: '1px solid #EAEAEC' }}>
                                <CartList value={cartItems} />
                                <CartTotals value={cartItems} history={history} />
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <EmptyCart />
            }
        </section>
        
            <LoginModal
            name="Login"
            show={modalShow}
            onHide={() => setModalShow(false)}
            
            />
        </>
    );
}

export default Cart;