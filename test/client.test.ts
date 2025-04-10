import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import axios, { AxiosInstance } from "axios";
import GatewayClient from "../src/client";

vi.mock('axios');
const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
} as unknown as AxiosInstance;

const configWithUserId = {
  baseUrl: 'https://test.com',
  apiKey: 'test-api-key',
  userId: 'test-user-id'
};

const configWithoutUserId = {
  baseUrl: 'https://test.com',
  apiKey: 'test-api-key',
};

describe('GatewayClient', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  describe('constructor', () => {
    it('correctly initializes the httpRequest property', async () => {
      vi.mocked(axios.create).mockReturnValue(mockAxiosInstance);

      const gateway = new GatewayClient(configWithUserId);

      expect (axios.create).toHaveBeenCalledWith({
        baseURL: configWithUserId.baseUrl,
        headers: {
          'x-api-key': configWithUserId.apiKey
        }
      })

      expect(gateway.httpRequest).toBe(mockAxiosInstance);
    });

    it('correctly initializes the `userId` property if an ID is provided', () => {
      const gateway = new GatewayClient(configWithUserId);

      expect(gateway.userId).toBe('test-user-id');
    });

    it('initializes the `userId` property as undefined if no ID is provided', () => {
      const gateway = new GatewayClient(configWithoutUserId);

      expect(gateway.userId).toBeUndefined;
    });
  });

  describe('chatCompletion', () => {
    it('makes a POST request with the correct arguments', async () => {
      vi.mocked(axios.create).mockReturnValue(mockAxiosInstance);

      const gateway = new GatewayClient(configWithUserId);

      vi.mocked(gateway.httpRequest.post).mockResolvedValue({ data: {} });
      await gateway.chatCompletion(
        'This is a test',
        '1744301407905',
        'openai',
        'gpt-4o-mini'
      );

      expect(gateway.httpRequest.post).toHaveBeenCalledWith(gateway.chatCompletionPath, {
        prompt: 'This is a test',
        threadID: '1744301407905',
        provider: 'openai',
        model: 'gpt-4o-mini',
        userId: 'test-user-id',
      });
    });
  });
});
