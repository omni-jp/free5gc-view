<script setup lang="ts">
import { Nodes, Edges, Layouts, UserConfigs, EventHandlers } from "v-network-graph"

interface Props {
  nodes: Nodes,
  edges: Edges,
  layouts: Layouts,
  configs: UserConfigs,
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
    <template #edge-label="{ edge, scale, ...slotProps }">
      <v-edge-label
        :text="edge.label"
        align="center"
        vertical-align="above"
        v-bind="slotProps" />
      <v-edge-label
        :text="edge.sourceIp"
        align="source"
        vertical-align="above"
        v-bind="slotProps"
        fill="#ff5500"
        :font-size="10 * scale" />
      <v-edge-label
        :text="edge.targetIp"
        align="target"
        vertical-align="below"
        v-bind="slotProps"
        fill="#ff5500"
        :font-size="10 * scale" />
    </template>
  </v-network-graph>
</template>

<style scoped>
</style>
