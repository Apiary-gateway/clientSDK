import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import axios, { AxiosInstance } from "axios";
import GatewayClient from "../src/client";
import { InternalMessage, RoutingConfig } from "../src/types";

vi.mock('axios');
const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
} as unknown as AxiosInstance;

const routingConfig: RoutingConfig = {
  defaultModel: { provider: 'openai', model: 'gpt-3.5-turbo'},
  fallbackModel: { provider: 'anthropic', model: 'claude-3-5-haiku-20241022' },
};

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
        routingConfig,
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

      vi.mocked(mockAxiosInstance.post).mockResolvedValue({data: 'test'});
      
      await gateway.chatCompletion(userMessage);

      expect(mockAxiosInstance.post).toHaveBeenCalled();
    });
  })
});
