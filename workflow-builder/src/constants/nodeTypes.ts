export interface NodeTypeConfig {
  type: string;
  label: string;
  description: string;
  defaultData: Record<string, any>;
  color: string;
}

export const NODE_TYPES_CONFIG: NodeTypeConfig[] = [
  {
    type: "input",
    label: "Input",
    description: "Starting point of the workflow",
    defaultData: {},
    color: "#10b981",
  },
  {
    type: "prompt",
    label: "Prompt",
    description: "AI prompt execution node",
    defaultData: {
      systemPrompt: "You are a helpful assistant.",
      userPrompt: "Process: {{input}}",
      model: "gpt-4o",
      temperature: 0.7,
    },
    color: "#3b82f6",
  },
  {
    type: "output",
    label: "Output",
    description: "End point of the workflow",
    defaultData: {},
    color: "#ef4444",
  },
];

export const EDGE_TYPES_CONFIG = [
  {
    type: "default",
    label: "Default",
    description: "Standard sequential connection",
  },
  {
    type: "conditional",
    label: "Conditional",
    description: "Conditional branch based on output",
  },
  {
    type: "merge",
    label: "Merge",
    description: "Merge multiple paths",
  },
];

export const DEFAULT_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-3.5-turbo",
  "claude-3-opus",
  "claude-3-sonnet",
];
