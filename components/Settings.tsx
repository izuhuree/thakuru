
import React, { useState } from 'react';
import { User, Feature } from '../types';
import { FEATURES } from '../constants';
// FIX: Removed unused XCircleIcon import
import { CheckCircleIcon, TrashIcon, UserIcon } from './icons';

interface SettingsProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (username: string) => void;
  currentUser: User;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ users, onUpdateUser, onDeleteUser, currentUser, onClose }) => {
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const toggleFeature = (user: User, featureId: Feature) => {
    const isAllowed = user.allowedFeatures.includes(featureId);
    let newFeatures: Feature[];
    
    if (isAllowed) {
      newFeatures = user.allowedFeatures.filter(f => f !== featureId);
    } else {
      newFeatures = [...user.allowedFeatures, featureId];
    }
    
    onUpdateUser({ ...user, allowedFeatures: newFeatures });
  };

  const toggleApproval = (user: User) => {
    onUpdateUser({ ...user, isApproved: !user.isApproved });
  };
  
  const toggleSelectAll = (user: User) => {
    const allFeatureIds = FEATURES.map(f => f.id);
    if (user.allowedFeatures.length === allFeatureIds.length) {
        onUpdateUser({ ...user, allowedFeatures: [] });
    } else {
        onUpdateUser({ ...user, allowedFeatures: allFeatureIds });
    }
  };

  const handleLimitChange = (user: User, limit: string) => {
    const num = parseInt(limit) || 0;
    onUpdateUser({ ...user, apiLimit: num });
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">ސެޓިންގްސް</h2>
          <p className="text-slate-500 font-medium text-sm">ޔޫޒަރުންނާއި އެމީހުންގެ ހުއްދަތައް ބެލެހެއްޓެވުމަށް.</p>
        </div>
        <button 
          onClick={onClose}
          className="bg-white text-slate-700 font-bold py-2 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm self-start md:self-center flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          އެޑިޓަރަށް އެނބުރި ދޭ
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-5 font-bold text-slate-400 uppercase tracking-wider text-xs">ޔޫޒަރ</th>
                <th className="p-5 font-bold text-slate-400 uppercase tracking-wider text-xs">ތާރީޚް</th>
                <th className="p-5 font-bold text-slate-400 uppercase tracking-wider text-xs text-center">ހާލަތު</th>
                <th className="p-5 font-bold text-slate-400 uppercase tracking-wider text-xs text-center">ލިމިޓް</th>
                <th className="p-5 font-bold text-slate-400 uppercase tracking-wider text-xs text-center">ހުއްދަތައް</th>
                <th className="p-5 font-bold text-slate-400 uppercase tracking-wider text-xs text-center">އަމަލުތައް</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <React.Fragment key={user.username}>
                  <tr className={`hover:bg-indigo-50/30 transition-colors ${editingUser === user.username ? 'bg-indigo-50/50' : ''}`}>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <UserIcon />
                        </div>
                        <div>
                          <p className="font-bold text-slate-700">{user.username}</p>
                          <p className="text-xs text-slate-400 font-mono capitalize">{user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-slate-500 font-mono text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-center">
                        {user.role === 'admin' ? (
                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                                އެޑްމިން
                             </span>
                        ) : (
                            <button 
                                onClick={() => toggleApproval(user)}
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                user.isApproved 
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                }`}
                            >
                                {user.isApproved ? (
                                <>
                                    <CheckCircleIcon className="w-3 h-3" />
                                    އެޕްރޫވްޑް
                                </>
                                ) : (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    ޕެންޑިންގ
                                </>
                                ) }
                            </button>
                        )}
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex flex-col items-center">
                            <input 
                              type="number" 
                              value={user.apiLimit}
                              onChange={(e) => handleLimitChange(user, e.target.value)}
                              className="w-16 text-center border rounded-lg p-1 text-xs font-bold"
                            />
                            <span className="text-[10px] text-slate-400 mt-1">ބޭނުންކުރީ: {user.dailyUsage}</span>
                        </div>
                    </td>
                    <td className="p-5 text-center">
                       <button
                         onClick={() => setEditingUser(editingUser === user.username ? null : user.username)}
                         className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline decoration-2 underline-offset-4"
                       >
                         {user.allowedFeatures.length} ފީޗަރ
                       </button>
                    </td>
                    <td className="p-5 text-center">
                      {user.username !== currentUser.username && user.role !== 'admin' && (
                        <button 
                          onClick={() => {
                             if(confirm('މި ޔޫޒަރ ފޮހެލަން ބޭނުންވޭތޯ؟')) onDeleteUser(user.username);
                          }}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                  
                  {/* Permissions Editor Row */}
                  {editingUser === user.username && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={6} className="p-6 border-b border-indigo-100">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-slate-700 text-sm">ހުއްދަ ދެވިފައިވާ ފީޗަރތައް:</h4>
                                <button 
                                    onClick={() => toggleSelectAll(user)}
                                    className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    ހުރިހާ އެއްޗެއް ހޮވާ
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {FEATURES.map((feature) => {
                                const isAllowed = user.allowedFeatures.includes(feature.id);
                                return (
                                    <div 
                                    key={feature.id}
                                    onClick={() => toggleFeature(user, feature.id)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all
                                        ${isAllowed 
                                        ? 'bg-indigo-50 border-indigo-200' 
                                        : 'bg-white border-slate-100 hover:border-slate-300 opacity-60 hover:opacity-100'
                                        }
                                    `}
                                    >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${isAllowed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
                                        {isAllowed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <div className={`w-6 h-6 flex-shrink-0 ${isAllowed ? 'text-indigo-600' : 'text-slate-400'}`}>
                                            {feature.icon}
                                        </div>
                                        <span className={`text-xs font-bold truncate ${isAllowed ? 'text-indigo-900' : 'text-slate-500'}`}>{feature.label}</span>
                                    </div>
                                    </div>
                                );
                                })}
                            </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-medium">
            އެއްވެސް ޔޫޒަރެއް ނެތް.
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
