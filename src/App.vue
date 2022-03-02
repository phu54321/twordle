<template>

<div id="app">
  <WordleView :answer="answer" :query="query" :nextQuery="nextQuery" :try-count="6" />
  <KeyboardView :queries="query" :answer="answer" @keydown='onKey'/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WordleView from './components/WordleView.vue'
import KeyboardView from './components/KeyboardView.vue'

import './wordle.scss'

export interface MinimalKeyDownEvent {
  code: string
  key: string
}

export default defineComponent({
  name: 'App',
  data () {
    return {
      query: [] as string[],
      nextQuery: '',
      answer: 'pulse'
    }
  },
  mounted () {
    window.addEventListener('keydown', this.onKey)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.onKey)
  },
  computed: {
    answerLength (): number { return this.answer.length }
  },
  methods: {
    addQuery () {
      this.query.push(this.nextQuery)
      this.nextQuery = ''
    },
    onKey (e: MinimalKeyDownEvent) {
      // Handle backspace
      if (e.code === 'Backspace') {
        if (this.nextQuery.length > 0) {
          this.nextQuery = this.nextQuery.substring(0, this.nextQuery.length - 1)
        }
      } else if (e.code === 'Enter') {
        if (this.nextQuery.length !== this.answerLength) {
          // TODO: add tooltip
          console.log('Bad length')
        }
        // TODO: check if word is in the dictionary
        this.query.push(this.nextQuery)
        this.nextQuery = ''
      } else {
        if (this.nextQuery.length < this.answerLength) {
          this.nextQuery += e.key
        }
      }
    }
  },
  components: {
    WordleView,
    KeyboardView
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.wordle-input {
  margin-top: 3em;
}
</style>
