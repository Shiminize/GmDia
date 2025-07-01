const API_URL = 'http://localhost:5001/api';

// Simple fetch wrapper
const api = {
  get: async (url: string, token?: string) => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    
    const response = await fetch(`${API_URL}${url}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  
  post: async (url: string, data: any, token?: string) => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Custom design endpoints
  customDesigns: {
    save: async (design: any, token: string) => {
      return api.post('/customizations', design, token);
    },
    
    getMyDesigns: async (token: string) => {
      return api.get('/customizations/my-designs', token);
    },
    
    getById: async (id: string, token?: string) => {
      return api.get(`/customizations/${id}`, token);
    },
    
    deleteDesign: async (id: string, token: string) => {
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      
      const response = await fetch(`${API_URL}/customizations/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.ok;
    }
  }
};

export default api;
