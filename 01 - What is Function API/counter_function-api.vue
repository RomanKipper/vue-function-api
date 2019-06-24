<template>
  <div>
    Count is {{ count }}, count * 2 is {{ double }}
    <button @click="increment">+</button>
  </div>
</template>

<script>
  import { value, computed } from 'vue'

  export default {
    setup() {
      const count = value(0)
      const double = computed(() => count.value * 2)
      const increment = () => { count.value++ }
      return {
        count,
        double,
        increment
      }
    }
  }
</script>