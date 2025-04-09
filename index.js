import { readdirSync, statSync, readFileSync,  mkdir, writeFile } from "fs";
import { join, resolve, extname, basename, dirname, normalize, relative } from "path";

 

/**
 * @prototype {string}
 * @param {string} this_file
 * @returns {string}
 * 
 * Get absolute path
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
 * Get all files in the directory recursively if required
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
 * Get all files in the directory
 */
export function getFiles(
  this_string,
  pattern,
  onlyFiles = false,
  recursively = false,
  fileArray = []
) {
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
 * Check if the path is a directory
 */
export function isDirectory(this_string) {
  return statSync(this_string).isDirectory();
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * Check if the path is a file
 */
export function isFile(this_string) {
  return  fileExists(this_string) && !isDirectory(this_string);
}
/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} encoding
 *
 * Read file content
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
 * Write file content
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
 * Get file path based on his parent path
 *
 */
export function getFile(this_path, file) {
  return join(this_path, file);
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * Get file extension
 *
 */
export function getFileExtension(this_string) {
  return extname(this_string);
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * Get file name without extension
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
 * Get file name
 */
export function getBaseName(this_string) {
  return basename(this_string);
}
/**
 * @prototype {string}
 * @param {string} this_string
 *
 * Get parent directory
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
 * Get relative path from this string
 * 
 */
export function getRelativePathFrom(this_string, referenceDir) {
  return relative(normalize(referenceDir), normalize(this_string));
}

/**
 * @prototype {string}
 * @param {string} this_string
 * 
 * Check if file exists
 */
export function fileExists(this_string) {
  try {
    const fileStat = statSync(normalize(this_string));
    return fileStat.ctime != null;
  } catch (e) {
    return false;
  }
}

/*
 * @prototype {string}
 * @param {string} this_path
 * @param {boolean} recoursive
 * 
 * Create directory
 */
export function createDirectory(this_path, recoursive = false) {
  if (!existsSync(this_path)) {
    return mkdirSync(this_path, { recursive: recoursive });
  }
}

/*
 * @prototype {string}
 * @param {string} this_path
 * 
 * Convert file name to js property name
 * 
 */
export function getFileNameAsPropertyName(this_path) {
  return this_path
    .replaceAll(/\W/g, "_");
}

 