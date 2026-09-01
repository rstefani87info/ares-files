# Documentazione @ares/files

## Scopo

File management engine

## Installazione

```bash
yarn add @ares/files
```

In un monorepo Yarn Workspaces:

```bash
yarn workspace <app> add @ares/files
```

## Quickstart

Esempio minimale:

```js
import * as mod from "@ares/files";
```

## API pubbliche (exports)

Questa sezione documenta la superficie pubblica reale a livello di entrypoint e simboli principali.

Entrypoint root:

- `@ares/files`

File principali nel root del package (indicativi):

- `index.js`

Export individuati in `index.*`:

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

## Configurazione (appSetup / config / policies)

Questo modulo può leggere configurazioni da `appSetup`, `config` o `policies` a seconda del tipo. Documenta qui le chiavi effettivamente consumate quando stabilizzi il contract.

## Test

Esecuzione test del modulo (se presenti):

```bash
yarn workspace @ares/files test
```

## Note

- Questo documento è mantenuto in parallelo ai ticket del modulo.

## Appendice (contenuto precedente)

## Descrizione

Il modulo `@ares/files` è un motore di gestione file che fornisce utilità avanzate per operazioni sul filesystem con supporto sia sincrono che asincrono.

## Installazione

```bash
npm install @ares/files
```

## Caratteristiche Principali

### Funzioni di Base

#### Gestione Percorsi
- `getAbsolutePath(filePath)` - Ottiene il percorso assoluto di un file
- `getFileName(filePath)` - Estrae il nome del file dal percorso
- `getBaseName(filePath)` - Ottiene il nome base del file senza estensione
- `getFileExtension(filePath)` - Estrae l'estensione del file
- `getParent(filePath)` - Ottiene la directory padre
- `getRelativePathFrom(from, to)` - Calcola il percorso relativo

#### Operazioni sui File
- `fileExists(filePath)` / `fileExistsAsync(filePath)` - Verifica esistenza file
- `getFileContent(filePath)` / `getFileContentAsync(filePath)` - Legge contenuto file
- `setFileContent(filePath, content)` / `setFileContentAsync(filePath, content)` - Scrive contenuto file
- `copyFile(source, destination)` / `copyFileAsync(source, destination)` - Copia file
- `deleteFile(filePath)` / `deleteFileAsync(filePath)` - Elimina file
- `getFileStats(filePath)` / `getFileStatsAsync(filePath)` - Ottiene statistiche file
- `getFileSize(filePath)` / `getFileSizeAsync(filePath)` - Ottiene dimensione file

#### Operazioni sulle Directory
- `isDirectory(path)` - Verifica se il percorso è una directory
- `isFile(path)` - Verifica se il percorso è un file
- `createDirectory(dirPath)` / `createDirectoryAsync(dirPath)` - Crea directory
- `createDirectoryIfNotExists(dirPath)` / `createDirectoryIfNotExistsAsync(dirPath)` - Crea directory se non esiste
- `deleteDirectory(dirPath)` / `deleteDirectoryAsync(dirPath)` - Elimina directory
- `getFiles(dirPath, pattern, onlyFiles, recursively)` / `getFilesAsync(...)` - Elenca file
- `getFilesRecursively(dirPath, pattern, onlyFiles)` / `getFilesRecursivelyAsync(...)` - Elenca file ricorsivamente

## Utilizzo

### Operazioni Sincrone

```javascript
import { 
    getFileContent, 
    setFileContent, 
    fileExists, 
    createDirectory,
    getFiles 
} from '@ares/files';

// Leggere un file
if (fileExists('./config.json')) {
    const content = getFileContent('./config.json');
    console.log(content);
}

// Scrivere un file
setFileContent('./output.txt', 'Hello World!');

// Creare una directory
createDirectory('./new-folder');

// Elencare file in una directory
const files = getFiles('./src', '*.js', true, true);
console.log(files);
```

### Operazioni Asincrone

```javascript
import { 
    getFileContentAsync, 
    setFileContentAsync, 
    fileExistsAsync, 
    createDirectoryAsync,
    getFilesAsync 
} from '@ares/files';

// Leggere un file (async)
if (await fileExistsAsync('./config.json')) {
    const content = await getFileContentAsync('./config.json');
    console.log(content);
}

// Scrivere un file (async)
await setFileContentAsync('./output.txt', 'Hello World!');

// Creare una directory (async)
await createDirectoryAsync('./new-folder');

// Elencare file in una directory (async)
const files = await getFilesAsync('./src', '*.js', true, true);
console.log(files);
```

### Gestione Errori

Tutte le funzioni includono gestione errori avanzata:

```javascript
try {
    const content = getFileContent('./nonexistent.txt');
} catch (error) {
    console.error('Errore nella lettura del file:', error.message);
}

// Versione asincrona
try {
    const content = await getFileContentAsync('./nonexistent.txt');
} catch (error) {
    console.error('Errore nella lettura del file:', error.message);
}
```

### Creazione Directory Condizionale

```javascript
// Crea directory solo se non esiste
const result = createDirectoryIfNotExists('./optional-folder');
if (result.created) {
    console.log('Directory creata con successo');
} else {
    console.log('Directory già esistente');
}

// Versione asincrona
const result = await createDirectoryIfNotExistsAsync('./optional-folder');
if (result.created) {
    console.log('Directory creata con successo');
} else {
    console.log('Directory già esistente');
}
```

## Caratteristiche Avanzate

### Creazione Automatica Directory Padre
Le funzioni di scrittura creano automaticamente le directory padre se non esistono.

### Validazione Percorsi
Tutti i percorsi vengono validati e normalizzati automaticamente.

### Gestione Errori Consistente
Messaggi di errore descrittivi e gestione uniforme degli errori.

### API Duale
Ogni operazione è disponibile sia in versione sincrona che asincrona.

## Dipendenze

- `fs` - Modulo filesystem Node.js
- `moment` - Manipolazione date
- `path` - Utilità percorsi
- `unzipper` - Gestione archivi ZIP

## Licenza

MIT

## Autore

Roberto Stefani

## Repository

[GitHub - ares-files](https://github.com/rstefani87info/ares-files)
