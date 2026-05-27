'use client';

import { getProducts, getAllOrders, getCollections } from '@/lib/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingCart, Package, Layers } from 'lucide-react';

export default function AdminDashboard() {
  const products = getProducts();
  const orders = getAllOrders();
  const collections = getCollections();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  // Revenue by product
  const revenueData = products.map((p) => ({
    name: p.name,
    revenue: orders
      .flatMap((o) => o.items)
      .filter((item) => item.productId === p.id)
      .reduce((sum, item) => sum + item.price * item.quantity, 0),
  }));

  // Stock distribution
  const stockData = [
    { name: 'In Stock', value: products.filter((p) => p.stock > 0).length },
    { name: 'Low Stock', value: products.filter((p) => p.stock > 0 && p.stock < 5).length },
    { name: 'Out of Stock', value: products.filter((p) => p.stock === 0).length },
  ];

  const COLORS = ['#10b981', '#c9a96e', '#ef4444'];

  const kpiCards = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      gradient: 'from-[#c9a96e]/20 to-[#c9a96e]/5',
      iconColor: 'text-[#c9a96e]',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      gradient: 'from-emerald-500/20 to-emerald-500/5',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      gradient: 'from-blue-500/20 to-blue-500/5',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Collections',
      value: collections.length,
      icon: Layers,
      gradient: 'from-purple-500/20 to-purple-500/5',
      iconColor: 'text-purple-400',
    },
  ];

  const customTooltipStyle = {
    backgroundColor: '#1c1c1c',
    border: '1px solid #333333',
    borderRadius: '8px',
    color: '#f5f3ee',
    fontSize: '13px',
  };

  return (
    <div className="min-h-screen text-white">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-white/50 mt-1 text-sm">
          Welcome back. Here&apos;s your store overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br ${card.gradient} backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20 group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-white mt-3 tracking-tight">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-white/[0.05] ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/[0.03] blur-2xl" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Revenue Chart */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6">
          <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#c9a96e]" />
            Revenue by Product
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#999', fontSize: 12 }}
                axisLine={{ stroke: '#333' }}
              />
              <YAxis
                tick={{ fill: '#999', fontSize: 12 }}
                axisLine={{ stroke: '#333' }}
              />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="revenue" fill="#c9a96e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Distribution */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6">
          <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#c9a96e]" />
            Stock Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="#0a0a0a"
                strokeWidth={3}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-[#c9a96e]" />
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-6 text-xs font-medium uppercase tracking-wider text-white/40">
                  Order ID
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium uppercase tracking-wider text-white/40">
                  Items
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium uppercase tracking-wider text-white/40">
                  Total
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium uppercase tracking-wider text-white/40">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-5).reverse().map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-4 px-6 text-white/80 font-mono text-sm">
                    {order.id}
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    {order.items.length}
                  </td>
                  <td className="py-4 px-6 text-white font-semibold">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20'
                          : order.status === 'pending'
                          ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20'
                          : 'bg-white/10 text-white/60 ring-1 ring-white/10'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
