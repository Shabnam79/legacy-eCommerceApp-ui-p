import React,  { useEffect } from 'react'
import OrdersItem from './OrdersItem';

const OrdersList = ({ orders }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Group orders by orderRefNo
    const groupedOrders = orders.reduce((acc, order) => {
        if (!acc[order.orderRefNo]) {
            acc[order.orderRefNo] = [];
        }
        acc[order.orderRefNo].push(order);
        return acc;
    }, {});

    // Sort the groups by orderDate
    const sortedGroupKeys = Object.keys(groupedOrders).sort((a, b) => {
        const dateA = new Date(groupedOrders[a][0].orderDate);
        const dateB = new Date(groupedOrders[b][0].orderDate);
        return dateB - dateA;
    });

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className='px-5'>
                <div className='d-table orders-list' data-testid="orders-list">
                    {sortedGroupKeys.map(key => (
                        <OrdersItem key={key} items={groupedOrders[key]} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrdersList;
