# Panoramica CLI — @ares/files

## Stato

Questo modulo **non ha una CLI binaria** (`package.json` senza `bin`) e nessun comando CLI dedicato. È una libreria importabile.

## Comandi (npm scripts)

| Comando | Scopo |
|---|---|
| `npm test` | Placeholder (nessun test definito, ritorna errore). |

## API runtime (import)

```js
import {
  getFileContent, setFileContent, fileExists, createDirectory,
  getFiles, getFilesRecursively, copyDir, moveDir,
  getAbsolutePath, getFileName, getBaseName, getFileExtension, getParent, getRelativePathFrom,
  isDirectory, isFile, getFile, getFileNameAsPropertyName, writeTempFile,
  getJsonFileContentAsync, setJsonFileContentAsync,
  // ... varianti *Async
} from "@ares/files";
```
