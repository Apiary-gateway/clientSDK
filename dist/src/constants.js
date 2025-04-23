"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FALLBACK_STATUS_CODES = exports.modelNames = exports.providerNames = exports.MODELS = exports.SYSTEM_PROMPT = void 0;
exports.SYSTEM_PROMPT = `You are a helpful assistant. You answer in cockney.`;
exports.MODELS = {
    openai: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o-mini'],
    anthropic: ['claude-3-opus-20240229', 'claude-3-5-haiku-20241022'],
    gemini: ['gemini-1.5-pro', 'gemini-2.0-flash-001'],
};
exports.providerNames = ['openai', 'anthropic', 'gemini'];
exports.modelNames = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o-mini', 'claude-3-opus-20240229', 'claude-3-5-haiku-20241022', 'gemini-1.5-pro', 'gemini-2.0-flash-001'];
exports.FALLBACK_STATUS_CODES = [500, 429, 503, 401, 403];
// status codes
// 401 is Authentication (missing API key)
// 429 is rate limiting
