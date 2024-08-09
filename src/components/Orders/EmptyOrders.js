import React, { useState, useEffect } from 'react';

const EmptyOrders = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container mt-5" data-testid="empty-orders-container">
            <div className="row" data-testid="empty-orders-row">
                <div className="col-10 mx-auto text-center text-title" data-testid="empty-orders-column">
                    {
                        showText ? <h1 className='text-title'>There is no orders</h1> : <h1 className='text-title'>Your Orders</h1>
                    }
                </div>
            </div>
        </div>
    );
}

export default EmptyOrders;
