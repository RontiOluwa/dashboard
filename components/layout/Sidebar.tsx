"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, DollarSign, Menu, X } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Target },
  { name: "Redemptions", href: "/redemptions", icon: DollarSign },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pagrin-500">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <span className="ml-3 text-xl font-bold text-white">Pagrin</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-pagrin-500"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? "text-pagrin-400"
                        : "text-gray-400 group-hover:text-gray-300"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile footer */}
          <div className="shrink-0 border-t border-gray-800 p-4">
            <div className="text-xs text-gray-400">
              <div className="font-medium text-white">Incentives Dashboard</div>
              <div className="mt-1">Manage Project rewards & perks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar - hidden on mobile and tablet */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-900">
          {/* Desktop header */}
          <div className="flex h-16 shrink-0 items-center px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pagrin-500">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="ml-3 text-xl font-bold text-white">Pagrin</span>
          </div>

          {/* Desktop navigation */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive
                          ? "text-pagrin-400"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop footer */}
          <div className="flex shrink-0 border-t border-gray-800 p-4">
            <div className="text-xs text-gray-400">
              <div className="font-medium text-white">Incentives Dashboard</div>
              <div className="mt-1">Manage Project rewards & perks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button - visible on mobile and tablet only */}
      <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pagrin-500"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
