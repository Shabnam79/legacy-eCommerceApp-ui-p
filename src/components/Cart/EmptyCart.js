import React, { useEffect } from 'react'
export default function EmptyCart() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="container mt-5" data-testid="empty-cart">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                    <h1>Your cart is currently empty</h1>
                </div>
            </div>
        </div>
    );
}
