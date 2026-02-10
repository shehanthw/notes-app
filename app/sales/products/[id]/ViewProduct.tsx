// src/app/products/[id]/page.tsx
"use client";

import { AlertCircle, Box, DollarSign, Package, Tag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const getProductById = (id: string) => {
  const products = [
    {
      id: 1,
      name: "Rice (25kg)",
      sku: "RIC-25KG",
      category: "Grains",
      price: 1250,
      cost: 1100,
      stock: 15,
      minStock: 5,
      unit: "bag",
      description: "Premium quality rice, 25kg bag",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Oil (5L)",
      sku: "OIL-5L",
      category: "Cooking",
      price: 900,
      cost: 750,
      stock: 3,
      minStock: 5,
      unit: "can",
      description: "Pure soybean oil, 5L can",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Sugar (2kg)",
      sku: "SUG-2KG",
      category: "Sweeteners",
      price: 250,
      cost: 200,
      stock: 42,
      minStock: 10,
      unit: "packet",
      description: "Refined white sugar, 2kg packet",
      createdAt: "2024-01-05",
    },
  ];
  return products.find((p) => p.id === parseInt(id));
};

const ViewProduct = () => {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Product not found</h2>
          <button 
            onClick={() => router.push("/sales/products")} 
            className="mt-4 text-blue-600"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  const stockStatus =
    product.stock === 0
      ? "Out of Stock"
      : product.stock < product.minStock
      ? "Low Stock"
      : "In Stock";

  const statusColor =
    product.stock === 0
      ? "bg-red-100 text-red-700"
      : product.stock < product.minStock
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div>
      {/* Product Details */}
      <div className="p-4 space-y-4">
        {/* Product Header */}
        <div className="bg-white border rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
                  {stockStatus}
                </span>
                <span className="text-gray-600">SKU: {product.sku}</span>
              </div>
            </div>
            {/* Product Image Placeholder */}
            <div className="h-20 w-20 bg-gray-100 rounded-xl flex items-center justify-center">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4">Product Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500">
                <Tag className="h-4 w-4" />
                <span>Category</span>
              </div>
              <div className="font-semibold">{product.category}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500">
                <Box className="h-4 w-4" />
                <span>Unit</span>
              </div>
              <div className="font-semibold">{product.unit}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500">
                <DollarSign className="h-4 w-4" />
                <span>Selling Price</span>
              </div>
              <div className="font-bold text-lg">৳{product.price.toLocaleString()}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500">
                <DollarSign className="h-4 w-4" />
                <span>Cost Price</span>
              </div>
              <div className="font-semibold">৳{product.cost?.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Stock Information */}
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4">Stock Information</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Current Stock</span>
                <span className="text-2xl font-bold">
                  {product.stock} {product.unit}s
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${product.stock === 0 ? "bg-red-500" : "bg-green-500"}`}
                  style={{
                    width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-blue-600 font-semibold">Minimum Stock</div>
                <div className="text-2xl font-bold">{product.minStock}</div>
                <div className="text-sm text-blue-600">Alert when below</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-green-600 font-semibold">Profit Margin</div>
                <div className="text-2xl font-bold">
                  {product.cost
                    ? `${Math.round(((product.price - product.cost) / product.cost) * 100)}%`
                    : "N/A"}
                </div>
                <div className="text-sm text-green-600">Per unit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {/* Low Stock Warning */}
        {product.stock < product.minStock && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Low Stock Alert!</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Stock is below minimum level. Consider restocking soon.
                </p>
                <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm">
                  Order More
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="sticky bottom-0 bg-white border-t p-4 mt-6">
          <div className="flex gap-3">
            <Link
              href={`/products/${product.id}/edit`}
              className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-xl text-center font-semibold"
            >
              Edit Product
            </Link>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${product.name}? This action cannot be undone.`)) {
                  // TODO: API call to delete
                  router.push("/products");
                }
              }}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl text-center font-semibold"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;