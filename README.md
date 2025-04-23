# Apiary LLM Gateway

Open-source platform for routing, observing, and managing requests to one or more LLMs.
All with a simple, unified interface.

## Supported Providers

* Anthropic
* Gemini
* OpenAI

## Setup

### Installation

```bash
npm install apiary-sdk
```

### Usage

Import the Apiary client and initialize an instance with your configuration details. 
Call the `chatCompletion` method with a prompt (required). Optionally, specify the 
model and LLM provider using their respective fields. `threadID` may also be provided 
for conversation context.

```ts
import { Apiary } from 'apiary-sdk';

// Initialize the Apiary client with configuration
const client = new Apiary({
  apiKey: <YOUR_API_KEY>,
  baseUrl: <YOUR_GATEWAY_URL>,
  // optionally include a userId to partition cache responses based on userId
  userId: <userId>,
  // optionally include a metadata object with your custom routing configuration groups
  metadata: {
    user-type: 'pro-users'
  },
});

const completion = await client.chatCompletion({
  prompt: 'Example user prompt',
  // optionally include a `threadID` to manage conversation context 
  threadID: '1745267450008',
  // optionally specify the provider and model to override your configuration defaults
  provider: 'openai',
  model: 'gpt-4o',
});

// Log the returned LLM response
console.log(completion.response.text);

// Access the threadID for the returned LLM response
const threadID = completion.threadID;
```
