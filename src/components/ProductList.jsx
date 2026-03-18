import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { FiPackage, FiGrid } from 'react-icons/fi';

const SkeletonCard = () => (
  <div className="bg-[#141414] rounded-xl overflow-hidden border border-[#262626]">
    <div className="h-56 shimmer" />
    <div className="p-4 space-y-3">
      <div className="h-5 shimmer rounded w-3/4" />
      <div className="h-4 shimmer rounded w-full" />
      <div className="h-4 shimmer rounded w-2/3" />
      <div className="h-10 shimmer rounded-lg mt-4" />
    </div>
  </div>
);

const ProductList = ({ searchQuery = '', activeCategory = null }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load products', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = products
    .filter((p) => p.isActive === true)
    .filter((p) => {
      if (activeCategory && p.category?.toLowerCase() !== activeCategory.toLowerCase()) return false;
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    });

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          {searchQuery || activeCategory ? (
            <>
              <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <FiGrid size={12} />
                {activeCategory ? `Category: ${activeCategory}` : 'Search Results'}
              </p>
              <h2 className="text-3xl font-semibold text-[#FAFAFA]">
                {searchQuery ? `Results for "${searchQuery}"` : `${activeCategory} Products`}
              </h2>
            </>
          ) : (
            <>
              <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <FiGrid size={12} />
                Handpicked for you
              </p>
              <h2 className="text-3xl font-semibold text-[#FAFAFA]">
                Featured Products
              </h2>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-[#A3A3A3]">
            {isLoading ? (
              <span className="text-[#737373]">Loading…</span>
            ) : (
              <span>
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Solid minimal divider */}
      <div className="h-px bg-[#262626] mb-10 w-full" />

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-full bg-[#141414] flex items-center justify-center border border-[#262626]">
            <FiPackage size={28} className="text-[#737373]" />
          </div>
          <p className="text-[#FAFAFA] text-lg font-medium">
            {searchQuery 
              ? `No results for "${searchQuery}"` 
              : activeCategory 
                ? `No products found in ${activeCategory}` 
                : 'No products yet'}
          </p>
          <p className="text-[#A3A3A3] text-sm">
            {searchQuery ? 'Try different keywords' : 'Check back soon!'}
          </p>
        </div>
      )}

      {/* Product grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              p={{
                name: p.name,
                price: p.price,
                imageUrl: p.imageUrl,
                description: p.description,
                id: p._id,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
