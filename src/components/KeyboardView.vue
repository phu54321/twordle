<script setup lang="ts">
import { MinimalKeyDownEvent } from '@/App.vue'
import { MatchResult, matchWord } from '@/matcher'
import { computed } from 'vue'

const props = defineProps<{
  queries: string[], // Matches shown
  answer: string
}>()

const emit = defineEmits<{(e: 'keydown', event: MinimalKeyDownEvent): void}>()

const keyboardRows = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm'
]

const characterMatchDict = computed(() => {
  const alphabets = keyboardRows.join('')

  // alphabet → character match status
  const matchDict = {} as {[key: string]: (MatchResult | 'unseen')}
  for (const ch of alphabets) {
    matchDict[ch] = 'unseen'
  }

  for (const word of props.queries) {
    const matches = matchWord(word, props.answer)
    for (let i = 0; i < matches.length; i++) {
      const ch = word[i]
      switch (matches[i]) {
        case 'exact':
          matchDict[ch] = 'exact'
          break

        case 'misplaced':
          if (matchDict[ch] === 'unseen') {
            matchDict[ch] = 'misplaced'
          }
          break

        case 'none':
          if (matchDict[ch] === 'unseen') {
            matchDict[ch] = 'none'
          }
          break
      }
    }
  }
  return matchDict
})

// Keyboard presser
function pressKey (ch: string) {
  console.log(ch)
  emit('keydown', {
    code: 'Key' + ch.toUpperCase(),
    key: ch.toUpperCase()
  })
}
</script>

<template>

<div class="keyboard">
  <div class="keyboard-row" v-for='row, i in keyboardRows' :key="i">
    <div class="keyboard-char"
      v-for="ch in row" :key="ch" @click="pressKey(ch)"
      :class="[`wordle-match-${characterMatchDict[ch]}`]"
    >{{ch.toUpperCase()}}</div>
  </div>
</div>

</template>

<style lang="scss">

.keyboard {
  .keyboard-row {
    .keyboard-char {
      display: inline-block;
      width: 2em;
      height: 2em;
      line-height: 2em;
      border: 1px solid black;
      background-color: #eee;
      margin: 0.1em;

      user-select: none;
    }
  }
}

</style>
