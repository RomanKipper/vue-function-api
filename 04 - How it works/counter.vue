<template>
  <div>
    <span>count is {{ count }}</span>
    <span>plusOne is {{ plusOne }}</span>
    <button @click="increment">count++</button>
  </div>
</template>

<script>
import { value, computed, watch, onMounted } from 'vue';

export default {
  setup() {
    // reactive state
    const count = value(0);
    // computed state
    const plusOne = computed(() => count.value + 1);
    // method
    const increment = () => { count.value++ };
    // watch
    watch(() => count.value * 2, val => {
      console.log(`count * 2 is ${val}`);
    });
    // lifecycle
    onMounted(() => {
      console.log(`mounted`);
    });
    // expose bindings on render context
    return {
      count,
      plusOne,
      increment,
    };
  },
};
</script>