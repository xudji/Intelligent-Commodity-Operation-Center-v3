<template>
  <CategorySelector></CategorySelector>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Attr",
});
</script>
<script lang="ts" setup>
import CategorySelector from "@/components/CategorySelector/index.vue";
import { ref } from "vue";
</script>

<style scoped></style>