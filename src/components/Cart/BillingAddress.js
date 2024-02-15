import React, { useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify";
import userContext from "../../utils/userContext";
import Button from 'react-bootstrap/Button';
import { variables } from "../../utils/variables";
import axios from 'axios';
import {
  addBillingAddressService,
  updateBillingAddressService
} from '../../firebase/services/category.service';

const BillingAddressForm = () => {
  const { user } = useContext(userContext);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    fetchData();
    document.title = "Shipping Address";
  }, [user.userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fetchData = async () => {
    if (user.userId) {
      axios.get(variables.API_URL + 'Address/GetBillingAddressByUserId', { params: { "userId": user.userId } })
        .then(function (response) {
          if (response.data[0] != null) {
            return setFormData({
              id: response.data[0].id,
              firstName: response.data[0].firstName,
              lastName: response.data[0].lastName,
              address: response.data[0].address,
              address2: response.data[0].address2,
              city: response.data[0].city,
              state: response.data[0].state,
              country: response.data[0].country,
              zipCode: response.data[0].zipCode,
            });
          }
        }).catch(function (error) {
          toast.error(error.message, {
            autoClose: 1000,
          });
        });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
      userId: user.userId
    }
    if (user.userId && formData.id) {
      updateBillingAddressService(payload);
    }
    else if (user.userId && formData.id == "") {
      addBillingAddressService(payload);
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="wrapper w-100">
          <h2 className='text-title'>
            <center>Shipping Address</center>
          </h2>
          <form className='w-100 my-3 p-3 billing-address-form' onSubmit={handleSubmit}>
            <input type="text" hidden id="id"
              name="id"
              value={formData.id} />
            <div className="d-flex justify-content-center w-100 my-2">
              <div className='mr-3' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="firstName">First Name</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='ml-3' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="lastName">Last Name</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center my-2">
              <div className='' style={{ width: '63%' }}>
                <label className='billing-address-label' htmlFor="address">Address 1</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className='d-flex w-100 justify-content-center my-2'>
              <div className='' style={{ width: '63%' }}>
                <label className='billing-address-label' htmlFor="address2">Address 2</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center my-2">
              <div className='mr-3' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="city">City</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='ml-3' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="state">State</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center my-2">
              <div className='mr-3' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="state">Country</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='ml-3' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="zipCode">ZIP Code</label><br></br>
                <input
                  className='w-100 py-1 px-2 billing-address-input'
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className='d-flex justify-content-center w-100 my-3'>
              <div style={{ width: '63%' }}>
                <Button className="billing-address-submit-button" type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingAddressForm;