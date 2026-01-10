import { CONFIG } from '../config';

interface ApiOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('instimem_token');
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const token = this.getToken();
    
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (response.status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        localStorage.removeItem('instimem_token');
        window.location.href = '#/login';
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || response.statusText);
      }

      return response.json();
    } catch (error) {
      console.error(`API Call Failed: ${endpoint}`, error);
      throw error;
    }
  }

  get<T>(endpoint: string, options?: ApiOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options?: ApiOptions) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    });
  }

  put<T>(endpoint: string, body: any, options?: ApiOptions) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
  }

  delete<T>(endpoint: string, options?: ApiOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient(CONFIG.API_URL);