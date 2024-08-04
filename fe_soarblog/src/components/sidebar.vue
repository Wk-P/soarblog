<template>
    <div class="sidebar-container">
        <ul class="sidebar-ul">
            <li v-for="(item, index) in subheadings" :key="index">
                {{ item }}
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts" name="sidebar">
import { ref } from 'vue';
const subheadings = ref<Array<string>>([]);

</script>
<style scoped></style>