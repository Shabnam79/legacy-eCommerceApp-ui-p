import React, { useContext, useEffect, useState } from 'react'

function AdminColumns() {

    return (
        <>
            <thead style={{ backgroundColor: "lightgray", height: "40px" }}>
                <tr>
                    <th>Category</th>
                    <th>Products</th>
                    <th>Name of Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
        </>
    )
}

export default AdminColumns;