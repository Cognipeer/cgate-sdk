# CognipeerAI Gateway SDK

Official TypeScript/JavaScript SDK for [CognipeerAI Gateway](https://cognipeer.com) - A multi-tenant SaaS platform for AI and Agentic services.

[![npm version](https://img.shields.io/npm/v/@cognipeer/cgate-sdk)](https://www.npmjs.com/package/@cognipeer/cgate-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🤖 **Chat Completions** - OpenAI-compatible chat API with streaming support
- 📊 **Embeddings** - Text vectorization for semantic search
- 🗄️ **Vector Operations** - Manage vector databases (Pinecone, Chroma, Qdrant, etc.)
- 📁 **File Management** - Upload and manage files with markdown conversion
- 🔍 **Agent Tracing** - Observability for agent executions
- 🔒 **Type-Safe** - Full TypeScript support with comprehensive types
- ⚡ **Modern** - ESM and CommonJS support, works in Node.js and browsers

## Installation

```bash
npm install @cognipeer/cgate-sdk
```

```bash
yarn add @cognipeer/cgate-sdk
```

```bash
pnpm add @cognipeer/cgate-sdk
```

## Quick Start

```typescript
import { CGateClient } from '@cognipeer/cgate-sdk';

// Initialize the client
const client = new CGateClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.cognipeer.com', // Optional, defaults to production
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

// Streaming chat
const stream = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Tell me a story' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}

// Create embeddings
const embeddings = await client.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Hello, world!',
});

console.log(embeddings.data[0].embedding);

// Vector operations
await client.vectors.upsert('my-provider', 'my-index', {
  vectors: [
    {
      id: 'vec1',
      values: [0.1, 0.2, 0.3],
      metadata: { text: 'Hello world' },
    },
  ],
});

const results = await client.vectors.query('my-provider', 'my-index', {
  query: {
    vector: [0.1, 0.2, 0.3],
    topK: 5,
  },
});

// File upload
const file = await client.files.upload('my-bucket', {
  fileName: 'document.pdf',
  data: 'data:application/pdf;base64,JVBERi0xLjQK...',
  convertToMarkdown: true,
});
```

## Documentation

Full documentation is available at [cognipeer.github.io/cgate-sdk](https://cognipeer.github.io/cgate-sdk)

- [Getting Started](https://cognipeer.github.io/cgate-sdk/guide/getting-started)
- [Chat API](https://cognipeer.github.io/cgate-sdk/api/chat)
- [Embeddings API](https://cognipeer.github.io/cgate-sdk/api/embeddings)
- [Vector API](https://cognipeer.github.io/cgate-sdk/api/vectors)
- [Files API](https://cognipeer.github.io/cgate-sdk/api/files)
- [Tracing API](https://cognipeer.github.io/cgate-sdk/api/tracing)
- [Examples](https://cognipeer.github.io/cgate-sdk/examples/)

## API Reference

### Client Configuration

```typescript
const client = new CGateClient({
  apiKey: string;          // Required: Your API token
  baseURL?: string;        // Optional: API base URL (default: https://api.cognipeer.com)
  timeout?: number;        // Optional: Request timeout in ms (default: 60000)
  maxRetries?: number;     // Optional: Max retry attempts (default: 3)
  fetch?: typeof fetch;    // Optional: Custom fetch implementation
});
```

### Available Methods

#### Chat
- `client.chat.completions.create(params)` - Create chat completion (streaming supported)

#### Embeddings
- `client.embeddings.create(params)` - Create embeddings

#### Vectors
- `client.vectors.providers.list(query?)` - List vector providers
- `client.vectors.providers.create(data)` - Create vector provider
- `client.vectors.indexes.list(providerKey)` - List indexes
- `client.vectors.indexes.create(providerKey, data)` - Create index
- `client.vectors.indexes.get(providerKey, indexId)` - Get index details
- `client.vectors.indexes.update(providerKey, indexId, data)` - Update index
- `client.vectors.indexes.delete(providerKey, indexId)` - Delete index
- `client.vectors.upsert(providerKey, indexId, data)` - Upsert vectors
- `client.vectors.query(providerKey, indexId, query)` - Query vectors
- `client.vectors.delete(providerKey, indexId, ids)` - Delete vectors

#### Files
- `client.files.buckets.list()` - List buckets
- `client.files.buckets.get(bucketKey)` - Get bucket details
- `client.files.list(bucketKey, query?)` - List files
- `client.files.upload(bucketKey, data)` - Upload file

#### Tracing
- `client.tracing.ingest(data)` - Ingest tracing session

## Examples

Check out the [examples](./examples) directory for more detailed usage:

- [Chat with streaming](./examples/chat-streaming.ts)
- [RAG with vectors](./examples/rag-example.ts)
- [File processing](./examples/file-upload.ts)
- [Agent tracing](./examples/agent-tracing.ts)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [CognipeerAI](https://cognipeer.com)

## Support

- 📧 Email: support@cognipeer.com
- 📖 Documentation: [cognipeer.github.io/cgate-sdk](https://cognipeer.github.io/cgate-sdk)
- 🐛 Issues: [GitHub Issues](https://github.com/Cognipeer/cgate-sdk/issues)
