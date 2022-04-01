<template>
  <div class="h-full w-full overflow-y-auto">
    <div v-if="state.error" class="h-full w-full overflow-y-auto">
      <div class="bg-theme-400 px-3 py-1 text-xl font-bold text-white">
        {{ state.error.kind }}
      </div>
      <pre class="px-3 py-2 text-base" v-html="state.error.message"></pre>
    </div>

    <div
      v-else
      class="flex h-full w-full flex-col overflow-x-auto overflow-y-auto"
    >
      <div
        class="h-full w-full overflow-x-auto overflow-y-auto whitespace-pre-line p-3 font-mono text-sm md:text-base"
        v-html="state.output"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { PlaygroundState as State } from "./playground-state"

defineProps({ state: State })
</script>
