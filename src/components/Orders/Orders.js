import React, { useContext, useEffect, useState } from 'react';
import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";
import userContext from '../../utils/userContext';
import { getOrderService } from '../../firebase/services/order.service';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from "react-toastify";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(userContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchOrders();
        document.title = "Your Orders";
    }, [user.userId]);

    const fetchOrders = async () => {
        if (user.userId) {
            setTimeout(async () => {
                const data = await getOrderService(user.userId);
                if (data != undefined) {
                    setOrders(data);
                    setLoading(false);
                }
            }, 4000);
        } else {
            console.log("Please login to see past orders");
        }
    }

    return (
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
    );
}

export default Orders;