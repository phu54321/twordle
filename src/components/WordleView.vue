<script setup lang="ts">
import { computed } from 'vue'
import { calculateMatchResultMatrix } from './utils/calculateMatchResultMatrix'

const props = defineProps<{
  queries: string[],
  lastQuery: string[],
  tryCount: number,
  answer: string
}>()

const wordLength = computed(() => props.answer.length)
const matchResultMatrix = calculateMatchResultMatrix(props)

</script>

<template>

<div class="wordle-table">
  <div class="wordle-row" v-for='_, i in tryCount' :key="i">
    <template v-if="queries[i] !== undefined">
      <div class="wordle-char"
        :class="[`wordle-match-${matchResultMatrix[i][j]}`]"
        :style="{'animation-delay': `${j * 0.1}s`}"
        v-for="_, j in wordLength"
        :key="j"
        >{{queries[i][j].toUpperCase()}}</div>
    </template>
    <template v-else-if="queries.length === i">
      <div class="wordle-char" v-for="_, j in wordLength" :key="j">
        {{(lastQuery[j] || '&nbsp;').toUpperCase()}}
      </div>
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

      @mixin wordle-char-revealed($matchType, $color, $textColor) {
        &.wordle-match-#{$matchType} {
          animation: reveal-#{$matchType};
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        @keyframes reveal-#{$matchType} {
          0% {
            background: #eee;
            transform: rotateY(0deg);
          }

          50% {
            background: #eee;
            transform: rotateY(90deg);
          }

          100% {
            background: #{$color};
            transform: rotateY(0deg);
            color: #{$textColor};
          }
        }
      }

      @include wordle-char-revealed('exact', #6eec45, inherit);
      @include wordle-char-revealed('misplaced', #ffee9b, inherit);
      @include wordle-char-revealed('none', #444, #fff);
    }
  }
}

</style>
