import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-6">Edit Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Preview */}
        <div className="border rounded-2xl shadow-xl p-6 bg-white">
          <div className="flex flex-col items-center">
            <div className="w-full h-64 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border">
              {form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt={form.name || 'preview'}
                  className="object-contain max-h-full"
                />
              ) : (
                <div className="text-gray-400">Image preview</div>
              )}
            </div>

            <div className="w-full mt-6 text-center">
              <h3 className="text-xl font-semibold">
                {form.name || 'Product name'}
              </h3>
              <p className="text-gray-500 mt-2">
                {form.description || 'Short description will appear here.'}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-green-600">
                  {form.price ? `$${form.price}` : '$0.00'}
                </span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">
                  Stock: {form.stock || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          {message && (
            <div
              className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. Wireless Headphones"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows={5}
                placeholder="A short description of the product"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Electronics"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center gap-4 mt-2">
              <button
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transform hover:-translate-y-0.5 transition"
              >
                {loading ? 'Updating...' : 'Update Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-3 border rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>

            {showDeleteConfirm && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800 mb-3">
                  Confirm product deletion. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-70"
                  >
                    {deleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={deleting}
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full mt-3 bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transform hover:-translate-y-0.5 transition disabled:opacity-70"
            >
              Delete Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
