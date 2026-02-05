import React, { useState, useMemo, useEffect } from 'react';
import { INTEGRATIONS, CATEGORIES } from './constants';
import { Integration, Category } from './types';
import { IntegrationCard } from './components/IntegrationCard';
import { DetailModal } from './components/DetailModal';
import { Search, XCircle, Filter, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  // Filter Logic
  const filteredIntegrations = useMemo(() => {
    let result = INTEGRATIONS;

    // 1. Standard Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // 2. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(i => i.category === selectedCategory);
    }

    return result;
  }, [selectedCategory, searchQuery]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory, searchQuery]);

  const displayedIntegrations = filteredIntegrations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredIntegrations.length;

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center">
            
            {/* Category Dropdown */}
            <div className="relative w-full md:w-64 flex-shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as Category)}
                    className="block w-full pl-10 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-lg bg-white appearance-none shadow-sm cursor-pointer hover:border-gray-400 transition-colors"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 w-full flex items-center border rounded-lg bg-white shadow-sm transition-all border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500">
                <div className="pl-3 text-gray-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search integrations..."
                    className="flex-1 py-3 px-3 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                />
                 {searchQuery && (
                  <button onClick={clearSearch} className="p-2 text-gray-400 hover:text-gray-600">
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
            </div>

        </div>

        {/* Results Grid */}
        <div className="min-h-[400px]">
             {filteredIntegrations.length > 0 ? (
               <>
                 <div className="mb-6">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Available Integrations
                    </span>
                 </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedIntegrations.map(integration => (
                      <IntegrationCard 
                      key={integration.id} 
                      data={integration} 
                      onClick={setSelectedIntegration} 
                      />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 9)}
                      className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm active:scale-95"
                    >
                      Load More
                    </button>
                  </div>
                )}
               </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No integrations found</h3>
                    <p className="text-gray-500 max-w-sm mb-6">
                        We couldn't find any integrations matching your criteria.
                    </p>
                </div>
            )}
        </div>

      </div>

      <DetailModal 
        integration={selectedIntegration} 
        onClose={() => setSelectedIntegration(null)} 
      />
    </div>
  );
};

export default App;