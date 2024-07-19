import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

const OrdersItem = ({ items }) => {
    const [refNumber, setRefNumber] = useState();
    const [orderTotal, setOrderTotal] = useState();
    const [dateTime, setDateTime] = useState();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (items && items.length > 0) {
            setRefNumber(items[0].orderRefNo);
            setOrderTotal(items[0].orderTotal);
            // Format date and time
            const formattedDateTime = formatDate(items[0].orderDate);
            setDateTime(formattedDateTime);
        }
    }, [items]);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    // Function to format date and time with month name
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);

        // Get day, month, year
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        // Get time
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;

        // Format the date
        const formattedDateTime = `${day} ${month} ${year} ${time}`;
        return formattedDateTime;
    };


    return (
        <Accordion>
            <div>
                <div className='referenceNumberArea' onClick={toggleAccordion}>
                    <div>
                        <p className='m-0'><b>Reference Number:</b> {refNumber}</p>
                        <p className='m-0 pt-2'><b>Date/Time:</b> {dateTime}</p>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <div className='symbol'>
                            <p className='font-weight-bold' style={{ margin: '0px 0px 3px 0px' }}>{expanded ? '-' : '+'}</p>
                        </div>
                        <p className='m-0 pt-2'><b>Total:</b> ${orderTotal}</p>
                    </div>
                </div>
                <Accordion.Collapse eventKey="0" in={expanded}>
                    <div>
                        {items.map(item => (
                            <div key={item.id} className='m-3 ordersCard'>
                                <Card className='placedOrder-Card'>
                                    <b style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "0px",
                                        backgroundColor: "#FFFFFF",
                                        padding: "5px 7.5px",
                                        color: '#007185'
                                    }}>
                                        Order Placed
                                    </b>
                                    <Card.Img variant="top" src={`data:image/png;base64, ${item.imageData}`} style={{ height: "270px", borderRadius: '0px' }} />
                                    <Card.Body className='p-0'>
                                        <div className='cardBodyArea'>
                                            <Card.Title>{item.name}</Card.Title>
                                            <p>
                                                <b className='mr-1'>Company Name:</b>
                                                <span>{item.companyName}</span>
                                            </p>
                                            <p>
                                                <b className='mr-1'>Order Id:</b>
                                                <span>{item.orderId}</span>
                                            </p>
                                        </div>
                                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                                            <Link className='rateProductButton' onClick={() => openInNewTab(`/review/${item.productId}/${item.orderId}`)}>
                                                <Button className='RateProduct-Button'>&#9733; Rate Product</Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Accordion.Collapse>
            </div>
        </Accordion>
    );
}

export default OrdersItem;
