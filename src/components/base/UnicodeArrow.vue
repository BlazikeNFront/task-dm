<template>
<div class="select-arrow" >
    <span  
    :class="[
    'select-arrow__arrow',
    direction === 'upwards' ? 'select-arrow__arrow--upwards' : 'select-arrow__arrow--downwards'
    ]">
        &#8249;
    </span>
</div>
</template>
<script setup lang='ts'>
import { defineProps } from 'vue';
defineProps<{
    direction: 'upwards' | 'downwards',
}>()
</script>
<style lang="scss">
.select-arrow {
    width:25px;
    font-size: 25px;
    overflow: hidden;
    &__arrow {
    display: block;
        &--upwards{  
            transform:rotate(90deg);
        }
        &--downwards{   
            padding-bottom:10px; //arrow unicode isnt centered vertically
            transform:rotate(-90deg);
        }
    }
}
</style>