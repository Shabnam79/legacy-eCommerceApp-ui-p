import React, { useContext, useEffect, useState } from 'react';
import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";
import userContext from '../../utils/userContext';
import { getOrderService } from '../../firebase/services/order.service';
import LoadingOverlay from 'react-loading-overlay';
import LoginModal from '../LoginModal';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(userContext);
    const [loading, setLoading] = useState(true);
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
        fetchOrders();
        document.title = "Your Orders";
    }, [user.userId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchOrders = async () => {
        if (user.userId) {
            setTimeout(async () => {
                const data = await getOrderService(user.userId);
                if (data != undefined) {
                    setOrders(data);
                    setLoading(false);
                }
            }, 3000);
        } else {
            console.log("Please login to see past orders");
        }
    }

    return (
        <>
        <section>
            <LoadingOverlay active={loading} spinner text='Loading...'>
                {
                    orders.length > 0 ? <>
                        <center className='mt-5'>
                            <h1 className='text-title'>Your Orders</h1>
                        </center>
                        <OrdersList orders={orders} />
                    </> : <EmptyOrders />
                }
            </LoadingOverlay>
        </section>
            <LoginModal
            name="Login"
            show={modalShow}
            onHide={() => setModalShow(false)}
            
        />
       </>
    );
}

export default Orders;