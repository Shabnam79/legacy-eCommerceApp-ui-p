import React from 'react'

const EmptyWishlist = () => {
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const borderHello={border:"none"};
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                <h1 style={{...fontfamily}}>Your wishlist is currently empty</h1>
                </div>
            </div>
        </div>
    );
}

export default EmptyWishlist;