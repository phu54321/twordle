<script setup lang="ts">

import { onBeforeUnmount, onMounted, ref } from 'vue'
import WordleView from './components/WordleView.vue'
import VirtualKeyboard from './components/VirtualKeyboard.vue'
import { getWordsByLength } from './dict'

const tryCount = 6
const queries = ref([] as string[])
const lastQuery = ref([] as string[])
const answer = ref('pulse')

function onKeyClick (ch: string) {
  if (ch === 'enter') {
    if (lastQuery.value.length === answer.value.length) {
      const lastQueryString = lastQuery.value.join('')
      console.log(lastQueryString, lastQueryString.length)

      const words = getWordsByLength(answer.value.length)
      if (words.indexOf(lastQueryString) === -1) {
        alert('Not a dictionary word!')
        return
      }

      queries.value.push(lastQueryString)
      if (lastQueryString === answer.value) {
        alert('Correct!')
      } else {
        if (queries.value.length === tryCount) {
          alert('Fail')
        }
      }
      lastQuery.value.length = 0
    }
    // TODO: process
  } else if (ch === 'backspace') {
    if (lastQuery.value.length > 0) {
      lastQuery.value.pop()
    }
  } else {
    if (lastQuery.value.length < answer.value.length) {
      lastQuery.value.push(ch)
    }
  }
  console.log(lastQuery.value)
}

function keypressToClick (ev: KeyboardEvent) {
  const { key } = ev

  if (/^[a-z]$/.test(key)) {
    onKeyClick(key)
  } else if (key === 'Enter') {
    onKeyClick('enter')
  } else if (key === 'Backspace') {
    onKeyClick('backspace')
  }
}

onMounted(() => {
  window.addEventListener('keydown', keypressToClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keypressToClick)
})

</script>

<template>
<WordleView :answer="answer" :queries="queries" :try-count="tryCount" :last-query="lastQuery" />
<VirtualKeyboard :answer="answer" :queries="queries" @keyClick='onKeyClick' />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
