"use client";

import PageTitle from "@/components/sales/page-title/PageTitle";
import { Edit, Eye, MoreVertical, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// Mock data - replace with API
const mockProducts = [
  {
    id: 1,
    name: "Rice (25kg)",
    sku: "RIC-25KG",
    category: "Grains",
    price: 1250,
    stock: 15,
    minStock: 5,
  },
  {
    id: 2,
    name: "Oil (5L)",
    sku: "OIL-5L",
    category: "Cooking",
    price: 900,
    stock: 3,
    minStock: 5,
  },
  {
    id: 3,
    name: "Sugar (2kg)",
    sku: "SUG-2KG",
    category: "Sweeteners",
    price: 250,
    stock: 42,
    minStock: 10,
  },
  {
    id: 4,
    name: "Flour (10kg)",
    sku: "FLR-10KG",
    category: "Grains",
    price: 850,
    stock: 0,
    minStock: 5,
  },
  {
    id: 5,
    name: "Salt (1kg)",
    sku: "SLT-1KG",
    category: "Spices",
    price: 80,
    stock: 27,
    minStock: 10,
  },
  {
    id: 6,
    name: "Tea (250g)",
    sku: "TEA-250G",
    category: "Beverages",
    price: 120,
    stock: 35,
    minStock: 10,
  },
  {
    id: 7,
    name: "Milk Powder (500g)",
    sku: "MLK-500G",
    category: "Dairy",
    price: 300,
    stock: 18,
    minStock: 5,
  },
  {
    id: 8,
    name: "Biscuit (200g)",
    sku: "BIS-200G",
    category: "Snacks",
    price: 60,
    stock: 50,
    minStock: 20,
  },
];

const ViewProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "low" && product.stock < product.minStock) ||
      (filter === "out" && product.stock === 0);
    return matchesSearch && matchesFilter;
  });

  // Delete product
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
  };

  // Get stock status
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock < minStock) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-700" };
  };

  return (
    <div>
      {/* Search and Filter */}
      <div className="p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-2xl bg-white"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {["all", "low", "out"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 text-sm py-2 rounded-full whitespace-nowrap ${filter === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {tab === "all" ? "All Products" : tab === "low" ? "Low Stock" : "Out of Stock"}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 space-y-3">
        {filteredProducts.map((product) => {
          const status = getStockStatus(product.stock, product.minStock);

          return (
            <div key={product.id} className="bg-white border rounded-2xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>SKU: {product.sku}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div>
                      <div className="text-gray-500 text-sm">Price</div>
                      <div className="font-bold text-lg">৳{product.price.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Stock</div>
                      <div className="font-bold text-lg">{product.stock}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Min Stock</div>
                      <div className="font-bold">{product.minStock}</div>
                    </div>
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowDeleteConfirm(showDeleteConfirm === product.id ? null : product.id)
                    }
                    className="p-2"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {showDeleteConfirm === product.id && (
                    <div className="absolute right-0 top-10 bg-white border rounded-xl shadow-lg w-48 z-50">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                      <Link
                        href={`/products/${product.id}/edit`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit Product
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${product.name}?`)) {
                            handleDelete(product.id);
                          }
                        }}
                        className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Product
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-xl text-center font-medium"
                >
                  Edit
                </Link>
                <Link
                  href={`/sales/products/${product.id}`}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-center font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewProducts;
