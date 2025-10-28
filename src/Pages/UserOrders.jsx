import { useEffect, useState } from 'react';

const UserOrders = () => {
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        // Fetch all orders
        const response = await fetch('http://localhost:3000/api/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!data?.order) throw new Error('Invalid response');

        setOrders(data.order);

        // Extract all product IDs from all orders
        const allProductIds = data.order.flatMap((order) =>
          order.items.map((item) => item.productId)
        );

        // Remove duplicates
        const uniqueProductIds = [...new Set(allProductIds)];

        // Fetch details for all unique products
        const productResponses = await Promise.all(
          uniqueProductIds.map(async (id) => {
            const res = await fetch(`http://localhost:3000/api/products/${id}`);
            const productData = await res.json();
            return { id, productData };
          })
        );

        // Create a product lookup object
        const productMap = productResponses.reduce(
          (acc, { id, productData }) => {
            acc[id] = productData;
            return acc;
          },
          {}
        );

        setProducts(productMap);
      } catch (err) {
        console.error('Error fetching orders or products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg text-gray-800">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-3">
              {order.items.map((item, i) => {
                const product = products[item.productId];
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      {product?.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-md border border-gray-200"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                          No Image
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-800">
                          {product?.name || 'Unknown Product'}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-gray-700">
                      ${item.priceAtPurchase.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between border-t border-gray-200 mt-4 pt-3 font-semibold text-base text-gray-800">
              <p>Total:</p>
              <p>${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
