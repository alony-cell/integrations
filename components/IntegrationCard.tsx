import React from 'react';
import { Integration } from '../types';
import { ArrowRight } from 'lucide-react';

interface IntegrationCardProps {
  data: Integration;
  onClick: (data: Integration) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ data, onClick }) => {
  return (
    <div 
      onClick={() => onClick(data)}
      className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer h-full relative overflow-hidden hover:border-brand-200"
    >
      {/* Popular Badge */}
      {data.popular && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start mb-4">
        {data.logoUrl && data.logoUrl !== 'N/A' ? (
          <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
             <img 
              src={data.logoUrl} 
              alt={data.name} 
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add(data.logoColor);
                (e.target as HTMLImageElement).parentElement!.innerHTML = data.logoInitials;
                (e.target as HTMLImageElement).parentElement!.classList.add('text-white', 'font-bold', 'text-lg');
              }}
            />
          </div>
        ) : (
          <div className={`w-12 h-12 rounded-lg ${data.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform`}>
            {data.logoInitials}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
          {data.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {data.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center text-sm font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        View Integration <ArrowRight className="w-4 h-4 ml-1" />
      </div>
      
      {/* Decorative active indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-brand-500 w-0 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
};