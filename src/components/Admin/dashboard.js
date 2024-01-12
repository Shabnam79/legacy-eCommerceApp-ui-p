import { Button, button, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { storeProducts } from '../../data.js'
import React, { useContext, useEffect, useState } from 'react'
import userContext from "../../utils/userContext.js";
import { getProductByIdService } from '../../firebase/services/product.service.js';
import { deleteRecordFromFirebaseService, getProductsServiceByUserId } from '../../firebase/services/product.service';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { removeFromCart } from '../../utils/cartSlice';
import AdminColumns from './AdminColumns.js';
import { Link } from 'react-router-dom';

function Dashboard() {

    const { user } = useContext(userContext);
    const dispatch = useDispatch();
    const [ProductData, setProductData] = useState([]);
    const [ProductIdValue, setProductIdValue] = useState('');

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        fetchStoreProductData();
        document.title = "Admin - Product Management"
    }, []);

    const fetchStoreProductData = async () => {
            let data = await getProductsServiceByUserId();
            if (data != undefined) {
                setProductData(data);
            }
    }

    const removeProductHandler = async (item) => {
  
        try {
            const deleteStroeProcduct= await getProductByIdService(item.id);
            await deleteRecordFromFirebaseService(deleteStroeProcduct);
            toast.warning(
                `Product removed from the admin List.`,
                {
                    autoClose: 1000,
                }
            );
            fetchStoreProductData();
            dispatch(removeFromCart(item));
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div style={{ margin: "10rem" }}>
                <Table striped bordered hover size='sm'>
                    <AdminColumns />
                    <tbody>
                        {
                            ProductData && ProductData.length > 0 ?

                            ProductData.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.category}
                                            </td>
                                            <td>
                                            
                                                <img src={item.img} style={{ width: "10rem", height: "10rem" }} className="img-fluid" alt="product" />
                                                    
                                            </td>
                                            <td>
                                                {item.title}
                                            </td>
                                            <td>
                                                {item.price}
                                            </td>
                                            <td>
                                                {item.quantity}
                                            </td>
                                            <td>
                                                {item.info}
                                            </td>
                                            <td>
                                                <Link to={`/admin/editproduct/${item.productId}`}>
                                                    <Button>EDIT</Button>
                                                </Link>
                                                <Button onClick={() => removeProductHandler(item)}>DELETE</Button>
                                            </td>

                                        </tr>
                                    )

                                }) : null
                        }
                    </tbody>
                </Table>
                <br></br>
                <Link className='d-grid gap-2' to='/admin/addproduct'>
                    <Button size="lg">Add Product</Button>
                </Link>
            </div>
        </>
    );

}



export default Dashboard;