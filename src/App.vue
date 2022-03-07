<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue"
import NetworkDiagram from "./components/NetworkDiagram.vue"
import data from "./data"

const name = ref("")
const params = ref({})
const errors = ref([])

const updateIp = (node: string) => {
  const cfg = data.nodes[node].params?.configuration
  if (!cfg) {
    return
  }
  const ip = cfg?.sbi?.registerIPv4
  switch (node) {
  case "amf":
    if (cfg.ngapIpList) {
      for (const ip of cfg.ngapIpList) {
        data.edges.n2.targetIp = ip
      }
    }
    break
  case "smf":
    data.edges.n11.targetIp = ip
    data.edges.n4.sourceIp = cfg?.pfcp?.addr
    break
  case "upf":
    if (cfg.gtpu) {
      for (const gtpu of cfg.gtpu) {
        data.edges.n3.targetIp = gtpu.addr
      }
    }
    if (cfg.pfcp) {
      for (const pfcp of cfg.pfcp) {
        data.edges.n4.targetIp = pfcp.addr
      }
    }
    break
  case "pcf":
    data.edges.n7.targetIp = ip
    data.edges.n10.targetIp = ip
    data.edges.n15.targetIp = ip
    break
  case "ausf":
    data.edges.n12.targetIp = ip
    break
  case "nssf":
    data.edges.n22.targetIp = ip
    break
  case "udm":
    data.edges.n8.targetIp = ip
    break
  }
}

const fetchConfig = async (name: string) => {
  if (data.nodes[name].config === "") {
    return
  }
  const url = "./configs/" + data.nodes[name].config
  try {
    const rsp = await fetch(url)
    if (!rsp.ok) {
      throw new Error(`status ${rsp.status}`)
    }
    params.value = await rsp.json()
    data.nodes[name].params = params.value
    updateIp(name)
  } catch (err) {
    params.value = {}
  }
}

const getNrfUri = (params: any) => {
  const sbi = params?.configuration?.sbi
  if (!sbi) {
    return ["", "", ""]
  }
  const {scheme, registerIPv4, port} = sbi
  return [scheme, registerIPv4, port]
}

const title = computed(() => {
  return name.value ? data.nodes[name.value].name : ""
})

const verifyNrfUri = (node: string, scheme: string, ip: string, port: string) => {
  const params = data.nodes[node].params
  const uri = params?.configuration?.nrfUri
  if (!uri) {
    return
  }
  const [gotScheme, r] = uri.split("://")
  const [gotIp, gotPort] = r.split(":")
  if (gotScheme != scheme) {
    errors.value.push(`${node}: unexpected nrfUri scheme: want ${scheme}; but got ${gotScheme}`)
  }
  if (gotIp != ip) {
    errors.value.push(`${node}: unexpected nrfUri ip: want ${ip}; but got ${gotIp}`)
  }
  if (gotPort != port) {
    errors.value.push(`${node}: unexpected nrfUri port: want ${port}; but got ${port}`)
  }
  console.log(`${node} OK`)
}

const verifyConfigs = () => {
  errors.value = []
  const [scheme, host, port] = getNrfUri(data.nodes.nrf.params)
  verifyNrfUri("amf", scheme, host, port)
  verifyNrfUri("smf", scheme, host, port)
  verifyNrfUri("ausf", scheme, host, port)
  verifyNrfUri("nssf", scheme, host, port)
  verifyNrfUri("pcf", scheme, host, port)
  verifyNrfUri("udm", scheme, host, port)
  verifyNrfUri("udr", scheme, host, port)
}

const nodeSelected = (node: string) => {
  name.value = node
  if (node !== "") {
    fetchConfig(node)
  } else {
    params.value = {}
  }
}

onMounted(() => {
  for (const node in data.nodes) {
    fetchConfig(node)
  }
})
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
    <div class="sub">
      <h2>{{ title }}</h2>
      <pre class="params">{{ params }}</pre>
    </div>
    <div class="status">
      <button @click="verifyConfigs">verify</button>
      <ul v-if="errors.length > 0">
        <li v-for="error in errors" :key="error" class="error">{{ error }}</li>
      </ul>
      <div v-else>
        OK
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-gap: 5px;
  grid-template-rows: 60vh auto;
  grid-template-columns: 60vw calc(40vw - 20px);
  grid-template-areas:
    "diagram sub"
    "status sub";
}
.diagram {
  grid-area: diagram;
}
.sub {
  grid-area: sub;
}
.params {
  overflow-x: scroll;
  white-space: pre-wrap;
}
.status {
  grid-area: status;
}
.error {
  color: #ff3333;
}
</style>
