declare module 'shella' {
  async function shella(
    strings: TemplateStringsArray,
    ...args: string[]
  ): Promise<{
    stdout: NodeJS.Process;
  }>;
  // eslint-disable-next-line import/no-default-export
  export default shella;
}
