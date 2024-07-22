import React, { useEffect } from 'react'

const EmptyWishlist = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                    <h1 style={{ color: 'rgb(5, 54, 69)' }}>Your wishlist is currently empty</h1>
                </div>
            </div>
        </div>
    );
}

export default EmptyWishlist;