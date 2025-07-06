import axios from 'axios';

// Import types from relevant files
import type { Product } from '../components/products/ProductList';
import type { User } from '../contexts/AuthContext';
import type { SavedDesign } from '../pages/Dashboard';

type NewDesign = Omit<SavedDesign, '_id' | 'createdAt'>;

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  get: async <T = any>(url: string, token?: string): Promise<T> => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await api.get<T>(url, { headers });
    return response.data;
  },

  post: async <T = any>(url: string, data: any, token?: string): Promise<T> => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await api.post<T>(url, data, { headers });
    return response.data;
  },

  put: async <T = any>(url: string, data: any, token?: string): Promise<T> => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await api.put<T>(url, data, { headers });
    return response.data;
  },

  delete: async <T = any>(url: string, token?: string): Promise<T> => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await api.delete<T>(url, { headers });
    return response.data;
  },

  products: {
    getAll: async (): Promise<Product[]> => {
      return apiService.get<Product[]>('/products');
    },

    getById: async (id: string): Promise<Product> => {
      return apiService.get<Product>(`/products/${id}`);
    },

    create: async (product: Product, token: string): Promise<Product> => {
      return apiService.post<Product>('/products', product, token);
    },

    update: async (id: string, product: Product, token: string): Promise<Product> => {
      return apiService.put<Product>(`/products/${id}`, product, token);
    },

    delete: async (id: string, token: string): Promise<void> => {
      return apiService.delete<void>(`/products/${id}`, token);
    },
  },

  customDesigns: {
    save: async (design: NewDesign, token: string): Promise<SavedDesign> => {
      return apiService.post<SavedDesign>('/customizations', design, token);
    },
    
    getMyDesigns: async (token: string): Promise<SavedDesign[]> => {
      return apiService.get<SavedDesign[]>('/customizations/my-designs', token);
    },
    
    getById: async (id: string, token?: string): Promise<SavedDesign> => {
      return apiService.get<SavedDesign>(`/customizations/${id}`, token);
    },
    
    deleteDesign: async (id: string, token: string): Promise<void> => {
      return apiService.delete<void>(`/customizations/${id}`, token);
    },
  },
};

export default apiService;
