import React, { useState, useMemo } from 'react';
import { Feature, User } from '../types';
import { FEATURES, FeatureConfig } from '../constants';
import { SparklesIcon, WritingIcon, BookOpenIcon, SanguIcon } from './icons';
import { APP_CONFIG } from '../config';

interface FeaturePickerProps {
  activeFeature: Feature;
  onFeatureSelect: (feature: Feature) => void;
  onClose: () => void;
  currentUser: User;
}

const CATEGORIES = [
  { id: 'all', label: 'ހުރިހާ ބައިތައް', icon: null },
  { id: 'creation', label: 'އުފެއްދުންތެރިކަން', icon: <WritingIcon className="w-4 h-4" /> },
  { id: 'polish', label: 'ފަންނީ އިސްލާހު', icon: <SparklesIcon className="w-4 h-4" /> },
  { id: 'tools', label: 'ބަހަވީ އާލާތް', icon: <BookOpenIcon className="w-4 h-4" /> },
];

const FeaturePicker: React.FC<FeaturePickerProps> = ({ activeFeature, onFeatureSelect, onClose, currentUser }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = useMemo(() => {
    return FEATURES.filter(feature => {
      // Permission check
      const hasPermission = currentUser.role === 'admin' || currentUser.allowedFeatures.includes(feature.id);
      if (!hasPermission) return false;

      // Category filter
      if (selectedCategory !== 'all' && feature.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return feature.label.toLowerCase().includes(q) || feature.description.toLowerCase().includes(q);
      }

      return true;
    });
  }, [currentUser, selectedCategory, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Menu Card */}
      <div className="bg-white w-full max-w-5xl h-[90vh] md:h-[80vh] rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 flex flex-col">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-white z-10">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
                    <WritingIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">އާލާތްތައް</h2>
                    <p className="text-sm text-slate-500 font-medium">ތިބާގެ މަސައްކަތަށް އެންމެ އެކަށޭނަ އާލާތް ޚިޔާރުކުރައްވާ</p>
                </div>
             </div>
             <button 
                onClick={onClose}
                className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             {/* Tabs */}
             <div className="flex p-1 bg-slate-100 rounded-2xl overflow-x-auto max-w-full no-scrollbar w-full md:w-auto">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none justify-center
                            ${selectedCategory === cat.id 
                                ? 'bg-white text-indigo-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                            }
                        `}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
             </div>

             {/* Search */}
             <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    placeholder="ހޯއްދަވާ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-bold placeholder:font-medium placeholder:text-slate-400 text-slate-700"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
             </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
            {filteredFeatures.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                    <SanguIcon className="h-16 w-16 text-slate-300 mb-4" />
                    <p className="text-slate-500 font-bold">އެއްވެސް އާލާތެއް ނުފެނުނު</p>
                    <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="mt-2 text-indigo-600 text-sm font-bold hover:underline">
                        ފިލްޓަރުތައް ފޮހެލާ
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Holhuashi (Generate Ideas) Special Card */}
                    {filteredFeatures.some(f => f.id === Feature.GENERATE_IDEAS) && (
                        filteredFeatures
                            .filter(f => f.id === Feature.GENERATE_IDEAS)
                            .map(feature => (
                                <button
                                    key={feature.id}
                                    onClick={() => onFeatureSelect(feature.id)}
                                    className={`
                                        col-span-1 sm:col-span-2 lg:col-span-3
                                        flex flex-col md:flex-row items-center gap-6 p-6 rounded-[24px] text-right transition-all group border-2 relative overflow-hidden
                                        ${activeFeature === feature.id
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200'
                                            : 'bg-white border-transparent hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50'
                                        }
                                    `}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    
                                    <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 flex-shrink-0 ${activeFeature === feature.id ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                                        {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}
                                    </div>
                                    <div className="flex-1 min-w-0 text-center md:text-right">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                            <h3 className={`text-xl font-black ${activeFeature === feature.id ? 'text-white' : 'text-slate-900'}`}>{feature.label}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${activeFeature === feature.id ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                                                އެހީތެރިއެއް
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${activeFeature === feature.id ? 'text-indigo-100' : 'text-slate-500'}`}>{feature.description}</p>
                                    </div>
                                    <div className={`hidden md:flex h-10 w-10 rounded-full items-center justify-center border-2 ${activeFeature === feature.id ? 'border-white/30 text-white' : 'border-slate-100 text-slate-300 group-hover:border-indigo-200 group-hover:text-indigo-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>
                            ))
                    )}

                    {/* Other Features */}
                    {filteredFeatures
                        .filter(f => f.id !== Feature.GENERATE_IDEAS)
                        .map((feature) => {
                        const isActive = activeFeature === feature.id;
                        return (
                            <button
                                key={feature.id}
                                onClick={() => onFeatureSelect(feature.id)}
                                className={`
                                    flex flex-col items-start gap-4 p-5 rounded-[20px] text-right transition-all group border-2 h-full
                                    ${isActive
                                    ? 'bg-indigo-50 border-indigo-200 ring-4 ring-indigo-50'
                                    : 'bg-white border-transparent hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100'
                                    }
                                `}
                            >
                                <div className="flex items-start justify-between w-full">
                                    <div className={`p-3 rounded-2xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                                        {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                                    </div>
                                    {isActive && (
                                        <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0 w-full">
                                    <p className={`text-lg font-bold mb-1 group-hover:text-indigo-700 transition-colors ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>{feature.label}</p>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">{feature.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{APP_CONFIG.APP_NAME} ސްޓޫޑިއޯ {APP_CONFIG.VERSION}</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturePicker;
