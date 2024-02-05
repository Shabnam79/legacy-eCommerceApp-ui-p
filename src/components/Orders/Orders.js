import React, { useContext, useEffect, useState } from 'react'
import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";
import Title from '../Title';
import userContext from '../../utils/userContext';
import { getOrderService } from '../../firebase/services/order.service';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(userContext);
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    useEffect(() => {
        fetchOrders();
        document.title = "Your Orders";
    }, [user.userId]);

    const fetchOrders = async () => {
        if (user.userId) {
            let data = await getOrderService(user.userId);
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
                        <center><h1 style={{...fontfamily}}>Your Orders</h1></center>
                        <OrdersList orders={orders} />
                    </> :
                    <EmptyOrders />
            }
        </section>

    );
}

export default Orders;