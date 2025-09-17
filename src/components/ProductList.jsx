import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products', {
          method: 'get',
          headers: { 'content-type': 'application/json' },
          "Authorization": `Bearer ${token}`,
        });
        
        setProduct(await response.json());

        if (!product) {
          console.log('no products');
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {product
        .filter((p) => p.isActive === true)
        .map((p) => (
          <ProductCard
            key={p.id}
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
  );
};

export default ProductList;
