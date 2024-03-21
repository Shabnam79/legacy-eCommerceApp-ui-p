import React from 'react';

function OrderSummary(props) {
    const { cartItems, subtotal, shippingCost, totalAmount } = props;
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    return (
        <div className="order-summary" data-testid="order-summary" style={{ float: "right" }}>
            <div className="order-total" >
                <div className="subtotal d-flex justify-content-end">Subtotal: &#8377; {subtotal.toFixed(2)}</div>
                <div className="shipping d-flex justify-content-end">Shipping: &#8377; {shippingCost.toFixed(2)}</div>
            </div>
            <hr />
            <div>
                <strong>Total Amount: &#8377; {totalAmount.toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default OrderSummary;