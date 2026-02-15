
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { UserIcon, LockIcon, SaveIcon } from './icons';

interface ProfileProps {
  currentUser: User;
  onUpdateProfile: (updatedData: Partial<User>) => void;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ currentUser, onUpdateProfile, onClose }) => {
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setDisplayName(currentUser.displayName || '');
    setNewPassword('');
    setConfirmPassword('');
    setMessage(null);
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const updates: Partial<User> = {
      displayName: displayName.trim()
    };

    if (newPassword) {
      if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'ޕާސްވޯޑުގައި މަދުވެގެން 6 އަކުރު ހުންނަންވާނެ.' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'ޕާސްވޯޑު ދިމައެއް ނުވޭ.' });
        return;
      }
      updates.password = newPassword;
    }

    onUpdateProfile(updates);
    setMessage({ type: 'success', text: 'ޕްރޮފައިލް އަޕްޑޭޓް ކުރެވިއްޖެ.' });
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">ޕްރޮފައިލް</h2>
          <p className="text-slate-500 font-medium text-sm">ތިބާގެ މަޢުލޫމާތު ބަދަލުކުރެއްވުމަށް.</p>
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

      <div className="bg-white rounded-[24px] shadow-lg shadow-slate-200/50 border border-slate-200 p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <UserIcon className="w-10 h-10" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800">{currentUser.username}</h3>
                <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">{currentUser.role}</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mr-1">
              ނަން (ޑިސްޕްލޭ ނޭމް)
            </label>
            <div className="relative group">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="ތިބާގެ ނަން ޖައްސަވާ"
                  className="block w-full rounded-2xl border-slate-200 bg-white px-5 py-4 pl-12 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 text-slate-700"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <UserIcon />
                </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50">
            <p className="text-sm font-bold text-slate-800 mb-4">ޕާސްވޯޑު ބަދަލުކުރެއްވުމަށް</p>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mr-1">
                    އައު ޕާސްވޯޑު
                    </label>
                    <div className="relative group">
                        <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="ބަދަލުކުރަން ބޭނުންނަމަ އެކަނި"
                        className="block w-full rounded-2xl border-slate-200 bg-white px-5 py-4 pl-12 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 text-slate-700"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <LockIcon />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mr-1">
                    ޕާސްވޯޑު ކަށަވަރުކުރައްވާ
                    </label>
                    <div className="relative group">
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="އައު ޕާސްވޯޑު އަލުން ޖައްސަވާ"
                        className="block w-full rounded-2xl border-slate-200 bg-white px-5 py-4 pl-12 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 text-slate-700"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <LockIcon />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold border text-center ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
              {message.text}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <SaveIcon className="w-5 h-5" />
              <span>ސޭވް ކުރޭ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
