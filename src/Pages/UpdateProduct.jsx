import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { FiImage, FiTrash2 } from 'react-icons/fi';

const initialState = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  imageUrl: '',
};

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState(null);

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
        return;
      }
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
      navigate('/');
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        setForm({
          name: data.name || '',
          description: data.description || '',
          category: data.category || '',
          price: data.price ?? '',
          stock: data.stock ?? '',
          imageUrl: data.imageUrl || '',
        });
      } catch (err) {
        console.error(err);
        setMessage({ type: 'error', text: 'Could not load product' });
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
    if (err) return setMessage({ type: 'error', text: err });

    const token = localStorage.getItem('token');
    if (!token) {
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

      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Product updated successfully' });
        setTimeout(() => navigate(`/products/${id}`), 1000);
      } else {
        setMessage({ type: 'error', text: data?.message || 'Update failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setMessage(null);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Product deleted successfully', {
          position: 'top-center',
          style: { background: '#141414', color: '#FAFAFA', border: '1px solid #262626' }
        });
        setTimeout(() => navigate('/products'), 900);
      } else {
        const errorMessage = data?.message || data?.error || 'Delete failed';
        toast.error(errorMessage, { position: 'top-center' });
        setMessage({
          type: 'error',
          text: errorMessage,
        });
      }
    } catch (err) {
      toast.error(err.message || 'Network error', { position: 'top-center' });
      setMessage({ type: 'error', text: err.message || 'Network error' });
    } finally {
      setShowDeleteConfirm(false);
      setDeleting(false);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#FAFAFA]">Edit Product</h1>
          
          <button
            type="button"
            disabled={deleting}
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
          >
            <FiTrash2 size={16} /> Delete Product
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="mb-8 rounded-xl border border-red-500/50 bg-[#1A0B0B] p-6 max-w-lg shadow-xl shadow-red-900/10">
            <h3 className="text-lg font-semibold text-red-500 mb-2">Confirm Deletion</h3>
            <p className="text-sm text-[#A3A3A3] mb-6">
              Are you sure you want to permanently delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-[#262626] text-[#FAFAFA] px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3.5 px-6 rounded-lg text-sm font-medium border border-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 px-6 rounded-lg text-sm font-medium bg-[#3B82F6] text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
