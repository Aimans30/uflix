'use client';

import { useState } from 'react';

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    'Living Room',
    'Bedroom',
    'Dining',
    'Office',
    'Outdoor',
    'Storage',
  ];

  const materials = ['Wood', 'Metal', 'Fabric', 'Leather', 'Glass'];
  const colors = ['Beige', 'Brown', 'Black', 'White', 'Gray', 'Blue'];

  return (
    <div className="bg-white p-6 rounded-lg border border-border">
      <h3 className="text-xl font-bold mb-6">Filters</h3>

      <div className="mb-8">
        <h4 className="font-semibold mb-4">Price Range</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-neutral-dark">
            <span>₹0</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category));
                  }
                }}
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4">Material</h4>
        <div className="space-y-2">
          {materials.map((material) => (
            <label key={material} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <span className="text-sm">{material}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className="px-3 py-1 border border-border rounded-full text-sm hover:border-accent hover:text-accent transition-colors"
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full bg-accent hover:bg-secondary text-white py-2 rounded-md font-medium transition-colors">
        Apply Filters
      </button>
    </div>
  );
}
