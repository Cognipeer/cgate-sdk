import { HttpClient } from '../http';
import { FileBucket, FileObject, UploadFileRequest, ListFilesQuery } from '../types';

/**
 * Files API resource
 */
export class FilesResource {
  private http: HttpClient;
  public buckets: FileBucketsResource;

  constructor(http: HttpClient) {
    this.http = http;
    this.buckets = new FileBucketsResource(http);
  }

  /**
   * List files in a bucket
   * @param bucketKey - Bucket identifier
   * @param query - Optional filters and pagination
   */
  async list(
    bucketKey: string,
    query?: ListFilesQuery
  ): Promise<{ files: FileObject[]; count: number; nextCursor?: string | null }> {
    return this.http.request('GET', `/api/client/v1/files/buckets/${bucketKey}/objects`, {
      query: query as Record<string, string | number | boolean | undefined>,
    });
  }

  /**
   * Upload a file to a bucket
   * @param bucketKey - Bucket identifier
   * @param data - File data
   */
  async upload(
    bucketKey: string,
    data: UploadFileRequest
  ): Promise<{ file: FileObject; message?: string }> {
    return this.http.request('POST', `/api/client/v1/files/buckets/${bucketKey}/objects`, {
      body: data,
    });
  }
}

/**
 * File buckets resource
 */
export class FileBucketsResource {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * List all file buckets
   */
  async list(): Promise<{ buckets: FileBucket[]; count: number }> {
    return this.http.request('GET', '/api/client/v1/files/buckets');
  }

  /**
   * Get bucket details
   * @param bucketKey - Bucket identifier
   */
  async get(bucketKey: string): Promise<{ bucket: FileBucket }> {
    return this.http.request('GET', `/api/client/v1/files/buckets/${bucketKey}`);
  }
}
