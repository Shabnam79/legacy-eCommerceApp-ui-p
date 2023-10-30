import React,{ useEffect,useContext } from 'react'
import Title from '../Title';
import CheckoutColumns from './CheckoutColumns';
import EmptyCart from './EmptyCart';
import CheckoutList from './CheckoutList';
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from 'react-redux';
import userContext from "../../utils/userContext";
import {fetchCartProducts} from '../../utils/cartSlice'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { user } = useContext(userContext);

    useEffect(() => {
        dispatch(fetchCartProducts(user.userId));
    }, []);

    return (
        <div className='container'>
            <section>
                {
                    cartItems.cart.length > 0
                        ?
                        <React.Fragment>
                            <Title name="your" title="orderConfirmation" />
                            <Row>
                                <Col>
                                    <CheckoutForm value={cartItems} />
                                </Col>
                                <Col>
                                <h4>Order Summary</h4>
                                <Card style={{ width: '40rem' }}>
                                <Card.Body>
                                    <Card.Title>Item In Your Cart</Card.Title>
                                    <Card.Text>
                                    <CheckoutColumns />
                                    <CheckoutList value={cartItems} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>                                   
                                </Col>
                            </Row>
                            {/* <CartTotals value={cartItems} history={history} /> */}
                        </React.Fragment>
                        :
                        <EmptyCart />
                }
            </section>
        </div>
    );
}

export default Store;