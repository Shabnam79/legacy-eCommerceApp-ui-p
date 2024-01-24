import React, { useState, useContext, useEffect } from 'react';
import { db } from "../../firebase/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import userContext from "../../utils/userContext";
import Button from 'react-bootstrap/Button';
import { variables } from "../../utils/variables";
import axios from 'axios';

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
          return setFormData({
            id: response.data[0].id,
            firstName: response.data[0].firstName,
            lastName: response.data[0].lastName,
            address: response.data[0].address,
            address2: response.data[0].address2,
            city: response.data[0].city,
            state: response.data[0].state,
            country:response.data[0].country,
            zipCode: response.data[0].zipCode,
          });
        }).catch(function (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            toast.error("Please Enter correct Values", {
              autoClose: 1000,
            });
          }
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
      debugger
      console.log(payload);
      axios({
        method: 'put',
        url: variables.API_URL + 'Address/UpdateBillingAddress',
        data: payload,
      }).then(function (response) {
        debugger
        console.log(response);
        toast.success(`Signup successfully`, {
          autoClose: 3000,
        });
      }).catch(function (error) {
        debugger
        console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error("Email already in use.", {
            autoClose: 1000,
          });
        }
      });
    }
    else if (user.userId && formData.id == null) {
      debugger
      console.log(user);
      axios({
        method: 'post',
        url: variables.API_URL + 'Address/AddBillingAddress',
        data: payload,

      }).then(function (response) {
        debugger
        console.log(response);
        toast.success(`Signup successfully`, {
          autoClose: 3000,
        });
      }).catch(function (error) {
        debugger
        console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error("", {
            autoClose: 1000,
          });
        }
      });
    }
    else { }
  }
  
  return (
    <div className="wrapper">
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" hidden id="id"
              name="id"
              value={formData.id}/>
        <div className="mb-3 row">
          <div className='col-md-3'>
            <label htmlFor="firstName">First Name</label><br></br>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="lastName">Last Name</label><br></br>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className='col-md-3'>
            <label htmlFor="address">Address 1</label><br></br>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="address2">Address 2</label><br></br>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className='col-md-3'>
            <label htmlFor="city">City</label><br></br>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="state">State</label><br></br>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className='col-md-3'>
            <label htmlFor="state">Country</label><br></br>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="zipCode">ZIP Code</label><br></br>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button variant="primary" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default BillingAddressForm;