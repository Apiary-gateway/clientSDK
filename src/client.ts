import axios, { AxiosError, AxiosInstance } from 'axios';
import { AllModels, SupportedLLMs } from './types';

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
   * @param {string} prompt - The `prompt` parameter is a string containing the 
   * user prompt.
   * @param {string} threadID - The `threadID` parameter is a string identifying
   * the conversation thread. It is optional. If `threadID` is passed, then the 
   * Gateway will associate the given user prompt with the LLM conversation referenced
   * by `threadID`.  
   * @param {SupportedLLMs} provider - The `provider` parameter is a string indicating
   * the LLM provider you'd like to use (ex. 'openai', 'anthropic'). It is optional.
   * This information may also be provided in your routing config file.
   * @param {AllModels} model - The `model` parameter is a string indicating the 
   * LLM you'd like to use (ex. 'gpt-4o-mini'). It is optional. This information
   * may also be provided in your routing config file.
   * @returns A Promise that either resolves to an object containing the returned response
   * text (either from an LLM call or a cache hit), token usage, LLM provider and 
   * model used, and potentially other metadata, or rejects with an error message.
   * The response object has the shape: {
   *  threadID: string,
   *  response: {
   *    text: string,
   *    usage: {
          prompt_tokens: number,
          completion_tokens: number,
          total_tokens: number,
          prompt_tokens_details: {
            cached_tokens: number,
            audio_tokens: number
          },
          completion_tokens_details: {
            reasoning_tokens: number,
            audio_tokens: number,
            accepted_prediction_tokens: number,
            rejected_prediction_tokens: number
          }
        }
   *    provider: string,
   *    model: string,
   *    log:
   *  }
   * }
   */

  async chatCompletion(
    prompt: string,
    threadID?: string,
    provider?: SupportedLLMs,
    model?: AllModels,
  ) {
    try {
      const response = await this.httpRequest.post(this.chatCompletionPath, {
        prompt,
        threadID,
        provider,
        model,
        userId: this.userId,
      });

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('An Axios error occurred: ', err.message);
      } else {
        console.error('An error occurred: ', err);
      }
      throw err;
    }
  }
}

export default GatewayClient;