import React, { useEffect, useState } from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import Login from './components/Login';
import userContext from './utils/userContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import Orders from './components/Orders/Orders';
import ProductWishlist from './components/Wishlist/ProductWishlist';
import Dashboard from './components/Admin/dashboard';
import { Provider } from 'react-redux';
import store from './utils/store';
import Signup from './components/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './components/Review/Review';
import AddProducts from './components/Admin/AddProducts';
import Checkout from "./components/Cart/Checkout";
import EditProducts from './components/Admin/EditProducts';
import BillingAddress from "./components/Cart/BillingAddress";
import AddCategories from './components/Admin/AddCategories';
import CategoryList from './components/Admin/CategoryList';
import EditCategory from './components/Admin/EditCategory';
import UserList from './components/Admin/UserList';
import CreateUsers from './components/Admin/CreateUsers';
import EditUsers from './components/Admin/EditUsers';
import { variables } from "../src/utils/variables";

function App() {
  const [user, setUser] = useState({});
  const { getItem } = useLocalStorage();

  useEffect(() => {
    let getUserData = getItem("user");
    if (user.email == undefined && getUserData != null) {
      let parseUserData = JSON.parse(getUserData);
      if (parseUserData != null) {
        setUser({
          userId: parseUserData.userId,
          email: parseUserData.email,
<<<<<<< HEAD
          roleId:parseUserData.roleId,
          userName:parseUserData.userName
=======
          roleId: parseUserData.roleId
>>>>>>> f6c44bc941c529d22daf2265dced5af74c2731ab
        });
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <userContext.Provider
          value={{
            user: user,
            setUser: setUser
          }}
        >
          <Navbar />
          <Outlet />
          <div className='w-100' style={{ position: 'absolute', top: '75px' }}>
            <Routes>
              {
                user.roleId == variables.ROLE_ADMIN
                  ?
                  <>
                    <Route exact path="/" element={<ProductList />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/wishlist" element={<ProductWishlist />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/review/:productId/:orderId" element={<Review />} />

                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/addproduct" element={<AddProducts />} />
                    <Route path="/admin/editproduct/:productId" element={<EditProducts />} />
                    <Route path="/admin/CategoryList" element={<CategoryList />} />
                    <Route path="/admin/AddCategories" element={<AddCategories />} />
                    <Route path="/admin/EditCategory/:categoryId" element={<EditCategory />} />
                    <Route path="/admin/UserList" element={<UserList />} />
                    <Route path="/admin/CreateUsers" element={<CreateUsers />} />
                    <Route path="/admin/EditUsers/:UserRoleId" element={<EditUsers />} />
                  </>
                  :
                  <>
                    <Route exact path="/" element={<ProductList />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/wishlist" element={<ProductWishlist />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/review/:productId/:orderId" element={<Review />} />
                  </>
              }

              <Route exact
                path="/"
                element={
                  <ProductList />
                }
              />
              <Route
                path="/details"
                element={
                  <Details />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart />
                }
              />
              <Route
                path="/login"
                element={
                  <Login />
                }
              />
              <Route
                path="/orders"
                element={
                  <Orders />
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProductWishlist />
                }
              />
              <Route
                path="/signup"
                element={
                  <Signup />
                }
              />
              <Route
                path="/review/:productId/:orderId"
                element={
                  <Review />
                }
              />
              <Route
                path="/checkout"
                element={
                  <Checkout />
                }
              />
              <Route
                path="/billingAddress"
                element={
                  <BillingAddress />
                }
              />
              <Route element={<Default />} />
            </Routes>
          </div>
          <Modal />
        </userContext.Provider>
      </Provider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
