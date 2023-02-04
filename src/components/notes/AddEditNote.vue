<template>
  <div :class="['card', 'p-4', ' mb-5', `has-background-${bgColor}`]">
    <label
      v-if="label"
      :class="labelClass"
    >
    {{ label }}
      </label>
      <div class="field">
        <div class="control">
          <textarea
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="textarea"
            :placeholder="placeholder"
            ref="textareaRef"
            v-autofocus
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons" />
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus.js'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder:{
    type: String,
    required: false,
    default: 'textarea'
  },
  bgColor: {
    type: String,
    required: false,
    default: 'success-dark'
  },
  label: {
    type: String,
    required: false
  },
  labelClass: {
    type: String,
    required: false,
    default: 'has-text-white title is-5'
  }
})

const emits = defineEmits(['update:modelValue'])

const textareaRef = ref(null);
const focusTexarea = () => textareaRef.value.focus()
defineExpose({
  focusTexarea
})

</script>

<style scoped>

</style>