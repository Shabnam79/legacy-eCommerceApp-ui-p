import CheckoutItem from './CheckoutItem';
import userContext from '../../utils/userContext';
import React, { useContext, useEffect, useState } from 'react';
import { getCartProductsService } from '../../firebase/services/cart.service';
import { toast } from "react-toastify";

export default function CheckoutList({ value }) {
    const { cart } = value;

    const [CartData, setCartData] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchAddToCartData();
        document.title = "Check Out List";
    }, user.userId, []);

    const fetchAddToCartData = async () => {
        if (user.userId) {
            let data = await getCartProductsService(user.userId);
            if (data != undefined) {
                setCartData(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    return (
        <div className="container-fluid">
            {CartData.map(item => {
                return <CheckoutItem key={item.id} item={item} value={value} fetchAddToCartData={fetchAddToCartData} />
            })}

        </div>
    );
}
