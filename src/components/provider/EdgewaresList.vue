<!-- EdgewaresList.vue (Unchanged, but now receives edgewares from store) -->
<template>
  <div class="space-y-6">
    <EdgewareCard
      v-for="edge in edgewares"
      :key="edge.id"
      :edge="edge"
      @copy-uri="copyToClipboard"
    />
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

defineProps({
  edgewares: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["copy-uri"]);

const copyToClipboard = (uri) => {
  navigator.clipboard.writeText(uri);
};
</script>
