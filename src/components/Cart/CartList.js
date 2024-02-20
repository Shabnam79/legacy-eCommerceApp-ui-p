import CartItem from './CartItem';
import userContext from '../../utils/userContext';
import React, { useContext, useEffect, useState } from 'react';
import { getCartProductsService } from '../../firebase/services/cart.service';
import LoadingOverlay from 'react-loading-overlay';

export default function CartList({ value }) {
    const { cart } = value;

    const [CartData, setCartData] = useState([]);
    const { user } = useContext(userContext);

    const userId = user && Object.keys(user).length > 0 ? user.userId : null
    const [loading, setLoading] = useState(true);

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
        <div className="container-fluid">
        <LoadingOverlay active={loading} spinner text='Loading...'>
            {CartData.map(item => {
                return <CartItem key={item.id} item={item} value={value} fetchAddToCartData={fetchAddToCartData} />
            })}

</LoadingOverlay>
        </div>
    );
}
