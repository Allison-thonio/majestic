'use client';

import { getProducts, updateProduct, addProduct, deleteProduct, getCollections } from '@/lib/store';
import { useState } from 'react';
import { Trash2, Edit2, Save, X, Plus, Package, ImageIcon } from 'lucide-react';

export default function ProductsAdmin() {
  const [products, setProducts] = useState(getProducts());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    collection: 'mens',
    stock: 0,
    sizes: ['S', 'M', 'L', 'XL'],
  });
  const collections = getCollections();

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditData({ ...product });
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

  const handleNewChange = (field: string, value: any) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      ...newProduct,
      image: newProduct.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    });
    setProducts(getProducts());
    setShowAddModal(false);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      collection: 'mens',
      stock: 0,
      sizes: ['S', 'M', 'L', 'XL'],
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const inputClass =
    'w-full px-3 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/30 transition-colors';
  const labelClass =
    'block text-[10px] font-medium uppercase tracking-wider text-white/40 mb-1.5';

  return (
    <div className="min-h-screen text-white">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Package className="w-7 h-7 text-[#c9a96e]" />
            Products
          </h1>
          <p className="text-white/50 mt-1 text-sm">
            Manage your product catalog &middot; {products.length} items
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#c9a96e] text-black px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4b87d] transition-colors shadow-lg shadow-[#c9a96e]/10"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products Grid (Card View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden group hover:border-white/[0.12] transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.img-fallback')?.classList.remove('hidden');
                }}
              />
              <div className="img-fallback hidden absolute inset-0 flex items-center justify-center bg-white/[0.03]">
                <ImageIcon className="w-10 h-10 text-white/10" />
              </div>
              {/* Stock badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md ${
                    product.stock === 0
                      ? 'bg-red-500/80 text-white'
                      : product.stock < 5
                      ? 'bg-amber-500/80 text-black'
                      : 'bg-emerald-500/80 text-white'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                </span>
              </div>
            </div>

            {/* Product Info */}
            {editingId === product.id ? (
              <div className="p-5 space-y-3">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputClass}
                  placeholder="Product name"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => handleChange('price', parseInt(e.target.value))}
                    className={inputClass}
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={editData.stock}
                    onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                    className={inputClass}
                    placeholder="Stock"
                  />
                </div>
                <input
                  type="text"
                  value={editData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={inputClass}
                  placeholder="Image URL"
                />
                <select
                  value={editData.collection}
                  onChange={(e) => handleChange('collection', e.target.value)}
                  className={inputClass}
                >
                  {collections.map((col) => (
                    <option key={col.id} value={col.id.replace('collection-', '')} className="bg-[#1c1c1c] text-white">
                      {col.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500/15 text-emerald-400 rounded-lg hover:bg-emerald-500/25 transition-colors ring-1 ring-emerald-500/20 text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/[0.05] text-white/60 rounded-lg hover:bg-white/[0.1] transition-colors ring-1 ring-white/10 text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{product.name}</h3>
                    <p className="text-white/40 text-xs capitalize mt-0.5">{product.collection} &middot; {product.category}</p>
                  </div>
                  <p className="text-[#c9a96e] font-bold text-sm">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-white/30 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {product.sizes.slice(0, 4).map((size) => (
                      <span key={size} className="text-[9px] uppercase tracking-wider text-white/30 border border-white/[0.08] px-1.5 py-0.5 rounded">
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 4 && (
                      <span className="text-[9px] text-white/30">+{product.sizes.length - 4}</span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-[#c9a96e]/10 text-[#c9a96e] rounded-lg hover:bg-[#c9a96e]/20 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111] shadow-2xl shadow-black/40 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#c9a96e]" />
                Add New Product
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className={labelClass}>Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => handleNewChange('name', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Premium Leather Jacket"
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => handleNewChange('description', e.target.value)}
                  className={`${inputClass} resize-none h-20`}
                  placeholder="Describe the product..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Price (₦) *</label>
                  <input
                    type="number"
                    value={newProduct.price || ''}
                    onChange={(e) => handleNewChange('price', parseInt(e.target.value) || 0)}
                    className={inputClass}
                    placeholder="25000"
                  />
                </div>
                <div>
                  <label className={labelClass}>Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock || ''}
                    onChange={(e) => handleNewChange('stock', parseInt(e.target.value) || 0)}
                    className={inputClass}
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => handleNewChange('image', e.target.value)}
                  className={inputClass}
                  placeholder="https://images.unsplash.com/..."
                />
                {newProduct.image && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-white/[0.06] aspect-video">
                    <img
                      src={newProduct.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => handleNewChange('category', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. shirts, bags"
                  />
                </div>
                <div>
                  <label className={labelClass}>Collection</label>
                  <select
                    value={newProduct.collection}
                    onChange={(e) => handleNewChange('collection', e.target.value)}
                    className={inputClass}
                  >
                    <option value="mens" className="bg-[#1c1c1c] text-white">Men&apos;s Wear</option>
                    <option value="womens" className="bg-[#1c1c1c] text-white">Women&apos;s Wear</option>
                    <option value="accessories" className="bg-[#1c1c1c] text-white">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={newProduct.sizes.join(', ')}
                  onChange={(e) => handleNewChange('sizes', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                  className={inputClass}
                  placeholder="S, M, L, XL"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/[0.06] flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white/60 bg-white/[0.05] hover:bg-white/[0.08] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.price}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-[#c9a96e] text-black hover:bg-[#d4b87d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#c9a96e]/10"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
