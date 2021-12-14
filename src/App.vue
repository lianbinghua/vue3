<template>
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <h1>x:{{x}} y:{{y}}</h1>
  <p>{{error}}</p>
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose"></modal>
  <button @click="onModalOpen">打开</button>
  <h1 v-if="loading">loading!!!!</h1>
  <suspense>
    <template #default>
      <div>
        <async-show></async-show>
        <dog-show></dog-show>
      </div>
    </template>
    <template #fallback>
      <h1>fallback</h1>
    </template>
  </suspense>
  <div>
    <img style="width:80px;height:80px;" v-if="loaded" :src="result.message">
  </div>
  <button @click="increase">+1</button>
  <button @click="updateGreeting">Update Title</button>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, watch, onErrorCaptured } from 'vue'
import useMousePosition from '@/hooks/useMousePosition'
import useURLLoader from '@/hooks/useURLLoader'
import modal from '@/components/modal.vue'
import asyncShow from '@/components/AsyncShow.vue'
import DogShow from '@/components/DogShow.vue'
interface DataProps {
  count: number
  double: number
  increase: () => void
}
interface DogResult {
  message: string
  status: string
}
export default {
  name: 'about',
  components: {
    modal,
    asyncShow,
    DogShow
  },
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })

    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++
      },
      double: computed(() => data.count * 2)
    })
    const refData = toRefs(data)

    //追踪鼠标
    const { x, y } = useMousePosition()

    //测试loading
    const { loading, loaded, result } = useURLLoader<DogResult>(
      'https://dog.ceo/api/breeds/image/random'
    )
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hello!'
    }
    //watch
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })

    //modal相关
    const modalIsOpen = ref(false)
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    const onModalOpen = () => {
      modalIsOpen.value = true
    }
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      loaded,
      loading,
      result,
      modalIsOpen,
      onModalClose,
      onModalOpen,
      error
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
