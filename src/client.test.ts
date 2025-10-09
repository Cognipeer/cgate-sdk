import { describe, it, expect, beforeEach } from 'vitest';
import { CGateClient } from '../src';
import { CGateError } from '../src/types';

describe('CGateClient', () => {
  describe('initialization', () => {
    it('should create client with API key', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
      });

      expect(client).toBeDefined();
      expect(client.chat).toBeDefined();
      expect(client.embeddings).toBeDefined();
      expect(client.vectors).toBeDefined();
      expect(client.files).toBeDefined();
      expect(client.tracing).toBeDefined();
    });

    it('should throw error without API key', () => {
      expect(() => {
        new CGateClient({
          apiKey: '',
        });
      }).toThrow();
    });

    it('should use default base URL', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
      });

      const baseURL = client.getBaseURL();
      expect(baseURL).toBe('https://api.cognipeer.ai/api/client/v1');
    });

    it('should use custom base URL', () => {
      const customURL = 'https://custom.api.com';
      const client = new CGateClient({
        apiKey: 'test-key',
        baseURL: customURL,
      });

      const baseURL = client.getBaseURL();
      expect(baseURL).toBe(customURL);
    });

    it('should strip trailing slash from base URL', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
        baseURL: 'https://api.example.com/',
      });

      const baseURL = client.getBaseURL();
      expect(baseURL).toBe('https://api.example.com');
    });
  });

  describe('configuration', () => {
    it('should use default timeout', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
      });

      expect(client).toBeDefined();
    });

    it('should use custom timeout', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
        timeout: 30000,
      });

      expect(client).toBeDefined();
    });

    it('should use default max retries', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
      });

      expect(client).toBeDefined();
    });

    it('should use custom max retries', () => {
      const client = new CGateClient({
        apiKey: 'test-key',
        maxRetries: 5,
      });

      expect(client).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should create CGateError', () => {
      const error = new CGateError('Test error');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('CGateError');
    });

    it('should create CGateError with status code', () => {
      const error = new CGateError('Test error', 404);
      expect(error.statusCode).toBe(404);
    });
  });
});
