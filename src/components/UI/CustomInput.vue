<template>
  <input type="number" :value="modelValue" @input="updateInput" >
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scope>
  input {
    padding: 5px;
    font-size: 24px;
    border-radius: 15px;
    outline: none;
    border: none
  }

</style>