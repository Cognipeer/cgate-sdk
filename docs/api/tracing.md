# Tracing API

The Tracing API provides built-in observability for agent executions, allowing you to monitor, debug, and analyze your AI workflows.

## Methods

### `tracing.createTrace(params)`

Create a new trace for tracking an agent execution.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `params.name` | `string` | Yes | Name of the trace/execution |
| `params.metadata` | `Record<string, any>` | No | Custom metadata |
| `params.tags` | `string[]` | No | Tags for categorization |

**Returns:** `Promise<Trace>`

**Example:**

```typescript
const trace = await client.tracing.createTrace({
  name: 'Customer Support Agent',
  metadata: { userId: 'user_123' },
  tags: ['support', 'production'],
});

console.log('Trace ID:', trace.id);
```

### `tracing.addEvent(traceId, event)`

Add an event to an existing trace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `traceId` | `string` | Yes | The trace ID |
| `event.type` | `'llm' \| 'tool' \| 'agent' \| 'custom'` | Yes | Event type |
| `event.name` | `string` | Yes | Event name |
| `event.input` | `any` | No | Input data |
| `event.output` | `any` | No | Output data |
| `event.metadata` | `Record<string, any>` | No | Event metadata |
| `event.timestamp` | `number` | No | Event timestamp (default: now) |

**Returns:** `Promise<TraceEvent>`

**Example:**

```typescript
// Log LLM call
await client.tracing.addEvent(trace.id, {
  type: 'llm',
  name: 'gpt-4-completion',
  input: { prompt: 'Hello' },
  output: { response: 'Hi there!' },
  metadata: { tokens: 15, duration: 234 },
});

// Log tool usage
await client.tracing.addEvent(trace.id, {
  type: 'tool',
  name: 'search_database',
  input: { query: 'user orders' },
  output: { results: [...] },
});
```

### `tracing.endTrace(traceId, params?)`

Mark a trace as completed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `traceId` | `string` | Yes | The trace ID |
| `params.status` | `'success' \| 'error'` | No | Final status |
| `params.output` | `any` | No | Final output |
| `params.error` | `string` | No | Error message if failed |

**Returns:** `Promise<Trace>`

**Example:**

```typescript
await client.tracing.endTrace(trace.id, {
  status: 'success',
  output: { answer: 'Your order has been shipped.' },
});
```

### `tracing.getTrace(traceId)`

Retrieve a trace with all its events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `traceId` | `string` | Yes | The trace ID |

**Returns:** `Promise<TraceWithEvents>`

**Example:**

```typescript
const trace = await client.tracing.getTrace(trace.id);

console.log('Duration:', trace.duration_ms);
console.log('Events:', trace.events.length);
```

### `tracing.listTraces(params?)`

List all traces with optional filtering.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `params.limit` | `number` | No | Maximum traces to return |
| `params.status` | `'running' \| 'completed' \| 'error'` | No | Filter by status |
| `params.tags` | `string[]` | No | Filter by tags |
| `params.startDate` | `Date` | No | Filter traces after date |
| `params.endDate` | `Date` | No | Filter traces before date |

**Returns:** `Promise<TraceList>`

**Example:**

```typescript
const traces = await client.tracing.listTraces({
  limit: 50,
  status: 'completed',
  tags: ['production'],
});

traces.data.forEach(trace => {
  console.log(`${trace.name}: ${trace.duration_ms}ms`);
});
```

## Response Types

### `Trace`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique trace identifier |
| `name` | `string` | Trace name |
| `status` | `'running' \| 'completed' \| 'error'` | Current status |
| `created_at` | `number` | Unix timestamp |
| `ended_at` | `number \| null` | Completion timestamp |
| `duration_ms` | `number \| null` | Duration in milliseconds |
| `metadata` | `Record<string, any>` | Custom metadata |
| `tags` | `string[]` | Tags |

### `TraceEvent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Event identifier |
| `trace_id` | `string` | Parent trace ID |
| `type` | `string` | Event type |
| `name` | `string` | Event name |
| `timestamp` | `number` | Unix timestamp |
| `input` | `any` | Input data |
| `output` | `any` | Output data |
| `metadata` | `Record<string, any>` | Event metadata |

### `TraceWithEvents`

Extends `Trace` with:

| Field | Type | Description |
|-------|------|-------------|
| `events` | `TraceEvent[]` | All events in chronological order |

## Complete Agent Example

```typescript
// Create trace for agent execution
const trace = await client.tracing.createTrace({
  name: 'Research Agent',
  metadata: { query: 'AI trends 2025' },
  tags: ['research', 'ai'],
});

try {
  // Step 1: Search
  await client.tracing.addEvent(trace.id, {
    type: 'tool',
    name: 'web_search',
    input: { query: 'AI trends 2025' },
    output: { results: [...] },
  });

  // Step 2: LLM Analysis
  const analysis = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Analyze these results...' }],
  });

  await client.tracing.addEvent(trace.id, {
    type: 'llm',
    name: 'analyze_results',
    input: { results: [...] },
    output: { analysis: analysis.choices[0].message.content },
  });

  // Step 3: Generate report
  await client.tracing.addEvent(trace.id, {
    type: 'agent',
    name: 'generate_report',
    output: { report: '...' },
  });

  // Mark as complete
  await client.tracing.endTrace(trace.id, {
    status: 'success',
    output: { report: '...' },
  });
} catch (error) {
  // Mark as failed
  await client.tracing.endTrace(trace.id, {
    status: 'error',
    error: error.message,
  });
}
```

## Integration with Chat API

```typescript
const trace = await client.tracing.createTrace({
  name: 'Chat Conversation',
});

const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }],
  // Pass trace ID to automatically log
  trace_id: trace.id,
});

// Events are automatically logged
await client.tracing.endTrace(trace.id, {
  status: 'success',
});
```

## Analyzing Traces

```typescript
// Get detailed trace
const trace = await client.tracing.getTrace(traceId);

// Calculate total LLM time
const llmTime = trace.events
  .filter(e => e.type === 'llm')
  .reduce((sum, e) => sum + (e.metadata?.duration || 0), 0);

console.log(`LLM time: ${llmTime}ms`);

// Count tool calls
const toolCalls = trace.events.filter(e => e.type === 'tool').length;
console.log(`Tool calls: ${toolCalls}`);

// View event timeline
trace.events.forEach(event => {
  console.log(`[${event.timestamp}] ${event.type}: ${event.name}`);
});
```

## Best Practices

1. **Meaningful Names**: Use descriptive trace and event names
2. **Metadata**: Include relevant context in metadata fields
3. **Tags**: Use tags for filtering and categorization
4. **Error Handling**: Always mark failed traces with error status
5. **Cleanup**: Archive or delete old traces periodically
6. **Privacy**: Avoid logging sensitive user data

## Use Cases

- **Debugging**: Track agent decision-making process
- **Performance**: Identify bottlenecks in LLM calls
- **Monitoring**: Track success rates and errors
- **Analytics**: Analyze patterns in agent behavior
- **Auditing**: Maintain logs for compliance

## Related

- [Chat API](/api/chat) - Integrate tracing with chat
- [Agent Tracing Example](/examples/tracing) - Complete example
- [RAG Example](/examples/rag) - Tracing in RAG systems
