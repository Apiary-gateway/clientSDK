import { MODELS } from "./constants";

export type SupportedLLMs = keyof typeof MODELS;
export type ModelForProvider<T extends SupportedLLMs> = typeof MODELS[T][number];
export type AllModels = typeof MODELS[SupportedLLMs][number];

export type ProviderModel = {
    [K in SupportedLLMs]: { provider: K, model: ModelForProvider<K> }
}[SupportedLLMs];
// typing an object where K is one of the providers, the value is an object where provider is that provider,
// model is the union of the corresponding models for that provider
// then [SupportedLLMs] indicates that it's just one of those object entries (type is the union of them)

export type RequestMetadata = {
    userType?: string;
    region?: string;
};

export type ParsedRequestData = {
    threadID: string;
    prompt: string;
    provider?: SupportedLLMs;
    model?: ModelForProvider<SupportedLLMs>;
    userId?: string;
}