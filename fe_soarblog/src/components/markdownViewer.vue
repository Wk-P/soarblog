<template>
    <div v-html="htmlContent"></div>
</template>
<script lang="ts" setup name="markdownEditor">
import { ref, computed } from 'vue';
import MarkdownIt from 'markdown-it';

// Create an instance of MarkdownIt
const md = new MarkdownIt();

// Ref to store the content of the Markdown file
const markdownContent = ref<string>('');

// Function to handle file selection and read content
function fetchMarkdownFile() {
    fetch('/api/').then((response) => {
        if (!response.ok) {
            throw new Error("Response is not OK!");
        } else {
            return response.json;
        }
    }).then((data: any) => {
        markdownContent.value = data;
    });
};

// Compute the HTML content from the Markdown
const htmlContent = computed(() => md.render(markdownContent.value));

// Initialize MarkdownIt with syntax highlighting
</script>
<style scoped></style>