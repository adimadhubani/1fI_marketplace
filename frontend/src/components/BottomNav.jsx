import React from 'react';
import { Home, ShoppingBag, Calendar, CreditCard, User } from 'lucide-react';

export default function BottomNav({ activeTab = 'Shop', onTabChange }) {
  const tabs = [
    { id: 'Home', label: 'Home', icon: Home, path: '/' },
    { id: 'Shop', label: 'Shop', icon: ShoppingBag, path: '/' },
    { id: 'EMI Due', label: 'EMI Due', icon: Calendar, badge: '1 Due' },
    { id: 'Limit', label: 'Limit', icon: CreditCard },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-elevated">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange && onTabChange(tab.id, tab.path)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {tab.badge && (
                <span className="absolute -top-0.5 right-2 w-2 h-2 bg-accent rounded-full ring-2 ring-white"></span>
              )}
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110 bg-primary/10 text-primary' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 bg-accent rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
