<script setup lang="ts">

import { MatchResult } from '@/matcher'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { calculateMatchResultMatrix } from './utils/calculateMatchResultMatrix'

const props = defineProps<{
  queries: string[],
  answer: string
}>()
const matchResultMatrix = calculateMatchResultMatrix(props)
const alphabetMatchResultMap = computed(() => {
  const ret: { [ch: string]: MatchResult } = {}
  for (let row = 0; row < props.queries.length; row++) {
    const query = props.queries[row]
    const matchResultList = matchResultMatrix.value[row]
    for (let chPos = 0; chPos < query.length; chPos++) {
      const ch = query[chPos]
      const matchResult = matchResultList[chPos]
      switch (ret[ch]) {
        case 'exact':
          break

        case 'misplaced':
          if (matchResult === 'exact') {
            ret[ch] = matchResult
          }
          break

        case 'none':
        case undefined:
          ret[ch] = matchResult
          break
      }
    }
  }
  return ret
})

const keyboardKeys = ref([
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm'
])

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (eventName: 'keyClick', key: string): void
}>()

</script>

<template>

<div class="keyboard">
  <div class="keyboard-row" v-for="row, i in keyboardKeys" :key="i">
    <div class="keyboard-key" :class='{[`wordle-match-${alphabetMatchResultMap[ch]}`]: alphabetMatchResultMap[ch]}' v-for="ch in row" :key="ch" @click="emit('keyClick', ch)">
      {{ch.toUpperCase()}}
    </div>
  </div>

  <div class="keyboard-row">
    <div class="keyboard-key" @click="emit('keyClick', 'backspace')">Backspace</div>
    <div class="keyboard-key" @click="emit('keyClick', 'enter')">Enter</div>
  </div>
</div>
</template>

<style lang="scss">

.keyboard {
  font-family: D2Coding, 'Courier New', Courier, monospace;
  margin-top: 3em;
  .keyboard-row {
    .keyboard-key {
      display: inline-block;
      background: #eee;
      font-size: 1.2rem;
      font-weight: bold;
      padding: .3em;
      margin: .1em;

      user-select: none;

      &:hover {
        background: #aaa !important;
        cursor: pointer;
      }

      &.wordle-match-exact {
        background: #6eec45;
      }

      &.wordle-match-misplaced {
        background: #ffee9b;
      }

      &.wordle-match-none {
        background: #444;
        color: #fff;
      }
    }
  }
}

</style>
