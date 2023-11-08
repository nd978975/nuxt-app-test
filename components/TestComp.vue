<script setup>
defineProps({
  lable: String,
  modelValue: [String, Number],
});

const arrayInput = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4}
]
</script>

<template>
  <!-- <input
    :value="modelValue"
    type="text" 
    class="form-control mb-4" 
    :placeholder="lable"
    @input="$emit('update:modelValue', $event.target.value)"
  > -->

  <input v-for="item in arrayInput"
    :key="item"
    type="checkbox"
    :value="item.id"
    :modelValue="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
  />
</template>
