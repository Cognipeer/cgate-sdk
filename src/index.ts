/**
 * @cognipeer/cgate-sdk
 * 
 * Official TypeScript SDK for CognipeerAI Gateway
 * 
 * @packageDocumentation
 */

// Main client
export { CGateClient } from './client';

// Types
export * from './types';

// Errors
export { CGateError, CGateAPIError } from './types';

// Re-export for convenience
export type {
  // Configuration
  CGateClientOptions,
  
  // Chat
  ChatMessage,
  ChatCompletionRequest,
  ChatCompletionResponse,
  ChatCompletionChunk,
  Tool,
  ToolCall,
  
  // Embeddings
  EmbeddingRequest,
  EmbeddingResponse,
  Embedding,
  
  // Vectors
  VectorProvider,
  CreateVectorProviderRequest,
  VectorIndex,
  CreateVectorIndexRequest,
  UpdateVectorIndexRequest,
  Vector,
  UpsertVectorsRequest,
  QueryVectorsRequest,
  QueryVectorsResponse,
  VectorMatch,
  
  // Files
  FileBucket,
  FileObject,
  UploadFileRequest,
  ListFilesQuery,
  
  // Tracing
  TracingSessionRequest,
  TracingAgent,
  TracingSummary,
  TracingEvent,
  
  // Common
  Usage,
} from './types';
