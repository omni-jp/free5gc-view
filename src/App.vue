<script setup lang="ts">
import { ref, computed } from "vue"
import NetworkDiagram from "./components/NetworkDiagram.vue"
import data from "./data"

const yamls: {[key: string]: {[key: string]: string}} = {
  mongodb: {
    bindip: "172.16.1.1",
    file: "",
  },
  ran: {
    ngap: "20.20.20.1",
    gtpu: "30.30.30.1",
    file: "",
  },
  amf: {
    sbi: "127.0.0.18",
    ngap: "20.20.20.2",
    file: "amfcfg.yaml",
  },
  smf: {
    sbi: "127.0.0.2",
    pfcp: "10.200.200.1",
    file: "smfcfg.yaml",
  },
  upf: {
    pfcp: "10.200.200.101",
    gtpu: "30.30.30.2",
    file: "upfcfg.yaml",
  },
  nrf: {
    sbi: "127.0.0.10",
    file: "nrfcfg.yaml",
  },
  ausf: {
    sbi: "127.0.0.9",
    file: "ausfcfg.yaml",
  },
  nssf: {
    sbi: "127.0.0.31",
    file: "nssfcfg.yaml",
  },
  udm: {
    sbi: "127.0.0.3",
    file: "udmcfg.yaml",
  },
  udr: {
    sbi: "127.0.0.4",
    file: "udrcfg.yaml",
  },
  pcf: {
    sbi: "127.0.0.7",
    file: "pcfcfg.yaml",
  },
  webconsole: {
    file: "webuicfg.yaml",
  },
}

const name = ref("")
const params = ref({})

const fetchConfig = async (name: string) => {
  const url = "./configs/" + yamls[name].file
  try {
    const rsp = await fetch(url)
    if (!rsp.ok) {
      throw new Error(`status ${rsp.status}`)
    }
    params.value = await rsp.json()
  } catch (err) {
    params.value = {}
  }
}

const title = computed(() => {
   return name.value ? data.nodes[name.value].name : ""
})

//const params = computed(() => {
//   return name.value ? yamls[name.value] : {}
//})

const nodeSelected = (node: string) => {
  name.value = node
  if (node !== "") {
    fetchConfig(node)
  } else {
    params.value = {}
  }
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
      <pre class="params">{{ params }}</pre>
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
.params {
  max-width: 40vw;
  white-space: pre-wrap;
}
</style>
