import React, { useState, useEffect } from 'react';
import { LockIcon, UserIcon, WritingIcon } from './icons';
import { APP_CONFIG } from '../config';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
  error?: string | null;
}

const PHRASES = [
  "އިލްމަކީ އިންސާނާގެ ލޮލުގެ ނޫރެވެ.",
  "ކޮންމެ ކާމިޔާބީއެއްގެ ފަހަތުގައިވަނީ ބުރަ މަސައްކަތެވެ.",
  "ވަގުތަކީ ހިނގަހިނގާ ހުންނަ ކަނޑި އެކެވެ.",
  "އަދަބަކީ އިންސާނާގެ އެންމެ އަގުބޮޑު ރައުސްމާލެވެ.",
  "ކިޔަވައިގެން ހުރި މީހަކީ ދުނިޔޭގައި ބާރުގަދަ މީހެކެވެ.",
  "އިލްމު ހޯދުމަކީ ކޮންމެ މުސްލިމެއްގެ މައްޗަށްވާ ވާޖިބެކެވެ.",
  "އަދަބުވެރިކަމަކީ އެންމެ މަތިވެރި ސިފައެވެ.",
  "ބަހަކީ ގައުމުގެ ދިރިހުރުމެވެ."
];

const TurtleGraphic = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10c-5.5 0-10 4.5-10 10 0 3.2 1.5 6 3.8 7.8-2.5 1.5-4.8 3.5-6.8 6.2-4.5-2.5-10-2.5-14.5 0-4.5 2.5-7 7.5-6.5 12.5s4.5 9 9.5 9.5c2.5 0.2 5-0.5 7.2-2 1 4.5 3.5 8.5 7 11.5-2.5 5-2.5 11 0 16 2.5 5 7.5 7.5 12.5 6.5s9-4.5 9.5-9.5c0.2-2.5-0.5-5-2-7.2 4.5-3.5 8.5-7.5 11.5-12.5 5 2.5 11 2.5 16 0 5-2.5 7.5-7.5 6.5-12.5s-4.5-9-9.5-9.5c-2.5-0.2-5 0.5-7.2 2-1-4.5-3.5-8.5-7-11.5 2.5-5 2.5-11 0-16-2.5-5-7.5-7.5-12.5-6.5S41 21.5 40.5 26.5c-0.2 2.5 0.5 5 2 7.2-4.5 3.5-8.5 7.5-11.5 12.5-5-2.5-11-2.5-16 0zM50 35c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z" />
    <circle cx="50" cy="55" r="12" />
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, error }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string>('');
  const [randomPhrase, setRandomPhrase] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PHRASES.length);
    setRandomPhrase(PHRASES[randomIndex]);
  }, []);

  useEffect(() => {
    setLocalError(error || '');
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!username || !password) { setLocalError('ޔޫސަރނޭމް އަދި ޕާސްވޯޑު ޖައްސަވާ!'); return; }
    if (!isLoginView) {
      if (password !== confirmPassword) { setLocalError('ޕާސްވޯޑު ދިމައެއް ނުވޭ.'); return; }
      if (password.length < 6) { setLocalError('ޕާސްވޯޑުގައި މަދުވެގެން 6 އަކުރު ހުންނަންވާނެ.'); return; }
      onRegister(username, password);
    } else {
      onLogin(username, password);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 via-teal-100 to-cyan-300 relative overflow-hidden font-['Faruma']">
      
      {/* Maldives-inspired background: Faded Turtles (Velaa) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <TurtleGraphic className="absolute top-[-5%] left-[-10%] w-96 h-96 text-white/10 rotate-[45deg] blur-[1px]" />
        <TurtleGraphic className="absolute bottom-[10%] right-[-15%] w-[500px] h-[500px] text-white/5 -rotate-[15deg] blur-[3px]" />
        <TurtleGraphic className="absolute top-[40%] right-[-5%] w-64 h-64 text-white/10 rotate-[120deg] blur-[1px]" />
        
        <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, transparent 22%)',
            backgroundSize: '120px 120px'
        }}></div>
      </div>

      <div className="w-full max-w-md px-6 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[48px] shadow-[0_32px_120px_-20px_rgba(0,128,128,0.2)] border border-white/50 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[30px] bg-gradient-to-tr from-teal-600 to-cyan-500 shadow-2xl shadow-teal-200 mb-6 group transition-all hover:scale-105 active:scale-95 cursor-default relative overflow-hidden">
              <WritingIcon className="h-10 w-10 text-white relative z-10" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">{APP_CONFIG.APP_NAME}</h1>
            <p className="text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em]">{APP_CONFIG.ORG_NAME}</p>
          </div>

          {isLoginView && (
            <div className="bg-teal-50/50 rounded-3xl p-5 mb-8 border border-teal-100/50">
                <p className="text-teal-900 text-center text-sm italic font-medium leading-relaxed">
                "{randomPhrase}"
                </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">ޔޫސަރނޭމް</label>
              <div className="relative group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ޔޫސަރނޭމް ޖައްސަވާ"
                  className="block w-full rounded-2xl border-slate-200 bg-white/50 px-6 py-4 pl-14 shadow-sm transition-all duration-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 placeholder:text-slate-300 text-slate-700 font-bold"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <UserIcon className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">ޕާސްވޯޑު</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ޕާސްވޯޑު ޖައްސަވާ"
                  className="block w-full rounded-2xl border-slate-200 bg-white/50 px-6 py-4 pl-14 shadow-sm transition-all duration-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 placeholder:text-slate-300 text-slate-700 font-bold"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <LockIcon className="w-5 h-5" />
                </div>
              </div>
            </div>

            {!isLoginView && (
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">ޕާސްވޯޑު ކަށަވަރުކުރައްވާ</label>
                    <div className="relative group">
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="ޕާސްވޯޑު އަލުން ޖައްސަވާ"
                        className="block w-full rounded-2xl border-slate-200 bg-white/50 px-6 py-4 pl-14 shadow-sm transition-all duration-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 placeholder:text-slate-300 text-slate-700 font-bold"
                        required
                        />
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                            <LockIcon className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            )}

            {localError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 text-center animate-shake">
                {localError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-black py-5 px-8 rounded-3xl shadow-xl shadow-teal-200/50 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-4 group mt-6"
            >
              <span>{isLoginView ? 'ވަންނަވާ' : 'ރެޖިސްޓަރ ވޭ'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-[-4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
                onClick={() => { setIsLoginView(!isLoginView); setLocalError(''); setUsername(''); setPassword(''); setConfirmPassword(''); }}
                className="text-xs font-black text-teal-600 hover:text-teal-800 transition-all underline decoration-2 underline-offset-8"
            >
                {isLoginView ? 'އެކައުންޓެއް ނެތް؟ ރެޖިސްޓަރ ވޭ!' : 'އެކައުންޓެއް އޮތް؟ ލޮގިން ވޭ!'}
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] font-black text-slate-900 mb-3">{APP_CONFIG.CREATOR_CREDIT}</p>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-[280px] mx-auto font-medium">
              {APP_CONFIG.ORG_DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Login;
