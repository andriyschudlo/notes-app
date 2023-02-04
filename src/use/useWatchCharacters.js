import { watch } from "vue";
export function useWatchCharacters(valueToWatch, textLimit = 50) {
  watch(valueToWatch, (newValue) => {
    if(newValue.length > textLimit)
    alert(`You reach ${textLimit} characters, it is to loong!`)
  })
}