# Client Configuration

Learn how to configure the CG SDK client for different environments and use cases.

## Basic Configuration

```typescript
import { CGateClient } from '@cognipeer/cgate-sdk';

const client = new CGateClient({
  apiKey: 'your-api-key',
});
```

## Configuration Options

### API Key (Required)

Your CognipeerAI Gateway API token:

```typescript
const client = new CGateClient({
  apiKey: process.env.CGATE_API_KEY!,
});
```

::: tip Security Best Practice
Always use environment variables for API keys. Never commit API keys to version control.
:::

### Base URL (Optional)

Override the default API endpoint:

```typescript
const client = new CGateClient({
  apiKey: 'your-api-key',
  baseURL: 'https://custom.api.example.com',
});
```

**Default**: `https://api.cognipeer.ai/api/client/v1`

### Timeout (Optional)

Request timeout in milliseconds:

```typescript
const client = new CGateClient({
  apiKey: 'your-api-key',
  timeout: 30000, // 30 seconds
});
```

**Default**: `60000` (60 seconds)

### Max Retries (Optional)

Maximum number of retry attempts for failed requests:

```typescript
const client = new CGateClient({
  apiKey: 'your-api-key',
  maxRetries: 5,
});
```

**Default**: `3`

### Custom Fetch (Optional)

Provide a custom fetch implementation:

```typescript
import fetch from 'node-fetch';

const client = new CGateClient({
  apiKey: 'your-api-key',
  fetch: fetch as any,
});
```

## Environment-Specific Configurations

### Development

```typescript
const client = new CGateClient({
  apiKey: process.env.DEV_API_KEY!,
  baseURL: 'http://localhost:3000/api/client/v1',
  timeout: 120000, // Longer timeout for debugging
});
```

### Production

```typescript
const client = new CGateClient({
  apiKey: process.env.PROD_API_KEY!,
  baseURL: 'https://api.cognipeer.ai/api/client/v1',
  timeout: 60000,
  maxRetries: 3,
});
```

### Testing

```typescript
const client = new CGateClient({
  apiKey: 'test-api-key',
  baseURL: 'http://localhost:3000/api/client/v1',
  maxRetries: 0, // No retries in tests
});
```

## Configuration Patterns

### Singleton Pattern

Create a single client instance for your application:

```typescript
// config/client.ts
let clientInstance: CGateClient | null = null;

export function getClient(): CGateClient {
  if (!clientInstance) {
    clientInstance = new CGateClient({
      apiKey: process.env.CGATE_API_KEY!,
    });
  }
  return clientInstance;
}

// usage.ts
import { getClient } from './config/client';

const client = getClient();
```

### Factory Pattern

Create clients dynamically:

```typescript
function createClient(options: {
  environment: 'development' | 'production';
  apiKey: string;
}): CGateClient {
  const baseURLs = {
    development: 'http://localhost:3000/api/client/v1',
    production: 'https://api.cognipeer.ai/api/client/v1',
  };

  return new CGateClient({
    apiKey: options.apiKey,
    baseURL: baseURLs[options.environment],
  });
}

const client = createClient({
  environment: 'production',
  apiKey: process.env.CGATE_API_KEY!,
});
```

### Multi-Tenant Pattern

Manage multiple clients for different tenants:

```typescript
class ClientManager {
  private clients: Map<string, CGateClient> = new Map();

  getClient(tenantId: string, apiKey: string): CGateClient {
    if (!this.clients.has(tenantId)) {
      this.clients.set(
        tenantId,
        new CGateClient({ apiKey })
      );
    }
    return this.clients.get(tenantId)!;
  }
}

const manager = new ClientManager();
const clientA = manager.getClient('tenant-a', 'key-a');
const clientB = manager.getClient('tenant-b', 'key-b');
```

## Error Handling Configuration

Configure error handling globally:

```typescript
import { CGateAPIError } from '@cognipeer/cgate-sdk';

const client = new CGateClient({
  apiKey: process.env.CGATE_API_KEY!,
});

async function safeRequest<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof CGateAPIError) {
      console.error('API Error:', error.message);
      console.error('Status:', error.statusCode);
    }
    return null;
  }
}

// Usage
const response = await safeRequest(() =>
  client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }],
  })
);
```

## Logging Configuration

Add request/response logging:

```typescript
class LoggingClient extends CGateClient {
  async chat.completions.create(params: any) {
    console.log('[Request]', JSON.stringify(params, null, 2));
    const response = await super.chat.completions.create(params);
    console.log('[Response]', JSON.stringify(response, null, 2));
    return response;
  }
}
```

## Environment Variables

Recommended environment variables:

```bash
# .env.example
CGATE_API_KEY=your-api-key
CGATE_BASE_URL=https://api.cognipeer.ai/api/client/v1
CGATE_TIMEOUT=60000
CGATE_MAX_RETRIES=3
```

Load configuration from environment:

```typescript
const client = new CGateClient({
  apiKey: process.env.CGATE_API_KEY!,
  baseURL: process.env.CGATE_BASE_URL,
  timeout: parseInt(process.env.CGATE_TIMEOUT || '60000'),
  maxRetries: parseInt(process.env.CGATE_MAX_RETRIES || '3'),
});
```

## Best Practices

1. **Use Environment Variables**: Never hardcode API keys
2. **Singleton Pattern**: Reuse client instances
3. **Error Handling**: Always wrap requests in try/catch
4. **Timeouts**: Set appropriate timeouts for your use case
5. **Retries**: Configure retries based on your requirements
6. **Logging**: Add logging for debugging in development

## See Also

- [Authentication](/guide/authentication)
- [Error Handling](/guide/error-handling)
- [Getting Started](/guide/getting-started)
