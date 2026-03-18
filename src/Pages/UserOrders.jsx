import { useEffect, useState } from 'react';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
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

        const allProductIds = data.order.flatMap((order) =>
          order.items.map((item) => item.productId)
        );
        const uniqueProductIds = [...new Set(allProductIds)];

        const productResponses = await Promise.all(
          uniqueProductIds.map(async (id) => {
            const res = await fetch(`http://localhost:3000/api/products/${id}`);
            const productData = await res.json();
            return { id, productData };
          })
        );

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
      <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center text-[#A3A3A3] text-sm">
        <span className="w-5 h-5 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mr-3" />
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#FAFAFA] mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-[#141414] border border-[#262626] rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#737373] mb-4">
              <FiPackage size={24} />
            </div>
            <p className="text-[#FAFAFA] text-lg font-medium mb-2">No orders found</p>
            <p className="text-[#A3A3A3] text-sm mb-6">Looks like you haven't bought anything yet.</p>
            <Link to="/products" className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#141414] border border-[#262626] rounded-2xl p-5 sm:p-6 card-hover"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
                  <div>
                    <h2 className="text-sm font-semibold text-[#FAFAFA]">
                      Order ID <span className="text-[#737373] ml-1">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                    </h2>
                    <p className="text-xs text-[#A3A3A3] mt-1">Placed carefully with NexShop</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                      order.status === 'pending'
                        ? 'bg-[#1A1A0A] text-[#FBBF24] border-[#453A1B]'
                        : order.status === 'delivered'
                          ? 'bg-[#0A1A0A] text-[#22C55E] border-[#1A2F1A]'
                          : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#262626]'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Items List */}
                <div className="border-t border-[#262626] pt-5 space-y-4">
                  {order.items.map((item, i) => {
                    const product = products[item.productId];
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]"
                      >
                        <div className="flex items-center gap-4">
                          {product?.imageUrl ? (
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1.5 flex-shrink-0">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 bg-[#141414] border border-[#262626] rounded-lg flex items-center justify-center text-[#737373]">
                              <FiShoppingBag size={18} />
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-sm text-[#FAFAFA] line-clamp-1">
                              {product?.name || 'Unknown Product'}
                            </p>
                            <p className="text-[#737373] text-xs mt-0.5">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="font-medium text-sm text-[#FAFAFA] pr-2">
                          ${item.priceAtPurchase.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Order Footer */}
                <div className="flex justify-between items-center border-t border-[#262626] mt-5 pt-4">
                  <p className="text-sm font-medium text-[#A3A3A3]">Order Total</p>
                  <p className="text-lg font-bold text-[#3B82F6]">${order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
