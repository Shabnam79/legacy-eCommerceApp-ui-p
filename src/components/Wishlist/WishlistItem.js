import React from 'react'

export default function WishlistItem({ item, value }) {
    const { id, company,title, img, price, } = item;
    //const {  removeItem } = value;

    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{ width: "5rem", height: "5rem" }} className="img-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">company : </span>{company}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>{price}
            </div>
            {/**/}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}
