"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apiary = void 0;
const axios_1 = __importStar(require("axios"));
/* The `Apiary` class in TypeScript provides methods for initializing an Apiary
client to interact with the Apiary LLM Gateway, and for requesting chat completions. */
class Apiary {
    constructor(config) {
        const headers = {
            'x-api-key': `${config.apiKey}`
        };
        if (config.metadata) {
            for (const field in config.metadata) {
                headers[`x-${field}`] = config.metadata[field];
            }
        }
        this.httpRequest = axios_1.default.create({
            baseURL: config.baseUrl,
            headers,
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
    async chatCompletion(prompt, threadID, provider, model) {
        try {
            const response = await this.httpRequest.post(this.chatCompletionPath, {
                prompt,
                threadID,
                provider,
                model,
                userId: this.userId,
            });
            return response.data;
        }
        catch (err) {
            if (err instanceof axios_1.AxiosError) {
                console.error('An Axios error occurred: ', err.message);
            }
            else {
                console.error('An error occurred: ', err);
            }
            throw err;
        }
    }
}
exports.Apiary = Apiary;
exports.default = Apiary;
