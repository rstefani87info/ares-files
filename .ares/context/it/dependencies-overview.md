# Dipendenze — @ares/files

## Dipendenze @ares/* usate

| Modulo | Perché |
|---|---|
| `@ares/core` | Fornisce `TreeNode` da `@ares/core/trees.js` per astrazioni ad albero usate nelle operazioni su directory. |

## Dipendenze @ares/* (dev)

| Modulo | Perché |
|---|---|
| `@ares/scd` | Strumenti SCD per analisi/generazione documentazione. |

## Dipendenze esterne rilevanti

- `fs` — modulo Node.js nativo per operazioni filesystem (wrappato dal modulo).
- `path` — modulo Node.js nativo per manipolazione percorsi (wrappato dal modulo).
- `moment` — gestione date (usata per timestamp nelle operazioni file).
- `unzipper` — estrazione archivi ZIP.

## Chi dipende da questo modulo

| Modulo | Come lo usa |
|---|---|
| `@ares/file-sync` | Utility FS di base: `getAbsolutePath`, `createDirectory`, `copyDir`, `getFiles`, `getFileContent` per il watcher e la sincronizzazione. |
| `@ares/google` | Utility file: `getFileContent`, `setFileContent` per leggere/scrivere chiavi service account (devDependency). |
| `@ares/ecosystem-microservices-geo` | Utility filesystem: `getAbsolutePath`, `fileExists` per fissare `datasourcesRoot` e servire file geo. |
