import axios, { AxiosInstance } from 'axios';
import { AllModels, InternalMessage, ModelForProvider, RoutingConfig, SupportedLLMs } from './types';

interface SDKConfig {
  apiKey: string;
  baseUrl: string;
  routingConfig: RoutingConfig;
}

export class GatewayClient {
  private httpRequest: AxiosInstance;
  private chatCompletionPath: string;
  private routingConfig?: RoutingConfig;
  
  constructor(config: SDKConfig) {
    this.httpRequest = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'x-api-key': `${config.apiKey}`
      }
    });
    this.chatCompletionPath = '/route';
    this.routingConfig = config.routingConfig;
  }

  async chatCompletion(
    messages: Array<InternalMessage>,
    provider?: SupportedLLMs,
    model?: AllModels,
  ) {
    try {
      const lastUserMessage = messages.findLast(message => message.role === 'user');
      // if (!lastUserMessage) {
      //   // do we want custom error classes, to present a unified error handling interface?
      //   throw new Error;
      // }
    
      const response = await this.httpRequest.post(this.chatCompletionPath, {
        prompt: lastUserMessage?.content,
        provider,
        model,
      });

      return response.data;
    } catch {

    }
  }
}
