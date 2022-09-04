<template>
  <select v-model="modelValue" @change="updateData">
    <slot></slot>
    <option v-for="(option, ind) in options" :value="option.value" :key="ind">{{ option.text }}</option>
  </select>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    modelValue: [String, Number],
    options: [Array]
  },
  methods: {
    updateData(event) {
      this.$emit('update:modelValue', this.modelValue)
    }
  }
}
</script>

<style scope>
  select {
    padding: 5px;
    font-size: 24px;
    border-radius: 15px;
    outline: none
  }
  
  option {
    border-radius: 15px;
    max-height: 201px;
  }
  option:focus {
    height: 20px;
  }
</style>