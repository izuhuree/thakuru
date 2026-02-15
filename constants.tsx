
import React from 'react';
import { Feature } from './types';
import { 
  SanguIcon, 
  DhoaniIcon, 
  HirigaaIcon, 
  LiyelaaIcon, 
  KasabuIcon, 
  ThalhafilaiIcon,
  EnvelopeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  EyeIcon,
  WordFileIcon,
  SparklesIcon,
  HolhuashiIcon
} from './components/icons';

export interface FeatureConfig {
  id: Feature;
  label: string;
  description: string;
  placeholder: string;
  buttonText: string;
  icon: React.ReactElement;
  category: 'creation' | 'polish' | 'tools'; 
}

export const GOVERNMENT_OFFICES = [
  // State
  { name: 'ރައީސުލްޖުމްހޫރިއްޔާގެ އޮފީސް', head: 'ރައީސުލްޖުމްހޫރިއްޔާ', incumbent: 'ޑރ. މުޙައްމަދު މުޢިއްޒު' },
  { name: 'ރައްޔިތުންގެ މަޖިލީހުގެ އިދާރާ', head: 'ރައްޔިތުންގެ މަޖިލީހުގެ ރައީސް', incumbent: 'އޮނަރަބަލް ޢަބްދުއްރަޙީމް ޢަބްދުﷲ' },
  { name: 'އެޓަރނީ ޖެނެރަލްގެ އޮފީސް', head: 'އެޓަރނީ ޖެނެރަލް', incumbent: 'އުސްތާޗު އަޙްމަދު އުޝާމް' },
  
  // Ministries
  { name: 'މިނިސްޓްރީ އޮފް ޑިފެންސް', head: 'މިނިސްޓަރ', incumbent: 'ޣައްސާން މައުމޫން' },
  { name: 'މިނިސްޓްރީ އޮފް ފޮރިން އެފެއާޒް', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. ޢަބްދުﷲ ޚަލީލް' },
  { name: 'މިނިސްޓްރީ އޮފް ހޯމްލޭންడ్ ސެކިއުރިޓީ އެންޑް ޓެކްނޯލޮޖީ', head: 'މިނިސްޓަރ', incumbent: 'ޢަލީ އިޙްސާން' },
  { name: 'މިނިސްޓްރީ އޮފް ފިނޭންސް', head: 'މިނިސްޓަރ', incumbent: 'މޫސާ ޒަމީރު' },
  { name: 'މިނިސްޓްރީ އޮފް އެޑިޔުކޭޝަން', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. އިސްމާޢީލް ޝަފީޢު' },
  { name: 'މިނިސްޓްރީ އޮފް ހެލްތު', head: 'މިނިސްޓަރ', incumbent: 'ޢަބްދުﷲ ނާޡިމް އިބްރާހީމް' },
  { name: 'މިނިސްޓްރީ އޮފް އިކޮނޮމިކް ޑިވެލޮޕްމަންޓް އެންޑް ޓްރޭޑް', head: 'މިނިސްޓަރ', incumbent: 'މުޙައްމަދު ސަޢީދު' },
  { name: 'މިނިސްޓްރީ އޮފް ފިޝަރީޒް އެންޑް އޯޝަން ރިސޯސަސް', head: 'މިނިސްޓަރ', incumbent: 'އަޙްމަދު ޝިޔާމް' },
  { name: 'މިނިސްޓްރީ އޮފް އިސްލާމިކް އެފެއާޒް', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. މުޙައްމަދު ޝަހީމް ޢަލީ ސަޢީދު' },
  { name: 'މިނިސްޓްރީ އޮފް ޓޫރިޒަމް އެންވަޔަރަންމަންޓް އެންޑް ކްލައިމެޓް ޗޭންޖް', head: 'މިނިސްޓަރ', incumbent: 'ޠާރިޤް އިބްރާހީމް' },
  { name: 'މިނިސްޓްރީ އޮފް ސޯޝަލް އެންޑް ފެމިލީ ޑިވެލޮޕްމަންޓް', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. ޢާއިޝަތު ޝިހާމް' },
  { name: 'މިނިސްޓްރީ އޮފް ސްޕޯޓސް، ފިޓްނަސް އެންޑް ރެކްރިއޭޝަން', head: 'މިނިސްޓަރ', incumbent: 'ޢަބްދުﷲ ރާފިޢު' },
  { name: 'މިނިސްޓްރީ އޮފް ހައުސިންގ، ލޭންޑް އެންޑް އަރބަން ޑިވެލޮޕްމަންޓް', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. ޢަލީ ޙައިދަރު އަޙްމަދު' },
  { name: 'މިނިސްޓްރީ އޮފް ޓްރާންސްޕޯޓް އެންޑް ސިވިލް އޭވިއޭޝަން', head: 'މިނިސްޓަރ', incumbent: 'މުޙައްމަދު އަމީން' },
  { name: 'މިނިސްޓްރީ އޮފް ދިވެހި ލެންގުއޭޖް، ކަލްޗަރ އެންޑް ހެރިޓޭޖް', head: 'މިނިސްޓަރ', incumbent: 'އާދަމް ނަޞީރު އިބްރާހީމް' },
  { name: 'މިނިސްޓްރީ އޮފް ހަޔަރ އެޑިޔުކޭޝަން، ލޭބަރ އެންޑް ސްކިލްސް ޑިވެލޮޕްމަންޓް', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. މަރިޔަމް މާރިޔާ' },
  { name: 'މިނިސްޓްރީ އޮފް ކޮންސްޓްރަކްޝަން އެންޑް އިންފްރާސްޓްރަކްޗަރ', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. ޢަބްދުﷲ މުއްޠަލިބް' },
  { name: 'މިނިސްޓްރީ އޮފް އެގްރިކަލްޗަރ އެންޑް އެނިމަލް ވެލްފެއަރ', head: 'މިނިސްޓަރ', incumbent: 'ޑރ. ޢާއިޝަތު ރަމީލާ' },
  { name: 'މިނިސްޓްރީ އޮފް ޔޫތު އެމްޕަވަރމަންޓް، އިންފޮމޭޝަން އެންޑް އާޓްސް', head: 'މިނިސްޓަރ', incumbent: 'އިބްރާހީމް ވަޙީދު' },
  { name: 'މިނިސްޓްރީ އޮފް ސިޓީސް، ލޯކަލް ގަވަރުމަންޓް އެންޑް ޕަބްލިކ ވޯކްސް', head: 'މިނިސްޓަރ', incumbent: 'އާދަމް ޝަރީފް ޢުމަރު' },
  
  // Uniformed Bodies & Law Enforcement
  { name: 'މޯލްޑިވްސް ނޭޝަނަލް ޑިފެންސް ފޯސް', head: 'ޗީފް އޮފް ޑިފެންސް ފޯސް', incumbent: 'މޭޖަރ ޖެނެރަލް އިބްރާހީމް ޙިލްމީ' },
  { name: 'މޯލްޑިވްސް ޕޮލިސް ސަރވިސް', head: 'ކޮމިޝަނަރ އޮފް ޕްލިސް', incumbent: 'ޢަލީ ޝުޖާޢު' },
  { name: 'މޯލްޑިވްސް ކަސްޓަމްސް ސަރވިސް', head: 'ކޮމިޝަނަރ ޖެނެރަލް', incumbent: 'ޔޫސުފް މާނިޢު މުޙައްމަދު' },
  { name: 'މޯލްޑިވްސް އިމިގްރޭޝަން', head: 'ކޮންޓްރޯލަރ ޖެނެރަލް', incumbent: 'މުޙައްމަދު ޝަމާން ވަޙީދު' },
  { name: 'މޯލްޑިވްސް ކަރެކްޝަނަލް ސަރވިސް', head: 'ކޮމިޝަނަރ އޮފް ޕްރިޒަންސް', incumbent: 'ޙަސަން ޒަރީރު' },
  
  // Independent Institutions & Commissions
  { name: 'ސިވިލް ސަރވިސް ކޮމިޝަން', head: 'ރައީސް', incumbent: 'މުޙައްމަދު ނާޞިޙް' },
  { name: 'ހިއުމަން ރައިޓްސް ކޮމިޝަން އޮފް ދަ މޯލްޑިވްސް', head: 'ރައީސް', incumbent: 'މަރިޔަމް މުނާ' },
  { name: 'އިލެކްޝަންސް ކޮމިޝަން', head: 'ރައީސް', incumbent: 'ފުއާދު ތައުފީޤު' },
  { name: 'އެންޓި-ކޮރަޕްޝަން ކޮމިޝަން', head: 'ރައީސް', incumbent: 'އާދަމް ޝާމިލް' },
  { name: 'އޮޑިޓަރ ޖެނެރަލްގެ އޮފީސް', head: 'އޮޑިޓަރ ޖެނެރަލް', incumbent: 'ޙުސައިން ނިޔާޒީ' },
  { name: 'ޕްރޮސެކިއުޓަރ ޖެނެރަލްގެ އޮފީސް', head: 'ޕްރޮސެކިއުޓަރ ޖެނެރަލް', incumbent: 'ޢައްބާސް ޝަރީފް' },
  { name: 'ޖުޑީޝަލް ސަރވިސް ކޮމިޝަން', head: 'ރައީސް', incumbent: '' },
  { name: 'ލޯކަލް ގަވަރުމަންޓް އޮތޯރިޓީ', head: 'ސީއީއޯ', incumbent: 'ޑރ. މަރިޔަމް ޒުލްފާ' },
  { name: 'މޯލްޑިވްސް އިންލަންޑް ރެވެނިއު އޮތޯރިޓީ', head: 'ކޮމިޝަނަރ ޖެނެރަލް', incumbent: 'ހަސަން ޒަރީރު' },
  { name: 'މޯލްޑިވްސް މަނިޓަރީ އޮތޯރިޓީ', head: 'ގަވަރުނަރު', incumbent: 'އަޙްމަދު މުނައްވަރު' },
  
  // City Councils
  { name: 'މާލެ ސިޓީ ކައުންސިލްގެ އިދާރާ', head: 'މޭޔަރު', incumbent: 'އާދަމް ޢާޒިމް' },
  { name: 'އައްޑޫ ސިޓީ ކައުންސިލްގެ އިދާރާ', head: 'މޭޔަރު', incumbent: 'ޢަލީ ނިޒާރު' },
  { name: 'ފުވައްމުލަކު ސިޓީ ކައުންސިލްގެ އިދާރާ', head: 'މޭޔަރު', incumbent: 'އިސްމާޢީލް ރަފީޤު' },
  { name: 'ކުޅުދުއްފުށި ސިޓީ ކައުންސިލްގެ އިދާރާ', head: 'މޭޔަރު', incumbent: 'މުޙައްމަދު އާތިފް' },
  { name: 'ތިނަދޫ ސިޓީ ކައުންސިލްގެ އިދާރާ', head: 'މޭޔަރު', incumbent: 'ސައުދު ޢަލީ' },
  
  // Other Key Agencies
  { name: 'ޑިޕާޓްމަންޓް އޮފް ނޭޝަނަލް ރަޖިސްޓްރޭޝަން', head: 'ޑިރެކްޓަރ ޖެނެރަލް', incumbent: '' },
  { name: 'ނޭޝަނަލް ސޯޝަލް ޕްރޮޓެކްޝަން އޭޖެންސީ', head: 'ސީއީއޯ', incumbent: 'ހީނާ ވަލީދު' },
  { name: 'އާސަންދަ ކޮމްޕެނީ ލިމިޓެޑް', head: 'މެނޭޖިންގ ޑިރެކްޓަރ', incumbent: 'އާމިނަތު ޒީނިޔާ' },
];

export const FEATURES: FeatureConfig[] = [
  // Group: އުފެއްދުންތެރިކަން (Creation)
  {
    id: Feature.GENERATE_IDEAS,
    label: 'ހޮޅުއަށި', 
    description: 'މި ބައިން ތިބާއަށް ވާހަކައެއް ނުވަތަ މަޒުމޫނެއް ފަދަ އެކި ކަންކަމަށް އައު ޚިޔާލުތައް ހޯދޭނެ.',
    placeholder: 'ކޮން ކަމަކާ މެދު މަޝްވަރާ ކޮށްލަން ބޭނުންވަނީ؟ ނުވަތަ ކޮން ޚިޔާލެއް ތަރައްޤީ ކުރަންވީ؟',
    buttonText: 'މަޝްވަރާ ފަށާ',
    icon: <HolhuashiIcon />,
    category: 'creation'
  },
  {
    id: Feature.OUTLINE_STORY,
    label: 'ވާހަކަ',
    description: 'ވާހަކައިގެ ކެރެކްޓަރުންނާއި ހާދިސާތައް ރާވާލުމަށް.',
    placeholder: 'ވާހަކައިގެ މައިގަނޑު ޚިޔާލު ލިޔުއްވާ...',
    buttonText: 'ވާހަކަ ރާވާލާ',
    icon: <SanguIcon />,
    category: 'creation'
  },
  {
    id: Feature.OUTLINE_ESSAY,
    label: 'މަޒުމޫނު',
    description: 'މަޒުމޫނުގެ އޮނިގަނޑު ރާވައި ބައިތައް ކަނޑައެޅުމަށް.',
    placeholder: 'މަޒުމޫނުގެ މައުޟޫޢު ލިޔުއްވާ...',
    buttonText: 'އައުޓްލައިން ހަދާ',
    icon: <ThalhafilaiIcon />,
    category: 'creation'
  },
  {
    id: Feature.DRAFT_LETTER,
    label: 'ސިޓީ',
    description: 'ރަސްމީ އަދި ނުރަސްމީ ސިޓީ، އެކަށީގެންވާ ފޯމެޓުގައި ލިޔުމަށް.',
    placeholder: 'ސިޓީގެ މައިގަނޑު ނުކުތާތައް...',
    buttonText: 'ސިޓީ ލިޔޭ',
    icon: <EnvelopeIcon />,
    category: 'creation'
  },

  // Group: ފަންނީ އިސްލާހު (Professional Polish)
  {
    id: Feature.CHECK_GRAMMAR,
    label: 'އިސްލާހު',
    description: 'ލިޔުމުގައި ހުރި އިމްލާ އަދި ގަވާއިދު ކުށްތައް ބަލާލުމަށް.',
    placeholder: 'ޗެކް ކުރަން ބޭނުންވާ ލިޔުން މިތަނަށް ޕޭސްޓް ކޮށްލައްވާ...',
    buttonText: 'ކުށް ބަލާލާ',
    icon: <KasabuIcon />,
    category: 'polish'
  },
  {
    id: Feature.IMPROVE_SENTENCE,
    label: 'އޮމާން',
    description: 'ޖުމުލަތައް އޮމާންކޮށް، ކިޔަން ފަސޭހަވާނޭހެން ބަދަލުކުރުމަށް.',
    placeholder: 'ރީތިކުރަން ބޭނުންވާ ޖުމުލަ ނުވަތަ ޕެރަގްރާފް ލިޔުއްވާ...',
    buttonText: 'އޮމާންކޮށްލާ',
    icon: <LiyelaaIcon />,
    category: 'polish'
  },
  {
    id: Feature.PARAPHRASE,
    label: 'ފައްތަރު',
    description: 'ލިޔުމުގެ މާނަ ނުގެއްލޭހެން އިބާރާތްތައް ރީތިކުރުމަށް.',
    placeholder: 'އަލުން ލިޔަން ބޭނުންވާ ލިޔުން މިތަނަށް ޕޭސްޓް ކޮށްލައްވާ...',
    buttonText: 'އަލުން ލިޔޭ',
    icon: <HirigaaIcon />,
    category: 'polish'
  },
  {
    id: Feature.SUMMARIZE,
    label: 'ޚުލާސާ',
    description: 'ދިގު ލިޔުންތަކުގެ މުހިންމު ބައިތައް ކުރުކޮށްލުމަށް.',
    placeholder: 'ޚުލާސާ ކުރަން ބޭނުންވާ ލިޔުން މިތަނަށް ޕޭސްޓް ކޮށްލައްވާ...',
    buttonText: 'ޚުލާސާކުރޭ',
    icon: <DocumentTextIcon />,
    category: 'polish'
  },

  // Group: ބަހަވީ އާލާތް (Linguistic Tools)
  {
    id: Feature.SPEECH_TO_TEXT,
    label: 'އަޑު',
    description: 'ވާހަކަ ނުވަތަ ވީޑިއޯއިން ދިވެހި ލިޔުންތައް ތައްޔާރުކުރުމަށް.',
    placeholder: 'އަޑު ރެކޯޑު ކުރެއްވުމަށް ނުވަތަ ފައިލް އަޕްލޯޑް ކުރެއްވުމަށް ތިރީގައިވާ ބަޓަނަށް ފިއްތަވާލައްވާ.',
    buttonText: 'ޓްރާންސްކްރައިބް',
    icon: <SanguIcon />,
    category: 'tools'
  },
  {
    id: Feature.OCR,
    label: 'ލިޔުން ނެގުން',
    description: 'ފޮޓޯ ނުވަތަ ޕީޑީއެފް ފައިލްގައިވާ ދިވެހި ލިޔުންތައް ޓެކްސްޓަށް ބަދަލުކުރުމަށް.',
    placeholder: 'ފައިލް އަޕްލޯޑް ކުރެއްވުމަށް ތިރީގައިވާ ބަޓަނަށް ފިއްތަވާލައްވާ.',
    buttonText: 'ލިޔުން ނަގާ',
    icon: <EyeIcon />,
    category: 'tools'
  },
  {
    id: Feature.PDF_TO_WORD,
    label: 'ޕީޑީއެފް ޓު ވޯޑް',
    description: 'ދިވެހި ޕީޑީއެފް ފައިލްތައް އެޑިޓްކުރެވޭ ވޯޑް ޑޮކިއުމަންޓަށް ބަދަލުކުރުމަށް.',
    placeholder: 'ފައިލް އަޕްލޯޑް ކުރެއްވުމަށް ތިރީގައިވާ ބަޓަނަށް ފިއްތަވާލައްވާ.',
    buttonText: 'ވޯޑަށް ބަދަލުކުރޭ',
    icon: <WordFileIcon />,
    category: 'tools'
  },
  {
    id: Feature.TRANSLATE,
    label: 'ތަރުޖަމާ',
    description: 'ދިވެހި އަދި އިނގިރޭސި ބަހުން ތަރުޖަމާކުރުމަށް.',
    placeholder: 'ތަރުޖަމާ ކުރަން ބޭނުންވާ ލިޔުން މިތަނަށް ޕޭސްޓް ކޮށްލައްވާ...',
    buttonText: 'ތަރުޖަމާކުރޭ',
    icon: <DhoaniIcon />,
    category: 'tools'
  },
  {
    id: Feature.FIND_DEFINITION,
    label: 'މާނަ',
    description: 'ބަސްފޮތުން ލަފުޒުތަކުގެ މާނަ އާއި ބޭނުން ހޯދުމަށް.',
    placeholder: 'މާނަ ބަލަން ބޭނުންވާ ލަފުޒު ލިޔުއްވާ...',
    buttonText: 'މާނަ ބަލާ',
    icon: <BookOpenIcon />,
    category: 'tools'
  },
];
