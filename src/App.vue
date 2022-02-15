<script setup lang="ts">
import { ref, computed } from "vue"
import * as vNG from "v-network-graph"
import data from "./data"

const nodes = {
  mongodb: {
    bindip: "172.16.1.1"
  },
  ran: {
    ngap: "20.20.20.1",
    gtpu: "30.30.30.1",
  },
  amf: {
    sbi: "127.0.0.18",
    ngap: "20.20.20.2",
  },
  smf: {
    sbi: "127.0.0.2",
    pfcp: "10.200.200.1",
  },
  upf: {
    pfcp: "10.200.200.101",
    gtpu: "30.30.30.2",
  },
  nrf: {
    sbi: "127.0.0.10",
  },
  ausf: {
    sbi: "127.0.0.9",
  },
  nssf: {
    sbi: "127.0.0.31",
  },
  udm: {
    sbi: "127.0.0.3",
  },
  udr: {
    sbi: "127.0.0.4",
  },
  pcf: {
    sbi: "127.0.0.7",
  },
}

const name = ref("")

const title = computed(() => {
   return name.value ? data.nodes[name.value].name : ""
})

const configs = vNG.defineConfigs({
  view: {
    layoutHandler: new vNG.GridLayout({ grid: 20 }),
    fit: false,
  },
  node: {
    selectable: true,
    normal: {
      type: "rect",
      width: 48,
      height: 32,
      borderRadius: 8,
      color: "#ff6f00",
    },
    hover: {
      color: "#ff5500",
      width: 64,
      height: 36,
      borderRadius: 8,
    },
    label: {
      fontSize: 16,
      color: "#000000",
      direction: "north",
    },
  },
  edge: {
    normal: {
      width: 2,
      color: "#ff6f00",
      dasharray: "4 6",
      linecap: "round",
    },
    hover: {
      color: "#ff5500",
    },
  },
})

const eventHandlers: vNG.EventHandlers = {
  "node:click": ({ node }) => {
    name.value = node
  },
}
</script>

<template>
  <div class="container">
  <v-network-graph
    :nodes="data.nodes"
    :edges="data.edges"
    :layouts="data.layouts"
    :configs="configs"
    :event-handlers="eventHandlers"
    class="graph"
  >
    <template #edge-label="{ edge, ...slotProps }">
      <v-edge-label
        :text="edge.label"
        align="center"
        vertical-align="above"
        v-bind="slotProps" />
    </template>
  </v-network-graph>
  <div>
    <h2>{{ title }}</h2>
    <div v-for="(v,k) in nodes[name]" :key="k">
      {{ k }} : {{ v }}
    </div>
  </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.graph {
  width: 60vw;
  height: 80vh;
}
</style>
