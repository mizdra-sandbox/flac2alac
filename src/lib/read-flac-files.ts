import { readdirSync } from 'fs';
import { extname } from 'path';

type File = {
  path: string;
};

export function readFlacFiles(path: string): File[] {
  // from: https://blog.araya.dev/posts/2019-05-09/node-recursive-readdir.html
  const readdirRecursively = (dir: string, files: string[] = []) => {
    const dirents = readdirSync(dir, { withFileTypes: true });
    const dirs = [];
    for (const dirent of dirents) {
      if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
      if (dirent.isFile()) files.push(`${dir}/${dirent.name}`);
    }
    for (const d of dirs) {
      files = readdirRecursively(d, files);
    }
    return files;
  };

  const files = readdirRecursively(path)
    .filter((filePath) => /^\.flac$/.test(extname(filePath)))
    .map((filePath) => ({
      // 絶対パス
      path: filePath,
    }));
  return files;
}
