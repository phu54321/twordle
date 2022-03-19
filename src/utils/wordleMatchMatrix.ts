import { MatchResult, matchWord } from './../matcher'

interface CharMatchResultPair {
  ch: string
  matchResult: MatchResult
}

/**
 * Wordle 채점 결과 표를 만듭니다.
 * @param queries 입력 단어들
 * @param answer 정답
 * @returns ('단어', '채점결과')의 2차원 배열
 */
export function computeWordleMatchMatrix (
  queries: string[],
  answer: string
): CharMatchResultPair[][] {
  const ret = [] as CharMatchResultPair[][]
  for (let i = 0; i < queries.length; i++) {
    const query = queries[i]
    const retRow = [] as CharMatchResultPair[]
    const matchResult = matchWord(query, answer)
    for (let j = 0; j < query.length; j++) {
      retRow.push({
        ch: query[j],
        matchResult: matchResult[j]
      })
    }
    ret.push(retRow)
  }
  return ret
}
