
import { mkdirSync } from 'fs';
import { dirname } from 'path';
import shella from 'shella';

// eslint-disable-next-line import/no-default-export
export default async function ({ from, to }) {
  console.log(`Converting ${from}...`);
  mkdirSync(dirname(to), { recursive: true });
  await shella`
    xld ${from} -o ${to} -f alac
  `;
};
