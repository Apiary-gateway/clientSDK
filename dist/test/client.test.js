"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const axios_1 = __importDefault(require("axios"));
const client_1 = __importDefault(require("../src/client"));
vitest_1.vi.mock('axios');
const mockAxiosInstance = {
    get: vitest_1.vi.fn(),
    post: vitest_1.vi.fn(),
};
const configWithUserId = {
    baseUrl: 'https://test.com',
    apiKey: 'test-api-key',
    userId: 'test-user-id'
};
const configWithoutUserId = {
    baseUrl: 'https://test.com',
    apiKey: 'test-api-key',
};
(0, vitest_1.describe)('Apiary', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.resetAllMocks();
    });
    (0, vitest_1.describe)('constructor', () => {
        (0, vitest_1.it)('correctly initializes the httpRequest property', async () => {
            vitest_1.vi.mocked(axios_1.default.create).mockReturnValue(mockAxiosInstance);
            const client = new client_1.default(configWithUserId);
            (0, vitest_1.expect)(axios_1.default.create).toHaveBeenCalledWith({
                baseURL: configWithUserId.baseUrl,
                headers: {
                    'x-api-key': configWithUserId.apiKey
                }
            });
            (0, vitest_1.expect)(client.httpRequest).toBe(mockAxiosInstance);
        });
        (0, vitest_1.it)('correctly initializes the `userId` property if an ID is provided', () => {
            const client = new client_1.default(configWithUserId);
            (0, vitest_1.expect)(client.userId).toBe('test-user-id');
        });
        (0, vitest_1.it)('initializes the `userId` property as undefined if no ID is provided', () => {
            const client = new client_1.default(configWithoutUserId);
            (0, vitest_1.expect)(client.userId).toBeUndefined;
        });
    });
    (0, vitest_1.describe)('chatCompletion', () => {
        (0, vitest_1.it)('makes a POST request with the correct arguments', async () => {
            vitest_1.vi.mocked(axios_1.default.create).mockReturnValue(mockAxiosInstance);
            const client = new client_1.default(configWithUserId);
            vitest_1.vi.mocked(client.httpRequest.post).mockResolvedValue({ data: {} });
            await client.chatCompletion('This is a test', '1744301407905', 'openai', 'gpt-4o-mini');
            (0, vitest_1.expect)(client.httpRequest.post).toHaveBeenCalledWith(client.chatCompletionPath, {
                prompt: 'This is a test',
                threadID: '1744301407905',
                provider: 'openai',
                model: 'gpt-4o-mini',
                userId: 'test-user-id',
            });
        });
    });
});
