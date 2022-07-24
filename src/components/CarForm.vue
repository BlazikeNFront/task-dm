<template>
  <form class="form" @submit.prevent="onFormSubmit">
    <BaseInput 
      v-model="formInputs.name.value"
      :error="formInputs.name.error"
      @blur="validateValue('name')"  
      maxlength="15" 
      required  
    />
    <base-select  
      v-model="formInputs.brand.value" 
      @blur="validateValue('brand')" 
      :options="formInputs.brand.options!"   
      :error="formInputs.brand.error" 
      required 
    />
    <button 
    :class="{'button':true,'button--disabled':!canSubmit}" 
    :disabled="!canSubmit">
    Submit
    </button>
    <required-data-info style='align-self: flex-start;'/>
  </form>
</template>

<script setup lang="ts">
import { reactive,computed} from 'vue';
import BaseInput from './base/BaseInput.vue';
import { FormRules } from '@/helpers/FormRules';
import BaseSelect from './base/BaseSelect.vue';
import RequiredDataInfo from './base/RequiredDataInfo.vue';

const formInputs = reactive({
  name: {
    value: '',
    rules: [
    FormRules.maxLength(15),
    FormRules.minLength(3),
    ],
    error:'',
  },
  brand: {
    value: '',
    options: ['Audi', 'Mazda', 'Seat', 'Mercedes', 'Saab', 'Opel'],
    rules: [FormRules.required],
    error:'',
  }
})

function validateValue(formInputsKey: keyof typeof formInputs,editErrorMessages=true) {
  const { rules, value } = formInputs[formInputsKey]
  
  if (rules?.length && !rules.every(({rule,message}) => {
    if (rule(value)) return true
    if (editErrorMessages) formInputs[formInputsKey].error = message
    return false
  })) return false
    
    if(editErrorMessages)formInputs[formInputsKey].error = ''
    return true
}
const canSubmit = computed(() => {
  return validateValue('name',false) && validateValue('brand',false)
})
function onFormSubmit() {
  console.log('Submitted')
}
</script>

<style  lang="scss">
.html {
  box-sizing: border-box;
  font-size: 16px;
  
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}
.form {
  @include flexBox(center,center,column);
  margin:0 auto;
  padding:30px;
  width:clamp(300px,100%,600px);
}
.button {
border:none;
padding:10px;
border-radius: 5px;
background-color: $blue;
color:white;

cursor: pointer;
 &--disabled {
  background-color:grey;
  cursor:not-allowed;
 }
}
</style>
