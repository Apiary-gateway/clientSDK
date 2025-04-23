import { AxiosInstance } from 'axios';
import { AllModels, SupportedLLMs } from './types';
interface ClientConfig {
    apiKey: string;
    baseUrl: string;
    userId?: string;
    metadata?: {
        [key: string]: string | number;
    };
}
export declare class Apiary {
    httpRequest: AxiosInstance;
    readonly chatCompletionPath: string;
    userId?: string;
    constructor(config: ClientConfig);
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
    chatCompletion(prompt: string, threadID?: string, provider?: SupportedLLMs, model?: AllModels): Promise<any>;
}
export default Apiary;
