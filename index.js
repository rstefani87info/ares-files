import {
  readdirSync,
  statSync,
  readFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
  promises as fsPromises,
  renameSync,
  rmdirSync,
  unlinkSync,
} from "fs";
import {
  join,
  resolve,
  extname,
  basename,
  dirname,
  normalize,
  relative,
} from "path";
import { tmpdir } from "os";
import { TreeNode } from "@ares/core/trees.js";

/**
 * @prototype {string}
 * @param {string} this_file
 * @returns {string}
 *
 * Get absolute path
 */
export function getAbsolutePath(this_file) {
  return resolve(this_file);
}

/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} pattern
 * @param {string} mode
 * @param {boolean} recursively
 * @param {array} fileArray
 *
 * Get all files in the directory recursively if required
 */
export function getFilesRecursively(
  this_string,
  pattern,
  mode = '*',
  fileArray = [],
) {
  if (typeof mode === "boolean") {
    mode = "*";
  }
  return getFiles(this_string, pattern, mode, true, fileArray);
}
/**
 * @prototype {string}
 * @param {string} this_string
 * @param {string} pattern
 * @param {string} mode
 * @param {boolean} recursively
 * @param {array} fileArray
 *
 * Get all files in the directory
 */
export function getFiles(
  this_string,
  pattern,
  mode = "*",
  recursively = false,
  fileArray = [],
  exclude = [],
) {
  const files = readdirSync(this_string);

  files.forEach((file) => {
    const filePath = join(this_string, file);
    const fileStat = statSync(filePath);
    if (
      filePath.match(pattern) &&
      (mode == "*" || (fileStat.isDirectory() && mode == "d") || (fileStat.isFile() && mode == "f"))
      && !exclude.includes(filePath)
    ) {
      fileArray.push(filePath);
    }
    if (fileStat.isDirectory() && recursively) {
      fileArray = [
        ...fileArray,
        ...getFiles(
          filePath,
          pattern,
          mode,
          typeof recursively == "int" ? recursively - 1 : recursively,
          [],
          exclude,
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
  return fileExists(this_string) && !isDirectory(this_string);
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
 * @param {string} this_string
 * @param {string} encoding
 *
 * Read file content asynchronously
 */
export async function getFileContentAsync(this_string, encoding = "utf-8") {
  try {
    const absolutePath = resolve(this_string);
    return await fsPromises.readFile(absolutePath, encoding);
  } catch (error) {
    console.error(`Error reading file ${this_string}:`, error.message);
    throw error;
  }
}
/**
 * @prototype {string}
 * @param {string} this_filePath
 * @param {string} content
 * @param {string} encoding
 *
 * Write file content
 *
 */
export async function setFileContent(this_filePath, content, encoding = "utf-8") {
  const parent = getAbsolutePath(getParent(this_filePath));
  if (!fileExists(parent)) await fsPromises.mkdir(parent, { recursive: true });
  await fsPromises.writeFile(this_filePath, content, {
    encoding: encoding,
    flag: "w",
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
    "",
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

/**
 * @prototype {string}
 * @param {string} this_string
 *
 * Check if file exists asynchronously
 */
export async function fileExistsAsync(this_string) {
  try {
    const fileStat = await fsPromises.stat(normalize(this_string));
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
 * @param {boolean} recoursive
 *
 * Create directory asynchronously
 */
export async function createDirectoryAsync(this_path, recoursive = false) {
  if (!(await fileExistsAsync(this_path))) {
    return fsPromises.mkdir(this_path, { recursive: recoursive });
  }
  return null;
}

/*
 * @prototype {string}
 * @param {string} this_path
 * @param {boolean} recoursive
 *
 * Create directory asynchronously only if missing
 */
export async function createDirectoryIfNotExistsAsync(this_path, recoursive = true) {
  const exists = await fileExistsAsync(this_path);
  if (exists) {
    return { created: false, path: normalize(this_path) };
  }

  await createDirectoryAsync(this_path, recoursive);
  return { created: true, path: normalize(this_path) };
}

/**
 * @prototype {string}
 * @param {string} this_filePath
 * @param {object} data
 * @param {number} spaces
 * @param {string} encoding
 *
 * Write JSON file content asynchronously
 */
export async function setJsonFileContentAsync(this_filePath, data, spaces = 2, encoding = "utf-8") {
  return setFileContent(this_filePath, JSON.stringify(data, null, spaces), encoding);
}

/**
 * @prototype {string}
 * @param {string} this_filePath
 * @param {string} encoding
 *
 * Read JSON file content asynchronously
 */
export async function getJsonFileContentAsync(this_filePath, encoding = "utf-8") {
  const content = await getFileContentAsync(this_filePath, encoding);
  return JSON.parse(content);
}

/*
 * @prototype {string}
 * @param {string} this_path
 *
 * Convert file name to js property name
 *
 */
export function getFileNameAsPropertyName(this_path) {
  return this_path.replaceAll(/\W/g, "_");
}

/**
 * @prototype {string}
 * @param {string} src
 * @param {string} dest
 *
 * Copy directory content from src to dest
 */
export function copyDir(src, dest, { exclude = [] } = {}) {
  if (!fileExists(dest)) {
    createDirectory(dest, true);
  }
  const entries = readdirSync(src);

  for (let entry of entries) {
    const escapedEntry = entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (
      exclude.includes(entry) ||
      exclude.some((e) =>
        e instanceof RegExp
          ? e.test(entry)
          : e.match(new RegExp(`^${escapedEntry}(/|\\\\)*$`)),
      )
    ) {
      continue;
    }
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);

    if (isDirectory(srcPath)) {
      copyDir(srcPath, destPath, {
        exclude: exclude
          .map((e) => (e instanceof RegExp ? e.source : e))
          .filter((e) => e.match(new RegExp(`^${escapedEntry}(/|\\\\)*.*$`)))
          .map((e) => e.replace(new RegExp(`^${escapedEntry}(/|\\\\)*`), "")),
      });
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * @prototype {string}
 * @param {string} this_srcPath
 * @param {string} dest
 *
 * Move directory content from src to dest
 */
export function moveDir(this_srcPath, dest) {
  copyDir(this_srcPath, dest);
  rmdirSync(this_srcPath, { recursive: true });
}

/**
 * @prototype {string}
 * @param {string} this_name
 * @param {string} content
 * @param {string} encoding
 *
 * Write temp file content
 */
export function writeTempFile(this_name, content, encoding = "utf-8") {
  const tempFilePath = join(tmpdir(), this_name);
  setFileContent(tempFilePath, content, encoding);
  return tempFilePath;
}
 

 
