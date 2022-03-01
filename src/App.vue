<template>
  <WordleView answer="pulse" :query="query" :try-count="6" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WordleView from './components/WordleView.vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      query: [
        'apple',
        'crane',
        'delta'
      ]
    }
  },
  components: {
    WordleView
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
</style>
