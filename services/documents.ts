import { api } from './api';
import { Document } from '../types';
import { CONFIG } from '../config';

export const documentService = {
  getStats: async () => {
    if (CONFIG.IS_DEMO) {
      return {
        totalDocs: "1,284",
        questionsAnswered: "452",
        aiAccuracy: "94.2%",
        activeUsers: "128"
      };
    }
    return api.get<any>('/stats/dashboard');
  },

  getRecent: async (): Promise<Document[]> => {
    if (CONFIG.IS_DEMO) {
      return [
        { id: '1', title: 'Q3 Financial Strategy.pdf', type: 'PDF', date: '2h ago', author: 'Finance', tag: 'Finance', tagColor: 'blue', thumbnail: 'https://picsum.photos/id/1/400/250' },
        { id: '2', title: 'Engineering Architecture Wiki', type: 'DOCX', date: '5h ago', author: 'Engineering', tag: 'Engineering', tagColor: 'purple', thumbnail: 'https://picsum.photos/id/2/400/250' },
        { id: '3', title: 'Project Alpha Specs', type: 'LINK', date: '1d ago', author: 'Product', tag: 'Product', tagColor: 'orange', thumbnail: 'https://picsum.photos/id/3/400/250' },
      ];
    }
    return api.get<Document[]>('/documents/recent');
  },

  getAll: async (): Promise<Document[]> => {
    if (CONFIG.IS_DEMO) {
        // Return larger mock list
        return [
            { id: '1', title: 'Q3 Financial Strategy Report', type: 'PDF', date: '2h ago', author: 'Sarah Jenkins', tag: 'Finance', tagColor: 'blue', thumbnail: 'https://picsum.photos/id/10/400/250' },
            { id: '2', title: 'API Integration Documentation', type: 'LINK', date: 'Syncing...', author: 'System', tag: 'Technical', tagColor: 'purple', thumbnail: 'https://picsum.photos/id/20/400/250' },
            // ... more items
        ];
    }
    return api.get<Document[]>('/documents');
  },

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/documents/upload', formData);
  }
};