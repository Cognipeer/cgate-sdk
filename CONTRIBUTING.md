# CONTRIBUTING.md

Thank you for your interest in contributing to the CG SDK!

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/cgate-sdk.git
cd cgate-sdk
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run tests:

```bash
npm test
```

## Project Structure

```
cgate-sdk/
├── src/
│   ├── client.ts          # Main client
│   ├── http.ts            # HTTP utilities
│   ├── types.ts           # TypeScript types
│   ├── index.ts           # Public exports
│   └── resources/         # API resource modules
│       ├── chat.ts
│       ├── embeddings.ts
│       ├── vectors.ts
│       ├── files.ts
│       └── tracing.ts
├── examples/              # Usage examples
├── docs/                  # Documentation
└── tests/                 # Test files
```

## Development Workflow

1. Create a feature branch:

```bash
git checkout -b feature/my-feature
```

2. Make your changes

3. Add tests for new functionality

4. Run linting:

```bash
npm run lint
```

5. Format code:

```bash
npm run format
```

6. Build and test:

```bash
npm run build
npm test
```

7. Commit your changes:

```bash
git commit -m "feat: add new feature"
```

8. Push and create a pull request

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or tooling changes

## Pull Request Process

1. Update documentation for any new features
2. Add examples for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Testing

Write tests for new functionality:

```typescript
import { describe, it, expect } from 'vitest';
import { CGateClient } from '../src';

describe('CGateClient', () => {
  it('should initialize with API key', () => {
    const client = new CGateClient({ apiKey: 'test-key' });
    expect(client).toBeDefined();
  });
});
```

## Documentation

Update documentation for changes:

1. API docs in `docs/api/`
2. Guide docs in `docs/guide/`
3. Examples in `examples/`
4. README.md for major changes

## Code Style

- Use TypeScript for all code
- Follow existing code style
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use descriptive variable names

## Release Process

Maintainers will handle releases:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Publish to npm
5. Create GitHub release

## Questions?

- Open an issue for bugs
- Use discussions for questions
- Join our Discord for chat

Thank you for contributing! 🎉
