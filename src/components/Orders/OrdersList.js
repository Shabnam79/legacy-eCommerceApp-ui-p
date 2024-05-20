import React from 'react'
import OrdersItem from './OrdersItem';

const Orders = ({ orders }) => {

    const sortedOrders = orders.sort((a, b) => {
        const dateComparison = new Date(b.orderDate) - new Date(a.orderDate);
        if (dateComparison === 0) {
            // If dates are equal, compare based on orderTime
            return new Date(b.orderTime) - new Date(a.orderTime);
        }
        return dateComparison;
    });

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className='px-5'>
                <div className='d-table orders-list' data-testid="orders-list">
                    {sortedOrders.map(item => {
                        return <OrdersItem key={item.id} item={item} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders;