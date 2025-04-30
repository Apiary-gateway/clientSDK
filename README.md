# Apiary SDK

Apiary is an open-source LLM Gateway for managing requests across leading providers. It routes all LLM requests through a single API endpoint, simplifying access to multiple models with a unified API, centralized management of features like routing, caching, and guardrails, and built-in observability.

Use the Apiary TypeScript SDK in your applications to easily send client requests to multiple LLM providers.

## Supported Providers

* Anthropic
* Gemini
* OpenAI

## Setup

### Prerequisites
To send LLM requests using the Apiary SDK, you must have a running Apiary instance set up
in your AWS account. Follow the setup instructions in our [installation guide](https://github.com/Apiary-gateway/cli) to easily deploy Apiary's infrastructure using our CLI tool.

The deployment process will provide an `AiGatewayRestApiEndpoint` URL and API key that you can use
to send LLM requests with the Apiary SDK.

### Installation

To install the Apiary SDK, run the following command:
```bash
npm install @apiary-gateway/sdk
```

### Usage

Import the Apiary client and initialize an instance with your configuration details. 

Call the `chatCompletion` method with a prompt (required). 
A `threadID` may also be provided to include conversation context with the prompt. 
Optionally, specify the LLM provider and model to override your configuration details for these fields. 

```ts
import Apiary from '@apiary-gateway/sdk';

// Initialize the Apiary client
const client = new Apiary({
  apiKey: '<YOUR_API_KEY>',
  baseUrl: 'https://<YOUR_GATEWAY_URL>.com',
  // Optionally include a userId to partition cache responses based on userId
  userId: '<userId>',
  // Optionally include a metadata object with your custom routing configuration groups
  metadata: {
    user-type: 'pro-users'
  },
});

const main = async () => {
  const completion = await client.chatCompletion(
    // Example prompt
    'Do all bees make honey?',
    // Optionally include a `threadID` to manage conversation context 
    '1745267450008',
    // Optionally specify the provider and model to override your configuration defaults
    'openai',
    'gpt-4',
  );

  // Log the returned LLM response
  console.log(completion.response.text);

  // Log the threadID for the returned LLM response
  console.log(completion.threadID);
}

main();
```
