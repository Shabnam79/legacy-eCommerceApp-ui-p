import CartItem from './CartItem';
import userContext from '../../utils/userContext';
import React, { useContext, useEffect, useState } from 'react';
import { getCartProductsService } from '../../firebase/services/cart.service';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from "react-toastify";

export default function CartList({ value }) {

    const [CartData, setCartData] = useState([]);
    const { user } = useContext(userContext);
    const userId = user && Object.keys(user).length > 0 ? user.userId : null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchAddToCartData();
        document.title = "Cart List";
    }, [userId]);

    const fetchAddToCartData = async () => {
        if (userId) {
            let data = await getCartProductsService(user.userId);
            if (data != undefined) {
                setCartData(data);
                setLoading(false);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    return (
        <div className="container-fluid px-0">
            <LoadingOverlay active={loading} spinner text='Loading...'>
                <div className='row pr-2'>
                    {CartData.map(item => {
                        return <CartItem key={item.id} item={item} value={value} fetchAddToCartData={fetchAddToCartData} />
                    })}
                </div>
            </LoadingOverlay>
        </div>
    );
}
