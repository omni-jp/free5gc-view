<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue"
import NetworkDiagram from "./components/NetworkDiagram.vue"
import data from "./data"

const name = ref("")
const params = ref({})
const status = ref("")

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

const verifyNrfUri = (params: any, scheme: string, host: string, port: string) => {
  const uri = params?.configuration?.nrfUri
  if (!uri) {
    return false
  }
  const [gotScheme, r] = uri.split("://")
  const [gotHost, gotPort] = r.split(":")
  if (gotScheme != scheme) {
    return false
  }
  if (gotHost != host) {
    return false
  }
  if (gotPort != port) {
    return false
  }
  return true
}

const verifyConfigs = () => {
  const [scheme, host, port] = getNrfUri(data.nodes.nrf.params)
  const r = verifyNrfUri(data.nodes.amf.params, scheme, host, port)
  status.value = (r) ? "OK" : "NG"
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
  <div class="status">
    <button @click="verifyConfigs">verify</button>
    {{ status }}
  </div>
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
