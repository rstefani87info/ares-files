# Stili di sviluppo applicati — @ares/files

## Standard di programmazione

- Modulo **ESM** (`"type": "module"`, entrypoint `index.js`).
- Codice documentato con commenti `@prototype` / `@param` / `@returns` su ogni funzione.
- Convenzione API **duale**: ogni operazione esiste in versione sincrona e asincrona (`*Async`).
- Import dai moduli `fs`, `path`, `os` di Node e `TreeNode` da `@ares/core/trees.js`.

## Contratto directory / file

```text
files/
├─ index.js        # MANUALE  — intera implementazione delle utility file
├─ package.json    # MANUALE
├─ README.md       # MANUALE
├─ LICENSE         # MANUALE  — MIT
├─ .gitignore      # MANUALE
├─ .git/           # GENERATO (locale)
└─ .ares/
   ├─ context/     # MANUALE   — doc di contesto (prodotto)
   ├─ docs/{en,it} # MANUALE   — documentazione
   └─ tasks/       # MANUALE   — task canonici
```

## Generato automaticamente vs Manuale

### Generato automaticamente (non committare)

- `.git/` (locale).

### Manuale (scritto a mano, NON rigenerare/sovrascrivere)

- `index.js` (le utility file da conservare).
- `package.json`, `README.md`, `LICENSE`, `.gitignore`.
- Tutti i file dentro `.ares/` (context, docs, tasks).

Nessuna directory di build/dist; le dipendenze sono risolte a livello monorepo.
