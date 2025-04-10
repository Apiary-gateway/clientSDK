import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import axios, { AxiosInstance } from "axios";
import GatewayClient from "../src/client";
import { InternalMessage, RoutingConfig } from "../src/types";

vi.mock('axios');
const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
} as unknown as AxiosInstance;

const userMessage: InternalMessage[] = [{role: 'user', content: 'This is a test'}];

describe('GatewayClient', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  describe('constructor', () => {
    it('correctly initializes the httpRequest property', async () => {
      const config = {
        baseUrl: 'https://test.com',
        apiKey: 'test-api-key',
        userId: 'test-user-id'
      };

      vi.mocked(axios.create).mockReturnValue(mockAxiosInstance);

      const gateway = new GatewayClient(config);

      expect (axios.create).toHaveBeenCalledWith({
        baseURL: config.baseUrl,
        headers: {
          'x-api-key': config.apiKey
        }
      })

      expect(gateway.httpRequest).toBe(mockAxiosInstance);
      // test behavior if `httpRequest` is private
      // vi.mocked(mockAxiosInstance.post).mockResolvedValue({data: 'test'});
      // await gateway.chatCompletion(userMessage);
      // expect(mockAxiosInstance.post).toHaveBeenCalled();
    });

    it('correctly initializes the `userId` property if an ID is provided', () => {
      const config = {
        baseUrl: 'https://test.com',
        apiKey: 'test-api-key',
        userId: 'test-user-id',
      };

      const gateway = new GatewayClient(config);

      expect(gateway.userId).toBe('test-user-id');
    });

    it('initializes the `userId` property as undefined if no ID is provided', () => {
      const config = {
        baseUrl: 'https://test.com',
        apiKey: 'test-api-key',
      };

      const gateway = new GatewayClient(config);

      expect(gateway.userId).toBeUndefined;
    });
  });
});
