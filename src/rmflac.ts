// usage: yarn run rmflac path/to/music-library

import { unlinkSync } from 'fs';
import { prompt } from 'enquirer';
import { readFlacFiles } from './lib/read-flac-files';

async function main() {
  const fromBaseDir = process.argv[2];
  if (fromBaseDir === undefined) {
    throw new Error('<from-base-dir> is required');
  }

  console.log('Searching flac files...');

  const files = readFlacFiles(fromBaseDir);

  files.forEach((file) => console.log(file.path));

  console.log(`All flac files: ${files.length}`);

  const { isContinue } = await prompt<{ isContinue: boolean }>([
    {
      name: 'isContinue',
      type: 'confirm',
      message: 'Continue to remove files?',
      initial: false,
    },
  ]);
  if (!isContinue) return;

  for (const file of files) {
    unlinkSync(file.path);
  }

  console.log('Complete!');
}

main().catch(console.error);
