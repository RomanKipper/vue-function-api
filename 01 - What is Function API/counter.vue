<template>
  <div>
    Count is {{ count }}, count * 2 is {{ double }}
    <button @click="increment">+</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        this.count++
      }
    },
    computed: {
      double() {
        return this.count * 2
      }
    }
  }
</script>