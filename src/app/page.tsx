"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import { RootState } from './store/store';

import AddProductForm from './components/AddProductForm';
import Dashboard from './components/Dashoard';
const Home = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const products = useSelector((state: RootState) => state.inventory.products);

  const toggleAddProductForm = () => {
    setShowAddProductForm(prev => !prev);
  };

  const handleCategorySelect = (category: string) => {
    console.log('Category Selected:', category); // Debugging
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'all' || selectedCategory === null
    ? products
    : products.filter(product => product.category === selectedCategory);

  console.log('Filtered Products:', filteredProducts); // Debugging

  return (
    <div className="container mx-auto p-4">


      <h1 className="text-2xl font-bold mb-4">Inventory Management System</h1>
      
      <Dashboard 
        onToggleForm={toggleAddProductForm} 
        productCount={products.length} 
        onCategorySelect={handleCategorySelect} 
      />
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {showAddProductForm && (
          <div className="w-full md:w-1/3">
            <AddProductForm onClose={() => setShowAddProductForm(false)} />
          </div>
        )}

        <div className="w-full md:w-2/3">
          <ProductList products={filteredProducts} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Product Charts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BarChart />
          <PieChart />
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Home;