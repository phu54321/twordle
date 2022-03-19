<script setup lang="ts">

import { MatchResult } from '@/matcher'
import { computeWordleMatchMatrix } from '@/utils/wordleMatchMatrix'
import { computed, ref } from 'vue'

const props = defineProps<{
  queries: string[],
  answer: string
}>()

const matchMatrix = computed(() => {
  return computeWordleMatchMatrix(props.queries, props.answer)
})

const keyMatchClass = computed(() => {
  const ret = {} as {[key: string]: MatchResult}
  for (const row of matchMatrix.value) {
    for (const { ch, matchResult } of row) {
      if (
        (matchResult === 'exact') ||
      (matchResult === 'misplaced' && ret[ch] !== 'exact') ||
      (matchResult === 'none' && !(ch in ret))
      ) {
        ret[ch] = matchResult
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
    <div class="keyboard-key" :class="[`wordle-match-${keyMatchClass[ch]}`]" v-for="ch in row" :key="ch" @click="emit('keyClick', ch)">
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
