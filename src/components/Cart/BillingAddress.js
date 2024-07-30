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
    email: '',
    gender: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phone: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchData();
    document.title = "Shipping Address";
  }, [user.userId]);

  const fetchData = async () => {
    if (user.userId) {
      try {
        const response = await axios.get(variables.API_URL_NEW + 'Product/GetShippingAddressByUserId', {
          params: { "userId": user.userId }
        });
        const data = response.data;
        if (data) {
          setFormData({
            id: data.id || '',
            email: data.email || '',
            gender: data.gender || '',
            address1: data.address1 || '',
            address2: data.address2 || '',
            city: data.city || '',
            state: data.state || '',
            country: data.country || '',
            pinCode: data.pinCode || '',
            phone: data.phone || ''
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userId) {
      if (formData.id) {
        updateBillingAddressService(formData);
      } else {
        addBillingAddressService({
          userId: user.userId,
          ...formData
        });
      }
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className="wrapper w-100">
          <h2 className='text-title'>
            <center>Shipping Address</center>
          </h2>
          <form className='w-100 my-3 p-3 billing-address-form' onSubmit={handleSubmit}>
            <input type="text" hidden id="id" name="id" value={formData.id} />
            <div className="d-flex w-100 justify-content-center my-2">
              <div className='mr-3 billingAddressLabelInput' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="phone">Phone</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='ml-3 billingAddressLabelInput' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="gender">Gender</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className='d-flex w-100 justify-content-center my-2'>
              <div className='billingAddressLabelInput' style={{ width: '63%' }}>
                <label className='billing-address-label' htmlFor="email">Email</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center my-2">
              <div className='billingAddressLabelInput' style={{ width: '63%' }}>
                <label className='billing-address-label' htmlFor="address1">Address 1</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className='d-flex w-100 justify-content-center my-2'>
              <div className='billingAddressLabelInput' style={{ width: '63%' }}>
                <label className='billing-address-label' htmlFor="address2">Address 2</label>
                <input
                  className='w-100 billing-address-input'
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
              <div className='mr-3 billingAddressLabelInput' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="city">City</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='ml-3 billingAddressLabelInput' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="state">State</label>
                <input
                  className='w-100 billing-address-input'
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
              <div className='mr-3 billingAddressLabelInput' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="country">Country</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='ml-3 billingAddressLabelInput' style={{ width: '30%' }}>
                <label className='billing-address-label' htmlFor="pinCode">ZIP Code</label>
                <input
                  className='w-100 billing-address-input'
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
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
