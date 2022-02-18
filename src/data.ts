import { Nodes, Edges, Layouts, defineConfigs, GridLayout } from "v-network-graph"

const nodes: Nodes = {
  ue: { name: "UE", config: "" },
  ran: { name: "RAN", config: "" },
  dn: { name: "DN", config: "" },
  amf: { name: "AMF", config: "amfcfg.yaml", params: {} },
  smf: { name: "SMF", config: "smfcfg.yaml", params: {} },
  upf: { name: "UPF", config: "upfcfg.yaml", params: {} },
  nrf: { name: "NRF", config: "nrfcfg.yaml", params: {} },
  pcf: { name: "PCF", config: "pcfcfg.yaml", params: {} },
  ausf: { name: "AUSF", config: "ausfcfg.yaml", params: {} },
  nssf: { name: "NSSF", config: "nssfcfg.yaml", params: {} },
  udr: { name: "UDR", config: "udrcfg.yaml", params: {} },
  udm: { name: "UDM", config: "udmcfg.yaml", params: {} },
  webconsole: { name: "webconsole", config: "webuicfg.yaml", params: {} },
  mongodb: { name: "MongoDB", config: "" },
}

const edges: Edges = {
  air: { source: "ue", target: "ran", sourceIp: "", targetIp: "" },
  n1: { source: "ue", target: "amf", label: "N1", sourceIp: "", targetIp: "" },
  n2: { source: "ran", target: "amf", label: "N2", sourceIp: "", targetIp: "" },
  n3: { source: "ran", target: "upf", label: "N3", sourceIp: "", targetIp: "" },
  n4: { source: "smf", target: "upf", label: "N4", sourceIp: "", targetIp: "" },
  // n5: { source "pcf", target: "af", label: "N5" },
  n6: { source: "upf", target: "dn", label: "N6", sourceIp: "", targetIp: "" },
  n7: { source: "smf", target: "pcf", label: "N7", sourceIp: "", targetIp: "" },
  n8: { source: "amf", target: "udm", label: "N8", sourceIp: "", targetIp: "" },
  // n9:
  n10: { source: "pcf", target: "udm", label: "N10", sourceIp: "", targetIp: "" },
  n11: { source: "amf", target: "smf", label: "N11", sourceIp: "", targetIp: "" },
  n12: { source: "amf", target: "ausf", label: "N12", sourceIp: "", targetIp: "" },
  n15: { source: "amf", target: "pcf", label: "N15", sourceIp: "", targetIp: "" },
  n22: { source: "amf", target: "nssf", label: "N22", sourceIp: "", targetIp: "" },
  edge9: { source: "udm", target: "udr", sourceIp: "", targetIp: "" },
  edge10: { source: "nrf", target: "mongodb", sourceIp: "", targetIp: "" },
  edge11: { source: "pcf", target: "mongodb", sourceIp: "", targetIp: "" },
  edge12: { source: "udr", target: "mongodb", sourceIp: "", targetIp: "" },
  edge13: { source: "webconsole", target: "mongodb", sourceIp: "", targetIp: "" },
}

const layouts: Layouts = {
  nodes: {
    ue: { x: 0, y: 400 },
    ran: { x:160, y: 400 },
    dn: { x: 480, y: 400 },
    amf: { x: 240, y: 320 },
    smf: { x: 400, y: 320 },
    upf: { x: 320, y: 400 },
    nrf: { x: 480, y: 80 },
    pcf: { x: 400, y: 160 },
    ausf: { x: 240, y: 160 },
    nssf: { x: 160, y: 160 },
    udr: { x: 320, y: 80 },
    udm: { x: 320, y: 160 },
    webconsole: { x: 400, y: 0 },
    mongodb: { x: 400, y: 80 },
  },
}

const configs = defineConfigs({
  view: {
    layoutHandler: new GridLayout({ grid: 20 }),
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

export default {
  nodes,
  edges,
  layouts,
  configs,
}
