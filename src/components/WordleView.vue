<script setup lang="ts">
import { matchWord } from '@/matcher'
import { computed } from 'vue'

const props = defineProps<{
  tryCount: number,
  query: string[], // Matches shown
  nextQuery: string, // No matches shown yet
  answer: string
}>()

const wordLength = computed(() => props.answer.length)
const matchClassMatrix = computed(() => {
  return props.query.map(q => matchWord(q, props.answer))
    .map(s => s.map(q => `wordle-match-${q}`))
})

</script>

<template>

<div class="wordle-table">
  <div class="wordle-row" v-for='_, i in tryCount' :key="i">
    <template v-if="query[i] !== undefined">
      <div class="wordle-char" :class="[matchClassMatrix[i][j]]" v-for="_, j in wordLength" :key="j">{{query[i][j].toUpperCase()}}</div>
    </template>
    <template v-else-if="query.length === i">
      <div class="wordle-char" v-for="_, j in wordLength" :key="j">{{(nextQuery[j] || '&nbsp;').toUpperCase()}}</div>
    </template>
    <template v-else>
      <div class="wordle-char" v-for="_, j in wordLength" :key="j">&nbsp;</div>
    </template>
  </div>
</div>

</template>

<style lang="scss">

.wordle-table {
  .wordle-row {
    margin-top: .3em;
    &.first-of-kind {
      margin-top: 0px;
    }

    .wordle-char {
      display: inline-block;
      background: #eee;
      font-size: 2em;
      width: 2em;
      height: 2em;
      line-height: 2em;
      margin: 0 .1em;
    }
  }
}

</style>
