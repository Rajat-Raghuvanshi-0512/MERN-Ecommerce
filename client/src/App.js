import Navbar from './components/Navbar/Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import TopLoader from './components/TopLoader';
import Product from './components/Products/Product';
import ProductInfo from './components/Products/Product Info/ProductInfo';
import Login from './components/Login-SignUp/Login';
import Register from './components/Login-SignUp/Register';
import store from './Redux/store';
import { useEffect, useState } from 'react';
import { loadUser } from './Redux/Actions/userAction';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/Profile/UpdateProfile';
import UpdatePassword from './components/Profile/UpdatePassword';
import ForgetPassword from './components/Login-SignUp/ForgetPassword';
import ResetPassword from './components/Login-SignUp/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Shipping/Shipping';
import ConfirmOrder from './components/Shipping/ConfirmOrder';
import Payment from './components/Shipping/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Orders/OrderSuccess';
import MyOrders from './components/Orders/MyOrders';
import OrderInfo from './components/Orders/OrderInfo';
import DashBoard from './components/Admin/DashBoard/DashBoard';
import ProductsList from './components/Admin/Products/ProductsList';
import OrderList from './components/Admin/Orders/OrderList';
import UserList from './components/Admin/Users/UserList';
import Error from './components/Error';
import CreateProduct from './components/Admin/Products/CreateProduct';
import EditProduct from './components/Admin/Products/EditProduct';
import ScrollToTop from './components/ScrollToTop';
import UpdateOrderStatus from './components/Admin/Orders/UpdateOrderStatus';
import UpdateUser from './components/Admin/Users/UpdateUser';
import ReviewsList from './components/Admin/Reviews/ReviewsList';
import Contact from './components/Contact/Contact';
import About from './components/About me/About';

function App() {

  const [stripeAPIKey, setStripeAPIKey] = useState("");

  const getstripeApi = async () => {

    const res = await fetch("/api/payment/apiKey", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { stripeApiKey } = await res.json()
    setStripeAPIKey(stripeApiKey)
  }

  useEffect(() => {
    store.dispatch(loadUser())
    getstripeApi()
  }, [])

  window.addEventListener("contextmenu", e => e.preventDefault())

  return (
    <>
      <Router>
        <Navbar />
        <TopLoader />
        <ScrollToTop />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Product />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route exact path="/product/:id" element={<ProductInfo />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/password/forgot" element={<ForgetPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/aboutme" element={<About />} />


          {/* Logged in user routes */}
          <Route element={<ProtectedRoute />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/me/update" element={<UpdateProfile />} />
            <Route exact path="/password/change" element={<UpdatePassword />} />
            <Route exact path="/shipping" element={<Shipping />} />
            {stripeAPIKey && <Route exact path="/process/payment" element={
              <Elements stripe={loadStripe(stripeAPIKey)}>
                <Payment />
              </Elements>
            } />}
            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/myorder/:id" element={<OrderInfo />} />
          </Route>


          {/* Admin only routes */}
          <Route element={<ProtectedRoute admin={true} />}>
            <Route exact path="/admin/dashboard" element={<DashBoard />} />
            <Route exact path="/admin/product/all" element={<ProductsList />} />
            <Route exact path="/admin/orders" element={<OrderList />} />
            <Route exact path="/admin/users" element={<UserList />} />
            <Route exact path="/admin/product/create" element={<CreateProduct />} />
            <Route exact path="/product/edit/:id" element={<EditProduct />} />
            <Route exact path="/user/edit/:id" element={<UpdateUser />} />
            <Route exact path="/admin/order/:id" element={<UpdateOrderStatus />} />
            <Route exact path="/admin/reviews" element={<ReviewsList />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
