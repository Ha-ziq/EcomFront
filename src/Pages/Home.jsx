import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ProductList from '@/components/ProductList';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <ProductList searchQuery={searchQuery} />
      <Footer />
    </>
  );
};

export default Home;
