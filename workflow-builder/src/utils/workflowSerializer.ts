import type { Node, Edge } from "@xyflow/react";
import type {
  WorkflowRequest,
  WorkflowNode,
  WorkflowEdge,
} from "../types/workflow.types";

export const serializeWorkflow = (
  nodes: Node[],
  edges: Edge[],
  inputData: Record<string, any>
): WorkflowRequest => {
  // Convert React Flow nodes to backend format
  const workflowNodes: WorkflowNode[] = nodes.map((node) => ({
    id: node.id,
    type: node.type || "default",
    data: node.data,
    position: node.position,
  }));

  // Convert React Flow edges to backend format
  const workflowEdges: WorkflowEdge[] = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: edge.type || "default",
    data: edge.data,
  }));

  return {
    workflow: {
      name: "workflow_" + Date.now(),
      nodes: workflowNodes,
      edges: workflowEdges,
    },
    input: inputData,
  };
};

export const deserializeWorkflow = (
  workflowData: WorkflowRequest
): { nodes: Node[]; edges: Edge[] } => {
  // Convert backend format to React Flow nodes
  const nodes: Node[] = workflowData.workflow.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }));

  // Convert backend format to React Flow edges
  const edges: Edge[] = workflowData.workflow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: edge.type,
    data: edge.data,
  }));

  return { nodes, edges };
};
