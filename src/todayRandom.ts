function xorshiftMix (n: number) {
  n ^= (n << 13)
  n ^= (n >>> 17)
  n ^= (n << 5)

  // n might be negative
  return n & 0x7fffffff
}

export function todayRandom (): number {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  let dayNumber = y * 10000 + m * 100 + d

  // mix dayNumber
  dayNumber = xorshiftMix(dayNumber)
  dayNumber = xorshiftMix(dayNumber)
  dayNumber = xorshiftMix(dayNumber)
  return dayNumber
}
