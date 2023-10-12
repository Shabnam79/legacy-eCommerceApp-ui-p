import React, { useContext, useEffect, useState } from 'react'
import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";
import Title from '../Title';
import userContext from '../../utils/userContext';
import { OrderService } from '../../firebase/services/cart.service';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchOrders();
    }, user.userId);

    const fetchOrders = async () => {
        if (user.userId) {
            let data = await OrderService(user.userId);
            if (data != undefined) {
                setOrders(data);
            }
        } else {
            console.log("Please login to see past orders");
        }
    }

    return (
        <section>
            {
                orders.length > 0
                    ?
                    <>
                        <Title name="your" title="orders" />
                        <OrdersList orders={orders} />
                    </>
                    :
                    <EmptyOrders />
            }
        </section>

    );
}

export default Orders;