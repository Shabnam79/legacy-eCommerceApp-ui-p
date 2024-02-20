import React from 'react';

const fontsize = { fontSize: 'small' };
const fontfamily = { fontFamily: "Times New Roman" };
export default function CheckoutColumns() {
    return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="d-flex align-items-center justify-content-center" style={{ width: '20%' }}>
                    <p className="text-uppercase font-weight-bold" style={{ ...fontsize }}>products</p>
                </div>
                <div className="d-flex align-items-center justify-content-center" style={{ width: '50%' }}>
                    <p className="text-uppercase font-weight-bold" style={{ ...fontsize }}>name of product</p>
                </div>
                <div className="d-flex align-items-center justify-content-center" style={{ width: '10%' }}>
                    <p className="text-uppercase font-weight-bold" style={{ ...fontsize }}>price</p>
                </div>
                <div className="d-flex align-items-center justify-content-center" style={{ width: '10%' }}>
                    <p className="text-uppercase font-weight-bold" style={{ ...fontsize }}>quantity</p>
                </div>
                <div className="d-flex align-items-center justify-content-center" style={{ width: '10%' }}>
                    <p className="text-uppercase font-weight-bold" style={{ ...fontsize }}>total</p>
                </div>
            </div>
        </div>
    )
}
