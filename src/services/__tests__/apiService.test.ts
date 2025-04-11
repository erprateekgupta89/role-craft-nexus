
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { api } from '../apiService';
import { supabase } from '@/integrations/supabase/client';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

// Mock fetch
const originalFetch = global.fetch;
let mockFetch: any;

beforeEach(() => {
  // Setup mock fetch before each test
  mockFetch = vi.fn();
  global.fetch = mockFetch;
});

afterEach(() => {
  // Restore original fetch after each test
  global.fetch = originalFetch;
  vi.clearAllMocks();
});

describe('API Service', () => {
  const mockToken = 'test-token';
  const mockEndpoint = '/test-endpoint';
  const mockData = { id: 1, name: 'Test' };
  const mockResponse = { ok: true, json: () => Promise.resolve(mockData) };

  beforeEach(() => {
    // Setup auth token mock for each test
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          access_token: mockToken,
        },
      },
    } as any);
    
    // Setup fetch mock response
    mockFetch.mockResolvedValue(mockResponse);
  });

  describe('get()', () => {
    it('should make a GET request with the correct headers', async () => {
      await api.get(mockEndpoint);
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(mockEndpoint),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mockToken}`,
          }),
        })
      );
    });

    it('should return the parsed JSON response', async () => {
      const result = await api.get(mockEndpoint);
      
      expect(result).toEqual(mockData);
    });

    it('should throw an error when authentication is missing', async () => {
      vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
        data: { session: null },
      } as any);
      
      await expect(api.get(mockEndpoint)).rejects.toThrow('Authentication required');
    });
  });

  // Tests for other methods can be added similarly
});
