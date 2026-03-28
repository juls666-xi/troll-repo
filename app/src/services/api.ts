import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

export interface CreateMessageRequest {
  text: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const messageApi = {
  // Get all messages sorted by newest first
  getMessages: async (): Promise<Message[]> => {
    const response = await api.get<Message[]>('/messages');
    return response.data;
  },

  // Create a new message
  createMessage: async (data: CreateMessageRequest): Promise<Message> => {
    const response = await api.post<Message>('/messages', data);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
