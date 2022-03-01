// eslint-disable-next-line @typescript-eslint/no-var-requires
const words = require('./words.json') as string[]

export function getWordsByLength (length: number): string[] {
  return words.filter(x => x.length === length)
}
