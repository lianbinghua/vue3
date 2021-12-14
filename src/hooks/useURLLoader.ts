import { ref } from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null)
  const error = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  axios.get(url).then(rawData => {
    loaded.value = true
    loading.value = false
    result.value = rawData.data
  }).catch(e => {
    loading.value = false
    error.value = e
  })
  return {
    result,
    error,
    loaded,
    loading
  }
}
export default useURLLoader
