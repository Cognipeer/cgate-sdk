---
layout: home

hero:
  name: CG SDK
  text: CognipeerAI Gateway SDK
  tagline: Official TypeScript/JavaScript SDK for AI services
  image:
    src: /cgate-sdk/logo.svg
    alt: CG SDK
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Cognipeer/cgate-sdk

features:
  - icon: 🤖
    title: Chat Completions
    details: OpenAI-compatible chat API with full streaming support. Build conversational AI applications with ease.
  - icon: 📊
    title: Embeddings
    details: Convert text into vector representations for semantic search and similarity matching.
  - icon: 🗄️
    title: Vector Operations
    details: Manage vector databases (Pinecone, Chroma, Qdrant) with a unified API.
  - icon: 📁
    title: File Management
    details: Upload files with automatic markdown conversion for document processing.
  - icon: 🔍
    title: Agent Tracing
    details: Built-in observability for agent executions and debugging.
  - icon: 🔒
    title: Type Safe
    details: Full TypeScript support with comprehensive type definitions.
  - icon: ⚡
    title: Modern & Fast
    details: ESM and CommonJS support. Works in Node.js and browsers.
  - icon: 🛠️
    title: Developer Friendly
    details: Intuitive API design with excellent documentation and examples.
---

## Quick Start

::: code-group

```bash [npm]
npm install @cognipeer/cgate-sdk
```

```bash [yarn]
yarn add @cognipeer/cgate-sdk
```

```bash [pnpm]
pnpm add @cognipeer/cgate-sdk
```

:::

## Basic Usage

```typescript
import { CGateClient } from '@cognipeer/cgate-sdk';

const client = new CGateClient({
  apiKey: 'your-api-key',
});

// Chat completion
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello!' },
  ],
});

console.log(response.choices[0].message.content);

// Streaming
const stream = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Tell me a story' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

## Why CG SDK?

- **OpenAI Compatible**: Drop-in replacement for OpenAI SDK with extended features
- **Multi-Provider**: Support for multiple LLM and vector database providers
- **Enterprise Ready**: Built for multi-tenant SaaS with complete data isolation
- **Production Tested**: Used in production by CognipeerAI customers
- **Active Development**: Regular updates and new features

## Learn More

::: tip 📖 Documentation
Check out the [Getting Started Guide](/cgate-sdk/guide/getting-started) to learn more.
:::

::: info 💡 Examples
Explore our [Examples](/cgate-sdk/examples/) for common use cases and patterns.
:::

::: warning 🆘 Support
Need help? [Open an issue](https://github.com/Cognipeer/cgate-sdk/issues) on GitHub.
:::
