import { Nodes, Edges, Layouts } from "v-network-graph"

const nodes: Nodes = {
  ue: { name: "UE" },
  ran: { name: "RAN" },
  dn: { name: "DN" },
  amf: { name: "AMF" },
  smf: { name: "SMF" },
  upf: { name: "UPF" },
  nrf: { name: "NRF" },
  pcf: { name: "PCF" },
  ausf: { name: "AUSF" },
  nssf: { name: "NSSF" },
  udr: { name: "UDR" },
  udm: { name: "UDM" },
  webconsole: { name: "webconsole" },
  mongodb: { name: "MongoDB" },
}

const edges: Edges = {
  air: { source: "ue", target: "ran" },
  n1: { source: "ue", target: "amf", label: "N1" },
  n2: { source: "ran", target: "amf", label: "N2" },
  n3: { source: "ran", target: "upf", label: "N3" },
  n4: { source: "smf", target: "upf", label: "N4" },
  // n5: { source "pcf", target: "af", label: "N5" },
  n6: { source: "upf", target: "dn", label: "N6" },
  n7: { source: "smf", target: "pcf", label: "N7" },
  n8: { source: "amf", target: "udm", label: "N8" },
  // n9:
  n10: { source: "pcf", target: "udm", label: "N10" },
  n11: { source: "amf", target: "smf", label: "N11" },
  n12: { source: "amf", target: "ausf", label: "N12" },
  n15: { source: "amf", target: "pcf", label: "N15" },
  n22: { source: "amf", target: "nssf", label: "N22" },
  edge9: { source: "udm", target: "udr" },
  edge10: { source: "nrf", target: "mongodb" },
  edge11: { source: "pcf", target: "mongodb" },
  edge12: { source: "udr", target: "mongodb" },
  edge13: { source: "webconsole", target: "mongodb" },
}

const layouts: Layouts = {
  nodes: {
    ue: { x: 0, y: 400 },
    ran: { x: 80, y: 400 },
    dn: { x: 400, y: 400 },
    amf: { x: 160, y: 320 },
    smf: { x: 240, y: 320 },
    upf: { x: 160, y: 400 },
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

export default {
  nodes,
  edges,
  layouts,
}
