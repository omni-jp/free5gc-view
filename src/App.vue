<script setup lang="ts">
import { ref, computed } from "vue"
import NetworkDiagram from "./components/NetworkDiagram.vue"
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

const params = computed(() => {
   return name.value ? data.nodes[name.value] : {}
})

const nodeSelected = (node: string) => {
    name.value = node
}
</script>

<template>
  <div class="container">
    <network-diagram
      :nodes="data.nodes"
      :edges="data.edges"
      :layouts="data.layouts"
      :configs="data.configs"
      @selected="nodeSelected"
      class="diagram"
    />
    <div>
      <h2>{{ title }}</h2>
      <div v-for="(v,k) in params" :key="k">
        {{ k }} : {{ v }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.diagram {
  width: 60vw;
  height: 80vh;
}
</style>
