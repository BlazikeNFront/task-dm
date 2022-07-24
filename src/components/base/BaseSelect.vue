<template>
<div class="base-select" ref="select">
    <label 
        :class="{'base-select__label':true,'base-select__label--required':required}">
        {{label}}
    </label>
    <div class="base-select__select" 
        v-bind="$attrs">
        <div 
        @keypress="onSelectKeypress" 
        @click="onSelectClick"  
        :class="{
            'base-select__selected': true,
            'base-select__selected--expanded':isExpanded,
            'base-select__selected--error': (error && !isExpanded),
            'base-select__selected--disabled':disabled
        }"
        tabindex="0"
        >
            <p  :class="{
                'base-select__p':true,
                'base-select__p--disabled': disabled
            }">
            {{ modelValue || placeholder}}
            </p>
            <unicode-arrow :direction="isExpanded?'upwards':'downwards'"/>
        </div>
        <component :is="ordered ?'ol' :'ul'" v-if="isExpanded" class="base-select__options">
            <li 
            v-for="(option,index) in options" :key="index" tabindex="0"
            @click="onOptionClick(option)"
            @keypress="onOptionKeypress($event,option)" 
            :class="{
                'base-select__option':true,
                'base-select__option--active':isOptionActive(option),
            }"
            >   {{option}}
            </li>
        </component>
    </div>
    <p v-if="error && !isExpanded" class="base-select__errorMsg">
        {{error}}
    </p>
</div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    inheritAttrs:false,
})
</script>
<script setup lang='ts'>
import { KEYBOARD_KEYS } from '@/constants/global';
import {withDefaults,defineProps,defineEmits,computed,ref,onMounted,onBeforeUnmount,} from 'vue'
import UnicodeArrow from './UnicodeArrow.vue';
const props = withDefaults(defineProps<{
    modelValue: string,
    options: string[],
    error?: string,
    label?: string,
    placeholder?:string,
    required?: boolean,
    disabled?: boolean,
    ordered?:boolean

}>(), {
    error: '',
    label: 'Select option',
    placeholder:'Click here to select',
    required: false,
    disabled: false,
    ordered:false,
})

 const emits = defineEmits<{
    (e:'update:modelValue',payload:string):void,
    (e:'blur'):void,
 }>()

const select = ref<HTMLDivElement|null>(null)
const isExpanded = ref(false);

const isOptionActive = computed(() => (option: string) => option === props.modelValue)

function closeDropdown(e: Event) {
    if (isExpanded.value && select.value && e.target instanceof Node && !select.value.contains(e.target)) {
        emits('blur')
        isExpanded.value = false;
    }
}
function onSelectClick(e: Event) {
    if (!props.disabled && e.target && e.target instanceof HTMLElement) {
        isExpanded.value = !isExpanded.value
        e.target.focus()
    }
}
function onSelectKeypress(e: KeyboardEvent) {
    if(e.key === KEYBOARD_KEYS.ENTER && !props.disabled)isExpanded.value = !isExpanded.value
}

function onOptionClick(option:string) {
    emits('update:modelValue', option)
    emits('blur')
    isExpanded.value = false; 
}
function onOptionKeypress(e: KeyboardEvent,value:string) {
    if (e.key !== KEYBOARD_KEYS.ENTER)return
    onOptionClick(value)
}
onMounted(() => 
    document.addEventListener('click',closeDropdown)
)
onBeforeUnmount(() => 
    document.removeEventListener('click',closeDropdown)
)

</script>

<style lang="scss">
.base-select {
     @include flexBox(center,center,column);
    height: 100%;
    width:100%;
    padding-bottom: 35px;
    position: relative;
 
    &__label {
        margin:0 0 5px 2px;
        font-size: 14px;
        text-align: left;
        width:inherit;
        &--required::after {
            content:"*"
        }
    }
     &__select {
        position:relative;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    &__p {
        flex:1;
        &--disabled {
            color:grey;
        }
    }
   
    &__selected {
        @include flexBox(center,center,row);
        border:2px solid $grey;
        height: 40px;
        border-radius: 4px;
        user-select: none;
        &--expanded {
            border-color:$blue;
            border-radius:4px 4px 0 0;
        }
        &--error {
            border-color:$red;
        }
        &:focus {
             border: 2px solid $blue;
             outline: none;
        }
        &--disabled {
            background-color:$disabled-input;
            &:focus {
               border:2px solid $grey;  
            }
        }
       
    }
    
    &__options {
       position: absolute;
       top: 100%;
       left: 0;
       right: 0;
       width:inherit;
       background-color: white;
       max-height: 300px;
       overflow-y: auto;
       
    }
    &__option {
        @include flexBox(center,center,row);
        padding-right:25px;
        height:40px;
        border:2px solid $blue;
        border-bottom: none;
        user-select: none;
        &:first-child{
        border-top: none;
        }
        &:last-child{
        border-bottom: 2px solid $blue  ;
        border-radius: 0 0 2px 2px;
        }
        &--active {
            background-color:$select-option-active;
        }
        &:hover {
            background-color:$select-option-hover;
        }
        &:focus {
            background-color:$select-option-hover;
            outline:none;   
        }
    }
   &__errorMsg {
        position: absolute;
        bottom:20px;
        margin:2px 0 0 2px;
        font-weight: bold;
        font-size: 12px;
        color:$red;
        text-align: left;
        width:100%;
   }
}
</style>