
import React from 'react';

const iconClass = "w-6 h-6";

export interface IconProps {
  className?: string;
}

// Indigenous: Holhuashi (Traditional Resting Place) - Ideas/Community
export const HolhuashiIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6L12 2L22 6" />
    <path d="M4 6V21" />
    <path d="M20 6V21" />
    <rect x="4" y="15" width="16" height="4" rx="2" />
    <circle cx="8" cy="12" r="1.5" /> 
    <path d="M9.5 13.5L14 14.5L17 13.5L18 11.5" /> 
    <path d="M9.5 13.5L8.5 14.5" /> 
  </svg>
);

// Indigenous: Sangu (Conch Shell) - Voice/Announcement
export const SanguIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.5 13.5c-1.5 2-4.5 4-7.5 4.5s-6-1.5-7.5-3.5c-1-1.5-1.5-4 0-6.5s4-4.5 7.5-4.5 6.5 2 7.5 4.5c.5 1.5 0 3.5 0 5.5z" />
    <path d="M12 7.5c2 0 4.5 1.5 5.5 3.5M4.5 14.5c1.5 1.5 4.5 2.5 7.5 2" />
    <path d="M19.5 13.5l1.5 2.5M12 4.5v-2" />
  </svg>
);

// Indigenous: Dhoani (Traditional Boat) - Translation/Flow
export const DhoaniIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 15c4 2 14 2 18 0l-1 4H4l-1-4z" />
    <path d="M12 15V5L7 9h5z" />
    <path d="M3 19s4 1.5 9 1.5 9-1.5 9-1.5" />
  </svg>
);

// Indigenous: Hirigaa (Coral Stone Carving) - Paraphrasing/Structuring
export const HirigaaIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h4M4 8l2-2M18 18l2-2" />
  </svg>
);

// Indigenous: Liyelaa (Lacquer Pattern) - Polishing/Improvement
export const LiyelaaIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4" />
  </svg>
);

// Indigenous: Kasabu (Embroidery/Lace) - Grammar/Precision
export const KasabuIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12l3-3 3 3 3-3 3 3 3-3 3 3" />
    <path d="M3 16l3-3 3 3 3-3 3 3 3-3 3 3" opacity="0.5" />
    <path d="M3 8l3-3 3 3 3-3 3 3 3-3 3 3" opacity="0.5" />
  </svg>
);

// Indigenous: Thalhafilai (Slate) - Essay/Writing surface
export const ThalhafilaiIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
    <path d="M4 8h16M7 12h10M7 16h6" />
  </svg>
);

// Standard App Icons
export const WritingIcon: React.FC<IconProps> = ({className = iconClass + " text-white"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 2L8 10V18C8 19.1 8.9 20 10 20H14C15.1 20 16 19.1 16 18V10L12 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 2V12" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10 14H14" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 21H19" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 22H15" />
    </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({className = "w-4 h-4"}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({className = iconClass}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const CopyIcon: React.FC<IconProps> = ({className = "h-5 w-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({className = "h-5 w-5"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({className = "h-5 w-5"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const LockIcon: React.FC<IconProps> = ({className = "h-5 w-5"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({className = "w-5 h-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({className = "w-5 h-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ListIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

export const EnvelopeIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 2H20v15H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

/** FIX: Added missing EyeIcon for OCR feature */
export const EyeIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

/** FIX: Added missing WordFileIcon for PDF conversion feature */
export const WordFileIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

/** FIX: Added missing SaveIcon for Profile saving */
export const SaveIcon: React.FC<IconProps> = ({className = iconClass}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);
