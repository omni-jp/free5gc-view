<script setup lang="ts">
import { Nodes, Edges, Layouts, Configs, EventHandlers } from "v-network-graph"

interface Props {
  nodes: Nodes,
  edges: Edges,
  layouts: Layouts,
  configs: Configs,
}

interface Emits {
  (e: "selected", value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const eventHandlers: EventHandlers = {
  "node:click": ({ node }) => {
    emit("selected", node)
  },
}

</script>

<template>
  <v-network-graph
    :nodes="nodes"
    :edges="edges"
    :layouts="layouts"
    :configs="configs"
    :event-handlers="eventHandlers"
  >
    <template #edge-label="{ edge, ...slotProps }">
      <v-edge-label
        :text="edge.label"
        align="center"
        vertical-align="above"
        v-bind="slotProps" />
    </template>
  </v-network-graph>
</template>

<style scoped>
</style>
