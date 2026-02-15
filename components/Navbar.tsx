
import React from 'react';
import { WritingIcon, LogoutIcon, ListIcon, SettingsIcon, UserIcon } from './icons';
import { User, Feature } from '../types';

interface NavbarProps {
  activeFeatureLabel: string;
  onMenuToggle: () => void;
  onLogout: () => void;
  currentUser: User;
  activeFeatureId: Feature;
  onNavigateSettings: () => void;
  onNavigateProfile: () => void;
  onNavigateHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
    activeFeatureLabel, 
    onMenuToggle, 
    onLogout, 
    currentUser, 
    activeFeatureId, 
    onNavigateSettings,
    onNavigateProfile,
    onNavigateHome
}) => {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0 backdrop-blur-md bg-white/90">
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={onNavigateHome}>
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md shadow-indigo-100 group-hover:scale-110 transition-transform">
            <WritingIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-black text-slate-900 tracking-tighter">ތަކުރު</span>
        </div>
        
        <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>
        
        {activeFeatureId === Feature.SETTINGS ? (
            <div className="px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2">
                <SettingsIcon className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-bold text-slate-700">ސެޓިންގްސް</span>
            </div>
        ) : activeFeatureId === Feature.PROFILE ? (
            <div className="px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-bold text-slate-700">ޕްރޮފައިލް</span>
            </div>
        ) : (
            <button 
            onClick={onMenuToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
            >
            <ListIcon className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-700">{activeFeatureLabel}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
            </button>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {currentUser.role === 'admin' && (
            <button
                onClick={onNavigateSettings}
                className={`p-2 rounded-xl transition-all ${
                    activeFeatureId === Feature.SETTINGS 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50'
                }`}
                title="ސެޓިންގްސް"
            >
                <SettingsIcon />
            </button>
        )}
        
        <button
            onClick={onNavigateProfile}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all border ${
                activeFeatureId === Feature.PROFILE 
                ? 'bg-indigo-50 border-indigo-100 text-indigo-700' 
                : 'bg-white border-transparent hover:bg-slate-50 text-slate-600'
            }`}
            title="ޕްރޮފައިލް"
        >
            <UserIcon className="w-4 h-4" />
            <span className="text-xs font-bold max-w-[100px] truncate hidden sm:block">
                {currentUser.displayName || currentUser.username}
            </span>
        </button>

        <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>

        <button
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="ލޮގްއައުޓް"
        >
          <LogoutIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
