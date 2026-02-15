
import React, { useState, useEffect } from 'react';
import { GOVERNMENT_OFFICES } from '../constants';
import { User } from '../types';

interface LetterFormProps {
  currentUser: User;
  onChange: (formattedRequest: string) => void;
  className?: string;
}

// Helper hook for managing input history in LocalStorage
const useInputHistory = (key: string, defaultOptions: string[] = []) => {
  const [options, setOptions] = useState<string[]>(defaultOptions);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge defaults with stored, unique values only
      setOptions(Array.from(new Set([...defaultOptions, ...parsed])));
    }
  }, [key]);

  const saveValue = (value: string) => {
    if (!value.trim()) return;
    const newOptions = Array.from(new Set([...options, value]));
    setOptions(newOptions);
    localStorage.setItem(key, JSON.stringify(newOptions));
  };

  return { options, saveValue };
};

const LetterForm: React.FC<LetterFormProps> = ({ currentUser, onChange, className = "" }) => {
  const [type, setType] = useState<'formal' | 'informal'>('formal');
  
  // Form States
  const [senderOffice, setSenderOffice] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientOffice, setRecipientOffice] = useState('');
  const [body, setBody] = useState('');
  const [senderName, setSenderName] = useState(currentUser.displayName || currentUser.username);
  const [senderTitle, setSenderTitle] = useState('');
  const [dates, setDates] = useState({ hijri: '', gregorian: '' });

  // Generate Recipient Suggestions from GOVERNMENT_OFFICES
  const recipientSuggestions = GOVERNMENT_OFFICES
    .filter(o => o.incumbent)
    .map(o => `${o.head} ${o.incumbent}`);

  // History Hooks
  const senderOfficeHistory = useInputHistory('thakuru_history_sender_office', GOVERNMENT_OFFICES.map(o => o.name));
  const senderAddressHistory = useInputHistory('thakuru_history_sender_address', []);
  const recipientNameHistory = useInputHistory('thakuru_history_recipient_name', recipientSuggestions);
  const recipientOfficeHistory = useInputHistory('thakuru_history_recipient_office', GOVERNMENT_OFFICES.map(o => o.name));

  // Calculate Dates on Mount
  useEffect(() => {
    const today = new Date();
    const gregorian = new Intl.DateTimeFormat('dv-MV', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }).format(today);

    let hijri = '';
    try {
        hijri = new Intl.DateTimeFormat('dv-MV', { 
            calendar: 'islamic-umalqura',
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        }).format(today);
    } catch (e) {
        hijri = 'ހިޖުރީ ތާރީޚް'; 
    }

    setDates({ hijri, gregorian });
  }, []);

  // Update parent with JSON string whenever form changes
  useEffect(() => {
    const requestData = {
        type,
        header: {
            senderOffice: type === 'formal' ? senderOffice : '',
            senderAddress,
            referenceNumber,
        },
        recipient: {
            name: recipientName,
            office: recipientOffice
        },
        body,
        signature: {
            name: senderName,
            title: senderTitle
        },
        dates
    };
    onChange(JSON.stringify(requestData));
  }, [type, senderOffice, senderAddress, referenceNumber, recipientName, recipientOffice, body, senderName, senderTitle, dates, onChange]);

  return (
    <div className={`w-full h-full flex flex-col bg-white rounded-2xl p-6 md:p-10 overflow-y-auto border border-slate-200 shadow-inner ${className}`}>
      
      {/* Header / Type Selection Toggle */}
      <div className="flex items-center justify-center gap-6 mb-10 pb-6 border-b border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer group">
            <input 
                type="radio" 
                name="letterType" 
                checked={type === 'formal'} 
                onChange={() => setType('formal')}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className={`text-sm font-black transition-colors ${type === 'formal' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>ރަސްމީ ސިޓީ (Official)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
            <input 
                type="radio" 
                name="letterType" 
                checked={type === 'informal'} 
                onChange={() => setType('informal')}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className={`text-sm font-black transition-colors ${type === 'informal' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>އާންމު ސިޓީ (General)</span>
        </label>
      </div>

      {/* Basmalah - No Logo */}
      <div className="text-center mb-10 pb-6 border-b border-slate-50">
         <p className="text-2xl font-bold text-slate-900 font-serif">بسم الله الرحمن الرحيم</p>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-6">
            
            {/* Sender Information (Right Aligned) */}
            <div className="flex flex-col items-start space-y-2">
                <div className="w-full max-w-md text-right">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ސިޓީ ފޮނުވާ ފަރާތް / އޮފީސް</label>
                    <input
                        list="senderOfficeOptions"
                        type="text"
                        value={type === 'formal' ? senderOffice : senderName}
                        onChange={(e) => type === 'formal' ? setSenderOffice(e.target.value) : setSenderName(e.target.value)}
                        onBlur={(e) => type === 'formal' && senderOfficeHistory.saveValue(e.target.value)}
                        placeholder={type === 'formal' ? "އޮފީހުގެ ނަން (ލިޔުއްވާ ނުވަތަ ޚިޔާރުކުރައްވާ)" : "ތިބާގެ ނަން"}
                        className="w-full p-2 text-right border-b border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 placeholder:text-slate-200 bg-transparent"
                    />
                    <datalist id="senderOfficeOptions">
                        {senderOfficeHistory.options.map((opt, i) => <option key={i} value={opt} />)}
                    </datalist>
                </div>
                {/* Address on new line */}
                <div className="w-full max-w-md text-right">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ރަށް / އެޑްރެސް</label>
                    <input
                        list="senderAddressOptions"
                        type="text"
                        value={senderAddress}
                        onChange={(e) => setSenderAddress(e.target.value)}
                        onBlur={(e) => senderAddressHistory.saveValue(e.target.value)}
                        placeholder="ރަށް، ދިވެހިރާއްޖެ"
                        className="w-full p-2 text-right border-b border-slate-100 focus:border-indigo-500 outline-none text-sm text-slate-600 placeholder:text-slate-200 bg-transparent"
                    />
                    <datalist id="senderAddressOptions">
                         {senderAddressHistory.options.map((opt, i) => <option key={i} value={opt} />)}
                    </datalist>
                </div>
            </div>

            {/* Reference Number (Left Aligned - Physical Left) */}
            <div className="w-full flex justify-end flex-row-reverse" dir="ltr">
                <div className="w-full max-w-xs">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">ނަންބަރު (Reference Number)</label>
                    <input
                        type="text"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        placeholder="Ex: (IUL)455-A/2025/12"
                        className="w-full p-2 text-left border-b border-slate-100 focus:border-indigo-500 outline-none text-sm font-mono placeholder:text-slate-200 bg-transparent"
                    />
                </div>
            </div>
        </div>

        {/* Recipient Name (Right Aligned) */}
        <div className="space-y-4 pt-4">
            <div className="text-right max-w-md ml-auto">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ސިޓީ ލިބޭ ފަރާތް (ނަން/މަޤާމު)</label>
                <input
                    list="recipientNameOptions"
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    onBlur={(e) => recipientNameHistory.saveValue(e.target.value)}
                    placeholder="ސިޓީ ލިބޭ ވެރިޔާގެ ނަން ނުވަތަ މަޤާމު"
                    className="w-full p-2 text-right border-b border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-800 placeholder:text-slate-200 bg-transparent"
                />
                <datalist id="recipientNameOptions">
                    {recipientNameHistory.options.map((opt, i) => <option key={i} value={opt} />)}
                </datalist>
            </div>
            
            <p className="text-slate-800 font-bold text-right pt-4">ވެދުން ސަލާމަށްފަހު ދަންނަވަމެވެ.</p>
        </div>

        {/* Body Section (Text Area) */}
        <div className="flex-1 flex flex-col">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-right">ސިޓީގައި ހިމަނަން ބޭނުންވާ މައިގަނޑު ނުކުތާތައް</label>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="ސިޓީގައި ބަޔާންކުރަން ބޭނުންވާ ތަފްސީލީ މަޢުލޫމާތު މިތާ ލިޔުއްވާ..."
                className="w-full flex-1 min-h-[250px] p-4 text-right border border-slate-100 rounded-2xl bg-slate-50/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none text-lg leading-relaxed resize-none transition-all placeholder:text-slate-200"
            />
            <p className="text-slate-800 font-bold text-right pt-6">އިޙްތިރާމް ޤަބޫލު ކުރެއްވުން އެދެމެވެ.</p>
        </div>

        {/* Footer / Signature Area */}
        <div className="pt-8 border-t border-slate-50 flex flex-col gap-8 w-full">
            
            {/* Dates (Right Aligned - self-start in RTL) */}
            <div className="text-right space-y-2 self-start">
                <p className="text-slate-500 text-xs font-mono block">{dates.hijri}</p>
                <p className="text-slate-500 text-xs font-mono block">{dates.gregorian}</p>
            </div>
            
            {/* Signature Block (Left Aligned - self-end in RTL, contents Left Aligned) */}
            <div className="flex flex-col items-start self-end min-w-[240px]">
                <p className="text-slate-800 font-bold mb-4 text-left w-full">ޚާދިމްކުމް</p>
                
                <div className="w-full py-8 border-b border-dashed border-slate-300 relative group/sig mb-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest absolute bottom-1 left-0 transition-colors group-hover/sig:text-indigo-400">ސޮއި</span>
                </div>
                
                <div className="w-full space-y-2">
                    <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="ނަން"
                        className="w-full p-2 text-left border-b border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 placeholder:text-slate-200 bg-transparent"
                    />
                    <input
                        type="text"
                        value={senderTitle}
                        onChange={(e) => setSenderTitle(e.target.value)}
                        placeholder="މަޤާމު"
                        className="w-full p-2 text-left border-b border-slate-100 focus:border-indigo-500 outline-none text-sm text-slate-500 placeholder:text-slate-200 bg-transparent"
                    />
                </div>
            </div>

            {/* Recipient Office (Right Aligned - self-start in RTL) */}
            <div className="w-full max-w-md self-start">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-right">ސިޓީ ލިބޭ ފަރާތް / އިދާރާ</label>
                <input 
                    list="recipientOfficeOptions"
                    type="text"
                    value={recipientOffice} 
                    onChange={(e) => setRecipientOffice(e.target.value)}
                    onBlur={(e) => recipientOfficeHistory.saveValue(e.target.value)}
                    placeholder="އިދާރާ ޚިޔާރުކުރައްވާ ނުވަތަ ލިޔުއްވާ..."
                    className="w-full p-2 text-right border-b border-slate-100 focus:border-indigo-500 outline-none text-sm font-bold text-slate-800 bg-transparent"
                />
                <datalist id="recipientOfficeOptions">
                    {recipientOfficeHistory.options.map((opt, i) => <option key={i} value={opt} />)}
                </datalist>
            </div>
        </div>

      </div>
    </div>
  );
};

export default LetterForm;
