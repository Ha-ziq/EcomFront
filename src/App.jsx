import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetail';
import Cart from './Pages/Cart';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import OrderDetails from './Pages/OrderDetails';
import UserOrders from './Pages/UserOrders';
import AddProduct from './Pages/AddProduct';
import UpdateProduct from './Pages/UpdateProduct';
import Profile from './Pages/Profile';
import AuthCallback from './Pages/AuthCallback';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <Login setCartCount={setCartCount} />
        </div>
      ),
    },
    {
      path: '/add-product',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <AddProduct />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <Home />
        </div>
      ),
    },
    {
      path: '/products',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <Products />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/products/:id',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <ProductDetails />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/products/:id/edit',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <UpdateProduct />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/cart',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <Cart />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/order-details',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <OrderDetails />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/MyOrders',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <div className="pt-16">
            <UserOrders />
            <Footer />
          </div>
        </div>
      ),
    },
    {
      path: '/profile',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <Profile />
          <Footer />
        </div>
      ),
    },
    {
      path: '/auth/callback',
      element: <AuthCallback />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
