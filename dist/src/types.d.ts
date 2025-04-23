import { MODELS } from "./constants";
export type SupportedLLMs = keyof typeof MODELS;
export type ModelForProvider<T extends SupportedLLMs> = typeof MODELS[T][number];
export type AllModels = typeof MODELS[SupportedLLMs][number];
export type ProviderModel = {
    [K in SupportedLLMs]: {
        provider: K;
        model: ModelForProvider<K>;
    };
}[SupportedLLMs];
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
};
