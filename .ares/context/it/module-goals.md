# Obiettivi del modulo @ares/files

## Introduzione

`@ares/files` è il **File management engine** del framework aReS (descrizione in `package.json`). È un modulo ESM con entrypoint `index.js` che fornisce utility avanzate per il filesystem, con API sia **sincrone** sia **asincrone**.

## Obiettivi principali

- Fornire utility di gestione percorsi, file e directory (lettura, scrittura, copia, eliminazione, elenco).
- Supportare ricorsione ed esclusione nei listing/copia.
- Creazione automatica delle directory padre e normalizzazione/validazione dei percorsi.
- Gestione archivi ZIP (`unzipper`) e file JSON (read/write tipizzati).

## Responsabilità

- Percorsi: `getAbsolutePath`, `getFileName`, `getBaseName`, `getFileExtension`, `getParent`, `getRelativePathFrom`.
- File: `fileExists`/`fileExistsAsync`, `getFileContent`/`getFileContentAsync`, `setFileContent`/`setFileContentAsync`, `getFileNameAsPropertyName`, `writeTempFile`.
- Directory: `isDirectory`, `isFile`, `createDirectory`/`createDirectoryAsync`, `createDirectoryIfNotExistsAsync`, `getFiles`/`getFilesRecursively`, `copyDir`, `moveDir`.
- JSON: `getJsonFileContentAsync`, `setJsonFileContentAsync`.
- Dipende da `TreeNode` di `@ares/core/trees.js` per astrazioni ad albero.

## Cosa NON fa

- Non fornisce watch/sync in tempo reale (per questo vedi `@ares/file-sync`).
- Non ha CLI binaria (`package.json` senza `bin`).
- Non gestisce permessi/ACL di sistema né streaming avanzato.
