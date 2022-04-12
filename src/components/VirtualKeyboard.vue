<script setup lang="ts">

import { ref } from 'vue'

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
    <div class="keyboard-key" v-for="ch in row" :key="ch" @click="emit('keyClick', ch)">
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
