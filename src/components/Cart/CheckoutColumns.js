import React from 'react';
    
const fontsize = {fontSize: 'x-small'};
const fontfamily = {fontFamily: "Times New Roman"};
export default function CheckoutColumns() {
    return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase" style={{...fontfamily,...fontsize}}>products</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase" style={{...fontfamily,...fontsize}}>name of product</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase" style={{...fontfamily,...fontsize}}>price</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase" style={{...fontfamily,...fontsize}}>quantity</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase" style={{...fontfamily,...fontsize}}>total</p>
                </div>
            </div>
        </div>
    )
}
