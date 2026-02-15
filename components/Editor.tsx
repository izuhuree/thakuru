
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  dir?: 'rtl' | 'ltr';
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder, dir = "rtl", className = "" }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dir={dir}
      spellCheck={false}
      className={`w-full h-full p-0 bg-transparent focus:outline-none transition-all duration-300 leading-[1.8] placeholder:text-slate-300 text-slate-800 resize-none ${dir === 'rtl' ? 'text-right' : 'text-left'} ${className}`}
    />
  );
};

export default Editor;
