// usage: yarn run flac2alac path/to/music-library path/to/dist

import { join, parse, relative, resolve } from 'path';
import Piscina from 'piscina';
import { readFlacFiles } from './lib/read-flac-files';

const piscina = new Piscina({
  filename: resolve(__dirname, 'lib/worker.mjs'),
});

async function main() {
  const fromBaseDir = process.argv[2];
  const toBaseDir = process.argv[3];
  if (fromBaseDir === undefined) {
    throw new Error('<from-base-dir> is required');
  }
  if (toBaseDir === undefined) {
    throw new Error('<to-base-dir> is required');
  }

  console.log('Searching flac files...');

  const files = readFlacFiles(fromBaseDir);

  console.log(`All flac files: ${files.length}`);

  const tasks: Promise<void>[] = [];
  for (const file of files) {
    const from = relative(__dirname, file.path);
    // fromBaseDir を起点としたパス
    const relativePath = relative(resolve(fromBaseDir), file.path);
    const parsed = parse(relativePath);
    const to = join(toBaseDir, parsed.dir, parsed.name + '.m4a');
    const task = piscina.runTask({ from, to });
    tasks.push(task);
  }
  await Promise.all(tasks);

  console.log('Complete!');
}

main().catch(console.error);


