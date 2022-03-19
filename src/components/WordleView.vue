<script setup lang="ts">
import { matchWord } from '@/matcher'
import { computeWordleMatchMatrix } from '@/utils/wordleMatchMatrix'
import { computed } from 'vue'

const props = defineProps<{
  queries: string[],
  lastQuery: string[],
  tryCount: number,
  answer: string
}>()

const wordLength = computed(() => props.answer.length)
const matchMatrix = computed(() => {
  return computeWordleMatchMatrix(props.queries, props.answer)
})

</script>

<template>

<div class="wordle-table">
  <div class="wordle-row" v-for='_, i in tryCount' :key="i">
    <template v-if="queries[i] !== undefined">
      <div class="wordle-char" :class="[`wordle-match-${matchMatrix[i][j].matchResult}`]" v-for="_, j in wordLength" :key="j">
        {{queries[i][j].toUpperCase()}}
      </div>
    </template>

    <template v-else-if="queries.length === i">
      <div class="wordle-char" v-for="_, j in wordLength" :key="j">
        {{(lastQuery[j] || '&nbsp;').toUpperCase()}}
      </div>
    </template>

    <template v-else>
      <div class="wordle-char" v-for="_, j in wordLength" :key="j">
        &nbsp;
      </div>
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
