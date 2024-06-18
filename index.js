import { readdirSync, statSync, readFileSync,  mkdir, writeFile } from "fs";
import { join, resolve, extname, basename, dirname, normalize, relative } from "path";

 

/**
 * @prototype {string}
 * @param {string} this_file
 * @returns {string}
 * 
 * @desc {en} Get absolute path
 * @desc {it} Ottieni il percorso assoluto
 * @desc {es} Obtiene la ruta absoluta
 * @desc {fr} Obtenez le chemin absolu

 * @desc {pt} Obtenha o caminho absoluto



 */
export function getAbsolutePath(this_file) { return resolve(this_file); } 

/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} pattern
 * @param {boolean} onlyFiles
 * @param {boolean} recursively
 * @param {array} fileArray
 *
 * @desc {en} Get all files in the directory recursively if required
 * @desc {it} Ottieni tutti i files nel directory ricorsivamente se richiesto
 * @desc {es} Obtiene todos los archivos en el directorio recursivamente si es necesario
 * @desc {fr} Obtient tous les fichiers dans le dossier recursivement si requis

 * @desc {pt} Obteve todos os arquivos no diretorio recursivamente se for necessário

 */
export function getFilesRecursively(
  this_string,
  pattern,
  onlyFiles = false,
  fileArray = []
) {
  return getFiles(this_string, pattern, onlyFiles, true, fileArray);
}
/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} pattern
 * @param {boolean} onlyFiles
 * @param {boolean} recursively
 * @param {array} fileArray
 *
 * @desc {en} Get all files in the directory
 * @desc {it} Ottieni tutti i files nel directory
 * @desc {es} Obtiene todos los archivos en el directorio
 * @desc {fr} Obtient tous les fichiers dans le dossier

 * @desc {pt} Obteve todos os arquivos no diretorio
 */
export function getFiles(
  this_string,
  pattern,
  onlyFiles = false,
  recursively = false,
  fileArray = []
) {
  console.log(`reading files from ${this_string}`);
  const files = readdirSync(this_string);

  files.forEach((file) => {
    const filePath = join(this_string, file);
    const fileStat = statSync(filePath);
    if (
      filePath.match(pattern) &&
      (onlyFiles ? !fileStat.isDirectory() : true)
    ) {
      fileArray.push(filePath);
    }
    if (fileStat.isDirectory() && recursively) {
      fileArray = [
        ...fileArray,
        ...getFiles(
          filePath,
          pattern,
          onlyFiles,
          typeof recursively == "int" ? recursively - 1 : recursively
        ),
      ];
    }
  });

  return fileArray;
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * @desc {en} Check if the path is a directory
 * @desc {it} Controlla se il percorso sia una directory
 * @desc {es} Comprueba si la ruta es un directorio
 * @desc {fr} Vérifie si le chemin est un dossier

 * @desc {pt} Verifica se o caminho é um diretório



 */
export function isDirectory(this_string) {
  return statSync(this_string).isDirectory();
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * @desc {en} Check if the path is a file
 * @desc {it} Controlla se il percorso sia un file
 * @desc {es} Comprueba si la ruta es un archivo
 * @desc {fr} Vérifie si le chemin est un fichier

 * @desc {pt} Verifica se o caminho é um arquivo



 */
export function isFile(this_string) {
  return !statSync(this_string).isDirectory() && fileExists(this_string);
}
/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} encoding
 *
 * @desc {en} Read file content
 * @desc {it} Leggi il contenuto del file
 * @desc {es} Lee el contenido del archivo
 * @desc {fr} Lire le contenu du fichier

 * @desc {pt} Leia o conteúdo do arquivo



 *
 */
export function getFileContent(this_string, encoding = "utf-8") {
  try {
    const absolutePath = resolve(this_string);
    const content = readFileSync(absolutePath, encoding);
    return content;
  } catch (error) {
    console.error(`Error reading file ${this_string}:`, error.message);
    throw error;
  }
}
/**
 * @prototype {string}
 * @param {string} filePath
 * @param {string} content
 * @param {string} encoding
 *
 * @desc {en} Write file content
 * @desc {it} Scrivi il contenuto del file
 * @desc {es} Escribe el contenido del archivo
 * @desc {fr} Ecrire le contenu du fichier

 * @desc {pt} Escreva o conteúdo do arquivo



 *
 */
export async function setFileContent(filePath, content, encoding = "utf-8") {
    const parent=getAbsolutePath(getParent(filePath));
    if(!fileExists(parent))mkdir(parent, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory ${parent}:`, err);
      }
    });
    writeFile(filePath, content, { encoding: encoding, flag: 'w' }, (err) => {
      if (err) {
        console.error(`Error writing to file ${filePath}:`, err);
      } 
  });
}
/**
 * @prototype {string}
 * @param {string} this_path
 * @param {string} file
 *
 * @desc {en} Get file path based on his parent path
 * @desc {it} Ottieni il percorso del file in base al suo percorso genitore
 * @desc {es} Obtener la ruta del archivo basado en su ruta de padre
 * @desc {fr} Obtenez le chemin du fichier en fonction de son chemin parent

 * @desc {pt} Obtenha o caminho do arquivo baseado no seu caminho pai



 *
 */
export function getFile(this_path, file) {
  return join(this_path, file);
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * @desc {en} Get file extension
 * 	@desc {it} Ottieni l'estensione del file
 * 	@desc {es} Obtener la extensión del archivo
 * 	@desc {fr} Obtenez l'extension du fichier

 * 	@desc {pt} Obtenha a extensão do arquivo



 *
 */
export function getFileExtension(this_string) {
  return extname(this_string);
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * @desc {en} Get file name without extension
 * 	@desc {it} Ottieni il nome del file senza l'estensione
 * 	@desc {es} Obtener el nombre del archivo sin la extensión
 * 	@desc {fr} Obtenez le nom du fichier sans l'extension

 * 	@desc {pt} Obtenha o nome do arquivo sem a extensão



 */
export function getFileName(this_string) {
  return getBaseName(this_string).replace(
    new RegExp("\\." + getFileExtension(this_string) + "$", "i"),
    ""
  );
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * @desc {en} Get file name
 * 	@desc {it} Ottieni il nome del file
 * 	@desc {es} Obtener el nombre del archivo
 */
export function getBaseName(this_string) {
  return basename(this_string);
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * @desc {en} Get parent directory
 * @desc {it} Ottieni la directory genitore
 * @desc {es} Obtener el directorio padre
 * @desc {fr} Obtenez le dossier parent

 * @desc {pt} Obtenha o diretório pai



 */
export function getParent(this_string) {
  const parentDir = dirname(this_string);
  return normalize(parentDir);
}

/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} referenceDir
 * 
 * @desc {en} Get relative path from this string
 * @desc {it} Ottieni la directory genitore
 * @desc {es} Obtener el directorio padre
 * @desc {fr} Obtenez le dossier parent

 * @desc {pt} Obtenha o diretório pai



 * 
 */
export function getRelativePathFrom(this_string, referenceDir) {
  return normalize(relative(referenceDir, this_string));
}

/**
 * @prototype {string}
 * @param {string} this_string
 * 
 * @desc {en} Check if file exists
 * @desc {it} Controlla se il file esiste
 * @desc {es} Comprueba si el archivo existe
 * @desc {fr} Vérifie si le fichier existe

 * @desc {pt} Verifica se o arquivo existe



 */
export function fileExists(this_string) {
  try {
    const fileStat = statSync(normalize(this_string));
    return fileStat.ctime != null;
  } catch (e) {
    return false;
  }
}

 