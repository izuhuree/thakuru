export enum Feature {
  GENERATE_IDEAS = 'GENERATE_IDEAS',
  CHECK_GRAMMAR = 'CHECK_GRAMMAR',
  FIND_DEFINITION = 'FIND_DEFINITION',
  IMPROVE_SENTENCE = 'IMPROVE_SENTENCE',
  OUTLINE_ESSAY = 'OUTLINE_ESSAY',
  OUTLINE_STORY = 'OUTLINE_STORY',
  TRANSLATE = 'TRANSLATE',
  DRAFT_LETTER = 'DRAFT_LETTER',
  SPEECH_TO_TEXT = 'SPEECH_TO_TEXT',
  PARAPHRASE = 'PARAPHRASE',
  SUMMARIZE = 'SUMMARIZE',
  OCR = 'OCR',
  PDF_TO_WORD = 'PDF_TO_WORD',
  SETTINGS = 'SETTINGS', // Admin only
  PROFILE = 'PROFILE', // User profile
}

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  displayName?: string;
  password: string; // In a real app, this should be hashed
  role: UserRole;
  isApproved: boolean;
  allowedFeatures: Feature[];
  createdAt: number;
  apiLimit: number; // Max requests per day
  dailyUsage: number; // Current usage for the day
  lastUsageDate: string; // YYYY-MM-DD
}