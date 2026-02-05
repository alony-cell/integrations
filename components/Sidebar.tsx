import React from 'react';
import { CATEGORIES, INTEGRATIONS } from '../constants';
import { Category } from '../types';
import { LayoutGrid, Calculator, Users, Zap, Shield, Database, Landmark } from 'lucide-react';

interface SidebarProps {
  selectedCategory: Category;
  onSelectCategory: (c: Category) => void;
  className?: string;
}

const getIcon = (cat: Category) => {
  switch(cat) {
    case 'All': return LayoutGrid;
    case 'Accounting': return Calculator;
    case 'HRIS': return Users;
    case 'Productivity': return Zap;
    case 'Security': return Shield;
    case 'Data': return Database;
    case 'Bank': return Landmark;
    default: return LayoutGrid;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, className = '' }) => {
  return (
    <nav className={`w-full md:w-64 flex-shrink-0 md:border-r border-gray-100 md:min-h-screen p-4 md:p-6 ${className}`}>
      <div className="mb-8 hidden md:block">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Categories</h2>
      </div>
      
      <div className="flex overflow-x-auto md:flex-col gap-2 md:gap-1 pb-4 md:pb-0 hide-scrollbar">
        {CATEGORIES.map(category => {
          const Icon = getIcon(category);
          const count = category === 'All' 
            ? INTEGRATIONS.length 
            : INTEGRATIONS.filter(i => i.category === category).length;
            
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon className={`w-4 h-4 mr-3 ${selectedCategory === category ? 'text-brand-500' : 'text-gray-400'}`} />
              <span className="flex-1 text-left">{category}</span>
              <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${selectedCategory === category ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};