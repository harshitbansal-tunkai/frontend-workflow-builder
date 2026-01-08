export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  label?: string;
  systemPrompt?: string;
  userPrompt?: string;
  model?: string;
  temperature?: number;
  [key: string]: any;
}

export interface WorkflowNode {
  id: string;
  type: string;
  data: NodeData;
  position: Position;
}

export interface EdgeData {
  condition?: string;
  [key: string]: any;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  data?: EdgeData;
}

export interface Workflow {
  name?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface WorkflowRequest {
  workflow: Workflow;
  input: Record<string, any>;
}

export interface WorkflowResponse {
  output: any;
  executionTime?: number;
  status: string;
  [key: string]: any;
}

export interface ReactFlowNode extends WorkflowNode {
  selected?: boolean;
  dragging?: boolean;
}

export interface ReactFlowEdge extends WorkflowEdge {
  selected?: boolean;
  animated?: boolean;
}
