# Quick Start Guide

Get up and running with CG SDK in 5 minutes!

## 1. Installation

```bash
npm install @cognipeer/cgate-sdk
```

## 2. Get API Key

1. Sign up at [cognipeer.ai](https://cognipeer.ai)
2. Go to **Settings** → **API Tokens**
3. Create a new token
4. Copy your API key

## 3. Initialize Client

```typescript
import { CGateClient } from '@cognipeer/cgate-sdk';

const client = new CGateClient({
  apiKey: 'your-api-key',
});
```

## 4. Make Your First Request

```typescript
// Chat completion
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Hello, world!' }
  ],
});

console.log(response.choices[0].message.content);
```

## 5. Try Streaming

```typescript
// Streaming response
const stream = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Tell me a story' }
  ],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

## Next Steps

- [Full Documentation](https://cognipeer.github.io/cgate-sdk)
- [API Reference](/api/client)
- [Examples](/examples/)
- [Chat Guide](/api/chat)
- [Vector Search](/api/vectors)

## Common Use Cases

### RAG System

```typescript
// 1. Create embeddings
const embedding = await client.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'What is AI?',
});

// 2. Search vectors
const results = await client.vectors.query('my-provider', 'my-index', {
  query: {
    vector: embedding.data[0].embedding,
    topK: 5,
  },
});

// 3. Generate answer with context
const context = results.result.matches
  .map(m => m.metadata?.text)
  .join('\n\n');

const answer = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: `Context: ${context}`,
    },
    {
      role: 'user',
      content: 'What is AI?',
    },
  ],
});
```

### File Processing

```typescript
// Upload file
const file = await client.files.upload('my-bucket', {
  fileName: 'document.pdf',
  data: 'data:application/pdf;base64,...',
  convertToMarkdown: true,
});

console.log(file.markdownContent);
```

### Agent Tracing

```typescript
// Track agent execution
await client.tracing.ingest({
  sessionId: 'session-123',
  agent: {
    name: 'MyAgent',
    version: '1.0.0',
  },
  status: 'completed',
  events: [...],
});
```

## Environment Variables

```bash
# .env
CGATE_API_KEY=your-api-key
```

```typescript
const client = new CGateClient({
  apiKey: process.env.CGATE_API_KEY!,
});
```

## Error Handling

```typescript
import { CGateAPIError } from '@cognipeer/cgate-sdk';

try {
  const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }],
  });
} catch (error) {
  if (error instanceof CGateAPIError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.statusCode);
  }
}
```

## TypeScript Support

Full type safety out of the box:

```typescript
import type {
  ChatCompletionRequest,
  ChatCompletionResponse,
} from '@cognipeer/cgate-sdk';

const request: ChatCompletionRequest = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }],
};
```

## Need Help?

- 📖 [Documentation](https://cognipeer.github.io/cgate-sdk)
- 💬 [Discord](https://discord.gg/cognipeer)
- 🐛 [Issues](https://github.com/Cognipeer/cgate-sdk/issues)
- 📧 [Email](mailto:support@cognipeer.ai)
