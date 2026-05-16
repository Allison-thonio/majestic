'use client';

import { getProducts, updateProduct, getCollections } from '@/lib/store';
import { useState } from 'react';
import { Trash2, Edit2, Save, X } from 'lucide-react';

export default function ProductsAdmin() {
  const [products, setProducts] = useState(getProducts());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const collections = getCollections();

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditData(product);
  };

  const handleSave = () => {
    if (editingId) {
      updateProduct(editingId, editData);
      setProducts(getProducts());
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: string, value: any) => {
    setEditData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Stock</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Collection</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  {editingId === product.id ? (
                    <>
                      <td className="py-4 px-6">
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) => handleChange('price', parseInt(e.target.value))}
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <input
                          type="number"
                          value={editData.stock}
                          onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={editData.collection}
                          onChange={(e) => handleChange('collection', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        >
                          {collections.map((col) => (
                            <option key={col.id} value={col.id.replace('collection-', '')}>
                              {col.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6 flex gap-2">
                        <button
                          onClick={handleSave}
                          className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6 font-semibold text-gray-900">{product.name}</td>
                      <td className="py-4 px-6 text-gray-600">${product.price.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 capitalize">{product.collection}</td>
                      <td className="py-4 px-6 flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
