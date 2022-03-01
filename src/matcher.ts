export type MatchResult = 'exact' | 'misplaced' | 'none'

export function matchWord (
  query: string,
  answer: string
): MatchResult[] {
  if (query.length !== answer.length) {
    throw new Error('Invalid query: different query/anwer length.')
  }

  const length = query.length
  const ret = Array(length).fill('none') as MatchResult[]

  // Process exact words
  for (let i = 0; i < length; i++) {
    if (query[i] === answer[i]) {
      ret[i] = 'exact'
    }
  }

  // Count non-matched answer characters
  const chCountMap = {} as {[key: string]: number}
  for (let i = 0; i < length; i++) {
    if (ret[i] === 'none') {
      const ansCh = answer[i]
      chCountMap[ansCh] = (chCountMap[ansCh] || 0) + 1
    }
  }

  // Label misplace-matched character on query sides
  for (let i = 0; i < length; i++) {
    if (ret[i] === 'none') {
      const queryCh = query[i]
      if (chCountMap[queryCh] > 0) {
        chCountMap[queryCh]--
        ret[i] = 'misplaced'
      }
    }
  }

  return ret
}
