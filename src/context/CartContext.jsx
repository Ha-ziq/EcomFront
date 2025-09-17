import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  // const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data) {
        toast.success('product added to cart!');
        console.log(data.message);
      }

      setCartCount(data.cart.length);
    } catch (error) {
      console.log({ Error: error });
    }
  };

  const fetchCart = async () => {
    setLoading(true);
    if (!user) {
      setCart({ items: [], totalPrice: 0 });
      setCartCount(0);
      setLoading(false);
      return;
    }
    try {
      if (user) {
        const response = await fetch('http://localhost:3000/api/cart', {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCart(data);
        data.items ? setCartCount(data.items.length) : setCartCount(0);
      }
    } catch (err) {
      console.log({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, addToCart, fetchCart, cart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
