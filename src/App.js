import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
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
import { Provider } from 'react-redux';
import store from './utils/store';
import Signup from './components/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './components/Review/Review';

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
          email: parseUserData.email
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
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/details" component={Details} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/orders" component={Orders} />
            <Route path="/wishlist" component={ProductWishlist} />
            <Route path="/signup" component={Signup} />
            <Route path="/review:orderId" component={Review} />
            <Route component={Default} />
          </Switch>
          <Modal />
        </userContext.Provider>
      </Provider>
      {/* <ToastContainer position="top-right" /> */}
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
