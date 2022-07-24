<template>
<div class="base-input"  >
<label :class="{
    'base-input__label':true,
    'base-input__label--required':required
}" v-bind="labelAttrs">{{label}}</label>
<input 
    :class="{
    'base-input__input':true,
    'base-input__input--error': error,
    'base-input__input--disabled':disabled
    }"
    :value="modelValue" 
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
    v-bind="$attrs"
    /> 
    <p v-if="error" class="base-input__errorMsg">
     {{error}}
    </p>   
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
     inheritAttrs:false,
})
</script>
<script setup lang='ts'>
import { withDefaults,defineProps,defineEmits,} from 'vue'
withDefaults(defineProps<{
    modelValue: string,
    error?:string,
    disabled?:boolean,
    label?: string,
    placeholder?:string
    labelAttrs?: Record<'string', unknown>,
    required?:boolean,
}>(), {
    error:'',
    disabled: false,
    label: 'Type data',
    placeholder:'',
    required:false,
})

const emit = defineEmits<{
   (e: "update:modelValue", value: string): void;
}>()
function onInput(event:Event) {
    const target =  event.target as HTMLInputElement
    emit('update:modelValue',target.value)
}

</script>
<style lang="scss" scoped>
.base-input {
    @include flexBox(flex-start,center,column);
    position: relative;
    text-align: left;
    width:100%;
    padding-bottom: 35px;
    &__label {
        margin:0 0 5px 2px;
        font-size: 14px;
        &--required::after {
            content:"*"
        }
    }
    &__input {
    width:inherit;
    display: block;
    padding:10px;
    border:2px solid $grey;
    border-radius: 4px;
    &:focus {
        border: 2px solid $blue;
    }
    &--error {
        border-color:$red;
    }
    &--disabled {
        background-color:$disabled-input;
    }
    }
    &__errorMsg {
        position: absolute;
        bottom:20px;
        margin:2px 0 0 2px;
        font-weight: bold;
        font-size: 12px;
        color:$red;
        
    }
}
</style>