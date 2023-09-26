import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../../config/firebase.config';
import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";
import Title from '../Title';
import userContext from '../../utils/userContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchOrders();
    }, user.userId);

    const fetchOrders = async () => {
        if (user.userId) {

            const q = query(
                collection(db, "productOrders"), where("userId", "==", user.userId)
            )

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOrders(newData);
            });

            // await getDocs(collection(db, "productOrders"))
            //     .then((querySnapshot) => {
            //         const newData = querySnapshot.docs
            //             .map((doc) => ({ ...doc.data(), id: doc.id }));
            //         setOrders(newData);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
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