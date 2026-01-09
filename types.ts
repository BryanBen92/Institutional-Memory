export interface NavItem {
  icon: string;
  label: string;
  path: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'LINK' | 'PNG';
  date: string;
  author: string;
  tag: string;
  tagColor: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  thumbnail?: string;
  progress?: number; // For uploads
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: string[];
}

export enum UserRole {
  ADMIN = 'Admin',
  MEMBER = 'Member',
  VIEWER = 'Viewer'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  email: string;
}