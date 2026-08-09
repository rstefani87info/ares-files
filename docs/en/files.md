# @ares/files Documentation

## Purpose

File management engine

## Installation

```bash
yarn add @ares/files
```

In a Yarn Workspaces monorepo:

```bash
yarn workspace <app> add @ares/files
```

## Quickstart

Minimal example:

```js
import * as mod from "@ares/files";
```

## Public API (exports)

This section documents the actual public surface at entrypoint level and main exported symbols.

Root entrypoint:

- `@ares/files`

Main files at package root (indicative):

- `index.js`

Exports detected in `index.*`:

- `copyDir`
- `createDirectory`
- `fileExists`
- `getAbsolutePath`
- `getBaseName`
- `getFile`
- `getFileContent`
- `getFileExtension`
- `getFileName`
- `getFileNameAsPropertyName`
- `getFiles`
- `getFilesRecursively`
- `getParent`
- `getRelativePathFrom`
- `isDirectory`
- `isFile`
- `setFileContent`

## Configuration (appSetup / config / policies)

This module may read configuration from `appSetup`, `config`, or `policies` depending on the type. Document the actually consumed keys as you stabilize the contract.

## Test

Run module tests (if present):

```bash
yarn workspace @ares/files test
```

## Notes

- This document is maintained alongside the module tickets.

## Appendix (previous content)

## Description

The `@ares/files` module is a file management engine that provides advanced utilities for filesystem operations with both synchronous and asynchronous support.

## Installation

```bash
npm install @ares/files
```

## Key Features

### Basic Functions

#### Path Management
- `getAbsolutePath(filePath)` - Get absolute path of a file
- `getFileName(filePath)` - Extract filename from path
- `getBaseName(filePath)` - Get base filename without extension
- `getFileExtension(filePath)` - Extract file extension
- `getParent(filePath)` - Get parent directory
- `getRelativePathFrom(from, to)` - Calculate relative path

#### File Operations
- `fileExists(filePath)` / `fileExistsAsync(filePath)` - Check file existence
- `getFileContent(filePath)` / `getFileContentAsync(filePath)` - Read file content
- `setFileContent(filePath, content)` / `setFileContentAsync(filePath, content)` - Write file content
- `copyFile(source, destination)` / `copyFileAsync(source, destination)` - Copy file
- `deleteFile(filePath)` / `deleteFileAsync(filePath)` - Delete file
- `getFileStats(filePath)` / `getFileStatsAsync(filePath)` - Get file statistics
- `getFileSize(filePath)` / `getFileSizeAsync(filePath)` - Get file size

#### Directory Operations
- `isDirectory(path)` - Check if path is a directory
- `isFile(path)` - Check if path is a file
- `createDirectory(dirPath)` / `createDirectoryAsync(dirPath)` - Create directory
- `createDirectoryIfNotExists(dirPath)` / `createDirectoryIfNotExistsAsync(dirPath)` - Create directory if not exists
- `deleteDirectory(dirPath)` / `deleteDirectoryAsync(dirPath)` - Delete directory
- `getFiles(dirPath, pattern, onlyFiles, recursively)` / `getFilesAsync(...)` - List files
- `getFilesRecursively(dirPath, pattern, onlyFiles)` / `getFilesRecursivelyAsync(...)` - List files recursively

## Usage

### Synchronous Operations

```javascript
import { 
    getFileContent, 
    setFileContent, 
    fileExists, 
    createDirectory,
    getFiles 
} from '@ares/files';

// Read a file
if (fileExists('./config.json')) {
    const content = getFileContent('./config.json');
    console.log(content);
}

// Write a file
setFileContent('./output.txt', 'Hello World!');

// Create a directory
createDirectory('./new-folder');

// List files in a directory
const files = getFiles('./src', '*.js', true, true);
console.log(files);
```

### Asynchronous Operations

```javascript
import { 
    getFileContentAsync, 
    setFileContentAsync, 
    fileExistsAsync, 
    createDirectoryAsync,
    getFilesAsync 
} from '@ares/files';

// Read a file (async)
if (await fileExistsAsync('./config.json')) {
    const content = await getFileContentAsync('./config.json');
    console.log(content);
}

// Write a file (async)
await setFileContentAsync('./output.txt', 'Hello World!');

// Create a directory (async)
await createDirectoryAsync('./new-folder');

// List files in a directory (async)
const files = await getFilesAsync('./src', '*.js', true, true);
console.log(files);
```

### Error Handling

All functions include advanced error handling:

```javascript
try {
    const content = getFileContent('./nonexistent.txt');
} catch (error) {
    console.error('Error reading file:', error.message);
}

// Async version
try {
    const content = await getFileContentAsync('./nonexistent.txt');
} catch (error) {
    console.error('Error reading file:', error.message);
}
```

### Conditional Directory Creation

```javascript
// Create directory only if it doesn't exist
const result = createDirectoryIfNotExists('./optional-folder');
if (result.created) {
    console.log('Directory created successfully');
} else {
    console.log('Directory already exists');
}

// Async version
const result = await createDirectoryIfNotExistsAsync('./optional-folder');
if (result.created) {
    console.log('Directory created successfully');
} else {
    console.log('Directory already exists');
}
```

## Advanced Features

### Automatic Parent Directory Creation
Write functions automatically create parent directories if they don't exist.

### Path Validation
All paths are automatically validated and normalized.

### Consistent Error Handling
Descriptive error messages and uniform error handling.

### Dual API
Every operation is available in both synchronous and asynchronous versions.

## Dependencies

- `fs` - Node.js filesystem module
- `moment` - Date manipulation
- `path` - Path utilities
- `unzipper` - ZIP archive handling

## License

MIT

## Author

Roberto Stefani

## Repository

[GitHub - ares-files](https://github.com/rstefani87info/ares-files)
