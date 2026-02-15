
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Feature, User } from './types';
import { FEATURES, FeatureConfig } from './constants';
import { APP_CONFIG } from './config';
import Navbar from './components/Navbar';
import FeaturePicker from './components/FeaturePicker';
import Editor from './components/Editor';
import LetterForm from './components/LetterForm';
import ResponseCard from './components/ResponseCard';
import Login from './components/Login';
import Settings from './components/Settings';
import Profile from './components/Profile';
import { runGeminiStream } from './services/geminiService';
import { TrashIcon, CopyIcon, GitHubIcon } from './components/icons';

const TODAY = new Date().toISOString().split('T')[0];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [activeFeature, setActiveFeature] = useState<Feature>(Feature.GENERATE_IDEAS);
  
  const [inputText, setInputText] = useState<string>('');
  const [geminiOutput, setGeminiOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [sourceLang, setSourceLang] = useState<'English' | 'Dhivehi'>('English');
  const [targetLang, setTargetLang] = useState<'English' | 'Dhivehi'>('Dhivehi');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize session from LocalStorage
  useEffect(() => {
    const savedSession = localStorage.getItem('thakuru_session');
    const allUsersStr = localStorage.getItem('thakuru_users') || '[]';
    let allUsers = JSON.parse(allUsersStr) as User[];
    
    const hasDefaultAdmin = allUsers.some(u => u.username === APP_CONFIG.DEFAULT_ADMIN.username);
    if (!hasDefaultAdmin) {
        const defaultAdmin: User = {
            username: APP_CONFIG.DEFAULT_ADMIN.username,
            displayName: 'Hunaruhub Admin',
            password: APP_CONFIG.DEFAULT_ADMIN.password,
            role: 'admin',
            isApproved: true,
            allowedFeatures: FEATURES.map(f => f.id),
            createdAt: Date.now(),
            apiLimit: 9999,
            dailyUsage: 0,
            lastUsageDate: TODAY
        };
        allUsers.push(defaultAdmin);
        localStorage.setItem('thakuru_users', JSON.stringify(allUsers));
    }

    setUsers(allUsers);

    if (savedSession) {
      const user = allUsers.find(u => u.username === savedSession);
      if (user) {
        if (user.lastUsageDate !== TODAY) {
          const updated = { ...user, dailyUsage: 0, lastUsageDate: TODAY };
          setCurrentUser(updated);
          const updatedUsers = allUsers.map(u => u.username === user.username ? updated : u);
          localStorage.setItem('thakuru_users', JSON.stringify(updatedUsers));
        } else {
          setCurrentUser(user);
        }
      }
    }
    setAuthLoading(false);
  }, []);

  const activeFeatureConfig = useMemo(() => {
    if (activeFeature === Feature.SETTINGS) return { id: Feature.SETTINGS, label: 'ސެޓިންގްސް', icon: <></> } as FeatureConfig;
    if (activeFeature === Feature.PROFILE) return { id: Feature.PROFILE, label: 'ޕްރޮފައިލް', icon: <></> } as FeatureConfig;
    return FEATURES.find(f => f.id === activeFeature) || FEATURES[0];
  }, [activeFeature]);

  const handleLogin = (username: string, pass: string) => {
    const user = users.find(u => u.username === username && u.password === pass);
    if (user) {
      if (!user.isApproved) {
        setLoginError('ތިބާގެ އެކައުންޓް އަދި އެޕްރޫވްއެއް ނުވޭ. އެޑްމިންއާ ގުޅުއްވާ.');
        return;
      }
      setCurrentUser(user);
      localStorage.setItem('thakuru_session', user.username);
    } else {
      setLoginError('ޔޫސަރނޭމް ނުވަތަ ޕާސްވޯޑު ގޯސް.');
    }
  };

  const handleRegister = (username: string, pass: string) => {
    if (users.find(u => u.username === username)) {
      setLoginError('ތިޔަ ޔޫސަރނޭމް މިހާރުވެސް ބޭނުންކުރެވިފައިވޭ.');
      return;
    }
    const isAdmin = username === 'admin' || username === APP_CONFIG.ADMIN_EMAIL;
    const newUser: User = {
      username,
      displayName: username,
      password: pass,
      role: isAdmin ? 'admin' : 'user',
      isApproved: isAdmin,
      allowedFeatures: isAdmin ? FEATURES.map(f => f.id) : [],
      createdAt: Date.now(),
      apiLimit: isAdmin ? 9999 : 10,
      dailyUsage: 0,
      lastUsageDate: TODAY
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('thakuru_users', JSON.stringify(updatedUsers));
    if (isAdmin) {
      setCurrentUser(newUser);
      localStorage.setItem('thakuru_session', newUser.username);
    } else {
      setLoginError('ރެޖިސްޓްރޭޝަން ކާމިޔާބު! އެޑްމިން އެޕްރޫވް ކުރުމުން ވަދެވޭނެ.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('thakuru_session');
    handleClearSession();
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.username === updatedUser.username ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('thakuru_users', JSON.stringify(updatedUsers));
    if (currentUser?.username === updatedUser.username) {
      setCurrentUser(updatedUser);
    }
  };

  const handleDeleteUser = (username: string) => {
    if (username === APP_CONFIG.DEFAULT_ADMIN.username) return;
    const updatedUsers = users.filter(u => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('thakuru_users', JSON.stringify(updatedUsers));
  };

  const incrementUsage = async () => {
    if (!currentUser) return;
    const newUsage = currentUser.dailyUsage + 1;
    const updated = { ...currentUser, dailyUsage: newUsage };
    setCurrentUser(updated);
    handleUpdateUser(updated);
  };

  const handleClearSession = () => {
    setInputText('');
    setGeminiOutput('');
    setError(null);
  };

  const handleFeatureSelect = (feature: Feature) => {
    setActiveFeature(feature);
    setIsMenuOpen(false);
    setInputText('');
    setGeminiOutput('');
    setError(null);
  };

  const handleGoHome = () => {
    setActiveFeature(Feature.GENERATE_IDEAS);
    setIsMenuOpen(false);
  };

  const handleSubmit = useCallback(async () => {
    if (!currentUser) return;
    if (currentUser.dailyUsage >= currentUser.apiLimit) {
      setError("މިއަދުގެ ލިމިޓް ހަމަވެއްޖެ.");
      return;
    }
    
    if (!inputText.trim() && ![Feature.SPEECH_TO_TEXT, Feature.OCR, Feature.PDF_TO_WORD].includes(activeFeature)) { 
      setError('ފުރަތަމަ ލިޔުމެއް ޖެއްސަވާ.'); 
      return; 
    }

    setIsLoading(true);
    setError(null);
    setGeminiOutput('');
    
    try {
      const params = activeFeature === Feature.TRANSLATE ? { sourceLang, targetLang } : undefined;
      await runGeminiStream(
        activeFeature, 
        inputText, 
        (chunk) => setGeminiOutput(chunk),
        params
      );
      incrementUsage();
    } catch (e: any) {
      setError(e.message || 'މައްސަލައެއް ދިމާވެއްޖެ.');
    } finally {
      setIsLoading(false);
    }
  }, [activeFeature, inputText, sourceLang, targetLang, currentUser]);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleSave = () => {
    if (!geminiOutput) return;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Thakuru Document</title></head><body>";
    const footer = "</body></html>";
    let content = geminiOutput;
    if (window.marked && window.marked.parse) content = window.marked.parse(geminiOutput) as string;
    const styledContent = `<div dir="rtl" style="font-family: 'Faruma', sans-serif; text-align: right;">${content}</div>`;
    const sourceHTML = header + styledContent + footer;
    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thakuru_doc.doc';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <div className="animate-spin h-10 w-10 border-4 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} error={loginError} />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden" dir="rtl">
      <Navbar 
        activeFeatureLabel={activeFeatureConfig.label} 
        onMenuToggle={() => setIsMenuOpen(true)} 
        onLogout={handleLogout}
        currentUser={currentUser}
        activeFeatureId={activeFeature}
        onNavigateSettings={() => setActiveFeature(Feature.SETTINGS)}
        onNavigateProfile={() => setActiveFeature(Feature.PROFILE)}
        onNavigateHome={handleGoHome}
      />

      {isMenuOpen && (
        <FeaturePicker 
          activeFeature={activeFeature} 
          onFeatureSelect={handleFeatureSelect} 
          onClose={() => setIsMenuOpen(false)} 
          currentUser={currentUser}
        />
      )}
      
      {activeFeature === Feature.SETTINGS ? (
          <Settings 
            users={users} 
            onUpdateUser={handleUpdateUser} 
            onDeleteUser={handleDeleteUser}
            currentUser={currentUser}
            onClose={handleGoHome}
          />
      ) : activeFeature === Feature.PROFILE ? (
          <Profile 
            currentUser={currentUser}
            onUpdateProfile={(data) => handleUpdateUser({...currentUser, ...data})}
            onClose={handleGoHome}
          />
      ) : (
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            <section className="flex-1 flex flex-col bg-white border-l lg:border-l-0 lg:border-b-0 border-slate-200 overflow-y-auto">
            <div className="p-4 lg:p-6 flex flex-col h-full min-h-[400px] lg:min-h-0">
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-teal-600 bg-teal-50 p-1.5 rounded-lg">{activeFeatureConfig.icon}</span>
                    <h2 className="font-bold text-slate-700">{activeFeatureConfig.label}</h2>
                </div>
                <button onClick={handleClearSession} className="text-[11px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-wider">
                    <TrashIcon className="h-3 w-3" />ފޮހެލާ
                </button>
                </div>

                {activeFeature === Feature.TRANSLATE && (
                    <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-100 self-center">
                        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value as any)} className="bg-transparent text-xs font-bold text-slate-700 px-2 focus:outline-none cursor-pointer">
                            <option value="English">English</option>
                            <option value="Dhivehi">Dhivehi</option>
                        </select>
                        <button onClick={handleSwapLanguages} className="p-1.5 rounded-full hover:bg-white text-teal-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        </button>
                        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value as any)} className="bg-transparent text-xs font-bold text-slate-700 px-2 focus:outline-none cursor-pointer">
                            <option value="Dhivehi">Dhivehi</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                )}

                <div className="flex-1 flex flex-col">
                {activeFeature === Feature.DRAFT_LETTER ? (
                    <LetterForm currentUser={currentUser} onChange={setInputText} className="flex-1" />
                ) : (
                    <Editor value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={activeFeatureConfig.placeholder} dir={activeFeature === Feature.TRANSLATE && sourceLang === 'English' ? 'ltr' : 'rtl'} className="flex-1 text-lg lg:text-xl" />
                )}
                </div>
                
                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                    <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentUser.dailyUsage >= currentUser.apiLimit ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                            ބޭނުންކުރި މިންވަރު: {currentUser.dailyUsage} / {currentUser.apiLimit}
                        </span>
                    </div>
                    <button onClick={handleSubmit} disabled={isLoading || (!inputText.trim() && ![Feature.SPEECH_TO_TEXT, Feature.OCR, Feature.PDF_TO_WORD].includes(activeFeature)) || currentUser.dailyUsage >= currentUser.apiLimit} className="bg-teal-600 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg hover:bg-teal-700 disabled:bg-slate-200 transition-all">
                        {isLoading ? 'މަސައްކަތް ކުރަނީ...' : activeFeatureConfig.buttonText}
                    </button>
                </div>
            </div>
            </section>

            <section className="flex-1 flex flex-col bg-slate-50/50 border-t lg:border-t-0 lg:border-r border-slate-200 overflow-y-auto">
            <div className="p-4 lg:p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ނަތީޖާ</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => geminiOutput && navigator.clipboard.writeText(geminiOutput)} disabled={!geminiOutput} className="p-2 text-slate-400 hover:text-teal-600"><CopyIcon className="w-4 h-4" /></button>
                        <button onClick={handleSave} disabled={!geminiOutput} className="p-2 text-teal-600 bg-white rounded-lg shadow-sm font-bold text-xs">ވޯޑް</button>
                    </div>
                </div>
                <ResponseCard output={geminiOutput} isLoading={isLoading} error={error} dir={activeFeature === Feature.TRANSLATE && targetLang === 'English' ? 'ltr' : 'rtl'} />
            </div>
            </section>
        </main>
      )}

      <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-6 text-[10px] text-slate-400 font-medium shrink-0">
        <p className="font-bold">{APP_CONFIG.CREATOR_CREDIT}</p>
        <div className="flex items-center gap-4">
           <a href={APP_CONFIG.GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600 transition-colors">
              <GitHubIcon />
              <span>GitHub</span>
           </a>
           <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100 hidden sm:flex items-center gap-1">އެންކްރިޕްޓް ކުރެވިފައި</span>
           <span>{APP_CONFIG.APP_NAME} {APP_CONFIG.VERSION}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
