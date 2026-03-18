import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FiImage } from 'react-icons/fi';

const initialState = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  imageUrl: '',
};

export default function AddProduct() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (!decoded || decoded.role !== 'admin') {
        navigate('/home');
      }
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.description.trim()) return 'Description is required';
    if (!form.category.trim()) return 'Category is required';
    if (
      !form.price ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    )
      return 'Price must be a positive number';
    if (
      !form.stock ||
      Number.isNaN(Number(form.stock)) ||
      Number(form.stock) < 0
    )
      return 'Stock must be zero or a positive integer';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) {
      setMessage({ type: 'error', text: err });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage({ type: 'error', text: 'You must be logged in as admin' });
      navigate('/');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl || undefined,
      };

      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Product created successfully' });
        setForm(initialState);
        setTimeout(() => navigate('/products'), 1000);
      } else {
        setMessage({
          type: 'error',
          text: data?.message || data?.error || 'Failed to create product',
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = "text", placeholder, isTextarea = false, rows = 3 }) => (
    <div>
      <label className="block mb-2 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          rows={rows}
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#262626] rounded-lg text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          step={type === "number" ? "0.01" : undefined}
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#262626] rounded-lg text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none focus:border-[#3B82F6] transition-colors"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#FAFAFA] mb-8">Add New Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Preview */}
          <div className="md:col-span-5 lg:col-span-4 bg-[#141414] border border-[#262626] rounded-2xl p-6 sticky top-24">
            <h2 className="text-sm font-semibold text-[#737373] uppercase tracking-wider mb-6">
              Live Preview
            </h2>
            <div className="flex flex-col">
              <div className="w-full h-64 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-[#262626] p-4 mb-6">
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt={form.name || 'preview'}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#A3A3A3]">
                    <FiImage size={32} opacity={0.5} />
                    <span className="text-xs">Image URL required</span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#FAFAFA] line-clamp-2 leading-tight min-h-[1.5rem]">
                  {form.name || 'Product Name'}
                </h3>
                <p className="text-sm text-[#A3A3A3] mt-2 line-clamp-2 min-h-[2.5rem]">
                  {form.description || 'Product description will appear here.'}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#262626] pt-4">
                  <span className="text-xl font-semibold text-[#FAFAFA]">
                    {form.price ? `$${form.price}` : '$0.00'}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#1A1A1A] border border-[#262626] rounded-full text-[#A3A3A3]">
                    Stock: {form.stock || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-7 lg:col-span-8 bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8">
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm border font-medium ${
                  message.type === 'error'
                    ? 'bg-red-500/10 border-red-500/20 text-red-500'
                    : 'bg-green-500/10 border-green-500/20 text-emerald-500'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField label="Product Name" name="name" placeholder="e.g. Minimalist Keyboard" />
              <InputField label="Description" name="description" placeholder="A brief description of this item" isTextarea rows={4} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InputField label="Category" name="category" placeholder="Electronics" />
                <InputField label="Price (USD)" name="price" type="number" placeholder="0.00" />
                <InputField label="Stock Quantity" name="stock" type="number" placeholder="0" />
              </div>

              <InputField label="Image URL" name="imageUrl" placeholder="https://example.com/image.jpg" />

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="flex-1 py-3.5 px-6 rounded-lg text-sm font-medium border border-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 px-6 rounded-lg text-sm font-medium bg-[#3B82F6] text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
