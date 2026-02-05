import React, { useEffect } from 'react';
import { Integration } from '../types';
import { X, Plus } from 'lucide-react';

interface DetailModalProps {
  integration: Integration | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ integration, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!integration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-gray-900 transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Container */}
        <div className="relative z-10 px-8 pt-10 pb-12 flex flex-col h-full overflow-y-auto custom-scrollbar">
          
          {/* Logos Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4 sm:gap-6 mb-6">
              
              {/* DataRails Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg ring-4 ring-white overflow-hidden p-4">
                <img 
                  src="https://img.logo.dev/datarails.com?token=pk_NzP1pbRpRgeYlq-Gd1JtfQ" 
                  alt="DataRails" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Connector */}
              <div className="text-gray-400 flex items-center justify-center bg-white/50 rounded-full p-2 backdrop-blur-sm">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              {/* Integration Logo */}
              {integration.logoUrl && integration.logoUrl !== 'N/A' ? (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg ring-4 ring-white overflow-hidden p-2">
                   <img 
                    src={integration.logoUrl} 
                    alt={integration.name} 
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              ) : (
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${integration.logoColor} flex items-center justify-center text-white font-bold text-3xl shadow-lg ring-4 ring-white`}>
                  {integration.logoInitials}
                </div>
              )}
            </div>
            
            <div className="text-center max-w-md">
              <span className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2 block">
                {integration.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900">{integration.name}</h2>
            </div>
          </div>

          <div className="space-y-6 max-w-xl mx-auto w-full">
            <div className="text-center">
              <p className="text-gray-600 leading-relaxed text-lg">
                {integration.longDescription || integration.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {integration.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium shadow-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};