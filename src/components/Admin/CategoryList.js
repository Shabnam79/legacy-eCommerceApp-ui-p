import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from 'react';
import { Button, button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  
  
    return (
        <>
            <div style={{ margin: "10rem" }}>
                <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>
                            CATEGORY
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        {/* {
                            CartData && CartData.length > 0 ?

                                CartData.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.title}
                                            </td>
                                            <td>
                                                <Link to={`/admin/EditCategory/${item.productId}`}>
                                                    <Button>EDIT</Button>
                                                </Link>
                                                <Button onClick={() => removeProductHandler(item)}>DELETE</Button>
                                            </td>

                                        </tr>
                                    )

                                }) : null
                        } */}
                    </tbody>
                </Table>
                <br></br>
                <Link className='d-grid gap-2' to='/admin/AddCategory'>
                    <Button size="lg">Add Category</Button>
                </Link>
            </div>
        </>

  )
}
