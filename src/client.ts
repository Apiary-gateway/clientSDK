import axios, { AxiosError, AxiosInstance } from 'axios';
import { AllModels, InternalMessage, ModelForProvider, RoutingConfig, SupportedLLMs } from './types';

class GatewayError extends Error {}

interface ClientConfig {
  apiKey: string;
  baseUrl: string;
  userId?: string;
}

/* The `GatewayClient` class in TypeScript provides methods for initializing a 
client to interact with the LLM Gateway, and for requesting chat completions. */

export class GatewayClient {
  httpRequest: AxiosInstance;
  readonly chatCompletionPath: string;
  userId?: string;
  
  constructor(config: ClientConfig) {
    this.httpRequest = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'x-api-key': `${config.apiKey}`
      }
    });
    this.chatCompletionPath = '/route';
    this.userId = config.userId;
  }

  /**
   * The method `chatCompletion` sends a request to the LLM Gateway for a chat completion
   * based on the provided configuration details.
   * @param {InternalMessage[]} messages - The `messages` parameter is an array of messages 
   * that may contain a 'system' prompt as well as messages from the 'user' and the 'assistant' roles.
   * @param {SupportedLLMs} provider - The `provider` parameter is a string indicating
   * the LLM provider you'd like to use (ex. 'openai', 'anthropic'). It is optional.
   * This information may also be provided in your routing config file.
   * @param {AllModels} model - The `model` parameter is a string indicating the 
   * LLM you'd like to use (ex. 'gpt-4o-mini'). It is optional. This information
   * may also be provided in your routing config file.
   * @returns A Promise that either resolves to an object containing the returned response
   * text (either from an LLM call or a cache hit), token usage, LLM provider and 
   * model used, and potentially other metadata, or rejects with an error message.
   */

  async chatCompletion(
    messages: Array<InternalMessage>,
    provider?: SupportedLLMs,
    model?: AllModels,
  ) {
    try {
      const lastUserMessage = messages.findLast(message => message.role === 'user');
      if (!lastUserMessage) {
        throw new GatewayError("User message is required.");
      }
    
      const response = await this.httpRequest.post(this.chatCompletionPath, {
        prompt: lastUserMessage?.content,
        provider,
        model,
        userId: this.userId,
      });

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('An Axios error occurred: ', err.message);
      } else if (err instanceof GatewayError) {
        console.error('An error occurred with your Gateway setup: ', err.message);
      } else {
        console.error('An error occurred: ', err);
      }
    }
  }
}

export default GatewayClient;