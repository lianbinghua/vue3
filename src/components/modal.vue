<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h1>
        <slot>this is modal</slot>
      </h1>
      <button @click="buttonClick">关闭</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isOpen: Boolean
  },
  emits: {
    'close-modal': null
  },
  setup(props, context) {
    const buttonClick = function() {
      context.emit('close-modal')
    }
    return {
      buttonClick
    }
  }
})
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: #fff;
}
</style>


