
import React, { useMemo, useState } from 'react';
import { CopyIcon } from './icons';

declare global {
  interface Window {
    marked: {
      parse: (markdown: string) => string;
    };
    DOMPurify: {
      sanitize: (html: string) => string;
    };
  }
}

interface ResponseCardProps {
  output: string;
  isLoading: boolean;
  error: string | null;
  dir?: 'rtl' | 'ltr';
}

const ResponseCard: React.FC<ResponseCardProps> = ({ output, isLoading, error, dir = "rtl" }) => {
  const [copied, setCopied] = useState(false);

  const sanitizedHtml = useMemo(() => {
    if (!output || typeof window.marked?.parse !== 'function' || typeof window.DOMPurify?.sanitize !== 'function') {
      return { __html: `<p>${output.replace(/\n/g, '<br>')}</p>` };
    }
    const rawHtml = window.marked.parse(output);
    const sanitized = window.DOMPurify.sanitize(rawHtml);
    return { __html: sanitized };
  }, [output]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] h-full gap-6 animate-pulse p-4 text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="space-y-2">
           <p className="text-indigo-900 font-black text-sm tracking-widest uppercase">ޖަވާބު ތައްޔާރުކުރަނީ</p>
           <p className="text-slate-400 text-[11px] font-medium">އޭ.އައި އިން ތިބާގެ ޖަވާބު ތައްޔާރުކުރަނީ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <div className="text-center bg-red-50 border border-red-100 p-6 rounded-2xl max-w-sm w-full shadow-sm">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <p className="font-black text-red-900 mb-1 text-sm uppercase tracking-wide">މައްސަލައެއް ދިމާވެއްޖެ</p>
          <p className="text-red-700 text-xs leading-relaxed font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="flex items-center justify-center h-full p-4 opacity-40">
        <div className="text-center max-w-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">އެހީތެރިވުމަށް ތައްޔާރު</p>
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium px-4">ލިޔުން ޖެއްސެވުމަށްފަހު ބަޓަނަށް ފިއްތަވާލައްވައިގެން ޕްރޮފެޝަނަލް ނަތީޖާއެއް ހޯއްދަވާ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group/card h-full flex flex-col">
      <div
        dir={dir}
        className={`markdown-content prose prose-indigo max-w-none flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'} p-2 lg:p-0`}
        dangerouslySetInnerHTML={sanitizedHtml}
      />
      
      <div className={`mt-6 pt-4 border-t border-slate-100 flex ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-sm border ${
            copied 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
              : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/30'
          }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">ކޮޕީ ކުރެވިއްޖެ!</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span className="text-xs">ކޮޕީ ކުރޭ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResponseCard;
