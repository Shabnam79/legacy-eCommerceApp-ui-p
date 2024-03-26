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
        <div className="d-flex justify-content-center my-4">
            <div style={{ width: "90%", color: '#053645' }}>
                <div className='row' data-testid="orders-list">
                    {sortedOrders.map(item => {
                        return <OrdersItem key={item.id} item={item} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders;