import React from 'react'
import OrdersItem from './OrdersItem';

const Orders = ({ orders }) => {
    return (
        <div className="d-flex justify-content-center my-4" data-testid="orders-list">
            <div style={{ width: "90%" }}>
                <div className='row'>
                    {orders.map(item => {
                        return <OrdersItem key={item.id} item={item} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders;