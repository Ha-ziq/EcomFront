import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

const OrderDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Phone must be at least 10 digits';
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.postalCode.trim())
      newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fill in all required fields correctly', {
        position: 'top-center',
        style: { background: '#141414', color: '#FAFAFA', border: '1px solid #262626' }
      });
      return;
    }

    if (!token) {
      navigate('/');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!', { 
          position: 'top-center',
          style: { background: '#141414', color: '#FAFAFA', border: '1px solid #262626' }
        });
        setTimeout(() => navigate('/MyOrders'), 1000);
      } else {
        console.error('Order placement error:', data);
        toast.error(data?.message || data?.error || 'Failed to place order', {
          position: 'top-center',
          style: { background: '#141414', color: '#FAFAFA', border: '1px solid #262626' }
        });
      }
    } catch (err) {
      console.error('Network error:', err);
      toast.error(err.message || 'Network error', { 
        position: 'top-center',
        style: { background: '#141414', color: '#FAFAFA', border: '1px solid #262626' }
      });
    } finally {
      setLoading(false);
    }
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-32 px-4 flex justify-center">
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 bg-[#141414] border border-[#262626] rounded-2xl shadow-lg p-10 max-w-2xl w-full">
          <p className="text-lg font-medium text-[#A3A3A3]">
            Your cart is currently{' '}
            <span className="font-bold text-[#FAFAFA]">empty</span>.
          </p>
          <button onClick={() => navigate('/products')} className="mt-4 bg-[#3B82F6] text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block mb-2 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">
        {label} *
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-lg text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none transition-colors ${
          errors[name]
            ? 'border-red-500 focus:border-red-400'
            : 'border-[#262626] focus:border-[#3B82F6]'
        }`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1.5">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#FAFAFA] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Order Summary */}
          <div className="lg:col-span-8">
            <div className="bg-[#141414] rounded-2xl border border-[#262626] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#FAFAFA] mb-6">Shipping Information</h2>

              <form onSubmit={handlePlaceOrder} className="space-y-5">
                <InputField label="Full Name" name="fullName" placeholder="John Doe" />
                <InputField label="Email" name="email" type="email" placeholder="john@example.com" />
                <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                <InputField label="Street Address" name="streetAddress" placeholder="123 Main Street" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InputField label="City" name="city" placeholder="New York" />
                  <InputField label="State/Province" name="state" placeholder="NY" />
                  <InputField label="Postal Code" name="postalCode" placeholder="10001" />
                </div>

                <InputField label="Country" name="country" placeholder="United States" />

                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[#262626]">
                  <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="flex-1 border border-[#262626] text-[#A3A3A3] px-6 py-3.5 rounded-xl hover:bg-[#1A1A1A] hover:text-[#FAFAFA] transition-colors font-medium text-sm"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#3B82F6] text-white px-6 py-3.5 rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#141414] rounded-2xl border border-[#262626] p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-[#FAFAFA] mb-6">Order Summary</h2>

              <div className="space-y-4 border-b border-[#262626] pb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <span className="text-[#A3A3A3] pr-4">
                      {item.name} <span className="text-[#737373]">x {item.quantity}</span>
                    </span>
                    <span className="font-medium text-[#FAFAFA] whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Subtotal</span>
                  <span className="text-[#FAFAFA]">${cart.totalPrice?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Shipping</span>
                  <span className="text-[#22C55E]">Free</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Tax</span>
                  <span className="text-[#FAFAFA]">$0.00</span>
                </div>
                <div className="border-t border-[#262626] pt-4 mt-4 flex justify-between items-center text-xl font-bold">
                  <span className="text-[#FAFAFA]">Total</span>
                  <span className="text-[#3B82F6]">${cart.totalPrice?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
