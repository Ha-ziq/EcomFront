import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

const ProductList = ({ searchQuery = '' }) => {
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
        // Keep failure silent in UI; dev log for now
        console.error('Failed to load products', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    // We intentionally do not include `token` in deps to avoid refetch loops; token changes rarely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = products
    .filter((p) => p.isActive === true)
    .filter((p) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    });

  return (
    <section className="bg-background/50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold">
            {searchQuery ? 'Search Results' : 'Featured Products'}
          </h2>
          <div className="text-sm text-muted-foreground">
            {isLoading
              ? 'Loading...'
              : searchQuery
                ? `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} found`
                : 'Updated daily'}
          </div>
        </div>

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No products found matching "{searchQuery}"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search terms
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default ProductList;
