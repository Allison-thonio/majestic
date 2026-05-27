'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Package, ShoppingCart, Image as ImageIcon } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    } else if (user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/media', label: 'Media', icon: ImageIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname?.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0d0d0d] flex flex-col border-r border-white/[0.06]">
        {/* Brand */}
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-lg font-bold text-[#c9a96e] tracking-tight">
            Majestic Hub
          </h2>
          <p className="text-white/40 text-xs mt-1 truncate">
            {user.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[#c9a96e]/10 text-[#c9a96e] shadow-sm shadow-[#c9a96e]/5'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-[#0d0d0d] border-b border-white/[0.06] flex items-center justify-between px-6">
          <div className="text-sm font-medium text-white/50 tracking-wide">
            Majestic <span className="text-[#c9a96e]">Hub</span>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/70">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Live
            </span>
            <div className="w-8 h-8 bg-[#c9a96e]/15 rounded-full flex items-center justify-center text-[#c9a96e] font-semibold text-sm ring-1 ring-[#c9a96e]/20">
              {user.name?.[0] ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}
