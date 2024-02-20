import React from 'react'
import OrdersItem from './OrdersItem';

const Orders = ({ orders }) => {

    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    return (
        <div className="d-flex justify-content-center my-4">
            <div style={{ width: "90%", color: '#053645' }}>
                <div className='row' data-testid="orders-list">
                    {orders.map(item => {
                        return <OrdersItem key={item.id} item={item} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders;