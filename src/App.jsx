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
import Checkout from './Pages/Checkout';

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
          <Products />
          <Footer />
        </div>
      ),
    },
    {
      path: '/products/:id',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <ProductDetails />
          <Footer />
        </div>
      ),
    },
    {
      path: '/cart',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <Cart />
          <Footer />
        </div>
      ),
    },
    {
      path: '/Checkout',
      element: (
        <div>
          <Navbar cartCount={cartCount} />
          <Checkout />
          <Footer />
        </div>
      ),
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
