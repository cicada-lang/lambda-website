<template>
  <PageLayout>
    <div class="flex h-full flex-col">
      <PlaygroundHeader :state="state" />
      <div class="flex h-full flex-col overflow-y-auto md:flex-row">
        <PlaygroundEditor
          class="shrink grow md:w-1/2 md:resize-x"
          style="min-height: 30rem"
          :state="state"
        />
        <PlaygroundOutput
          class="shrink grow border-l border-theme-300 md:w-1/2"
          :state="state"
        />
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { nextTick, watch, reactive, onMounted, onErrorCaptured } from "vue"
import { useRouter, useRoute } from "vue-router"
import { PlaygroundState as State } from "./playground-state"
import debounce from "lodash/debounce"
import { Base64 } from "js-base64"

import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import PlaygroundHeader from "./PlaygroundHeader.vue"
import PlaygroundOutput from "./PlaygroundOutput.vue"
import PlaygroundEditor from "./PlaygroundEditor.vue"

defineProps({ encoded: String })

const router = useRouter()
const route = useRoute()

const state = reactive(new State())

onErrorCaptured((error, component, info) => {
  state.catchError(error)
  return false
})

watch(
  route,
  () => {
    state.text = Base64.decode(route.params.encoded)
  },
  { immediate: true }
)

watch(
  () => state.text,
  debounce(async (text) => {
    const path = `/playground/${Base64.encodeURI(text)}`
    router.replace({ path })
    const href = window.location.origin + path
    await state.refresh(href)
  }, 300),
  { immediate: true }
)
</script>
