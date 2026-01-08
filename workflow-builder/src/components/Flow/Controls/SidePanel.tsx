import { useState } from "react";
import type { Node, Edge } from "@xyflow/react";
import { NODE_TYPES_CONFIG } from "../../../constants/nodeTypes";
import { executeWorkflow } from "../../../services/api";
import { serializeWorkflow } from "../../../utils/workflowSerializer";
import type { WorkflowResponse } from "../../../types/workflow.types";

interface SidePanelProps {
  nodes: Node[];
  edges: Edge[];
  onAddNode: (type: string) => void;
}

const SidePanel = ({ nodes, edges, onAddNode }: SidePanelProps) => {
  const [inputJson, setInputJson] = useState(
    '{\n  "message": "Hello world"\n}'
  );
  const [output, setOutput] = useState<WorkflowResponse | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    setIsExecuting(true);
    setError(null);
    setOutput(null);

    try {
      const inputData = JSON.parse(inputJson);
      const workflowRequest = serializeWorkflow(nodes, edges, inputData);
      const result = await executeWorkflow(workflowRequest);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div
      className="absolute top-4 left-4 z-10 w-72 bg-white rounded-xl shadow-xl border"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h2 className="font-bold text-gray-800 text-lg">Workflow Panel</h2>
      </div>

      {/* ADD NODES */}
      <div className="px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-700 mb-2">➕ Add Nodes</h3>

        <div className="space-y-2">
          {NODE_TYPES_CONFIG.map((node) => (
            <button
              key={node.type}
              onClick={() => onAddNode(node.type)}
              className="w-full text-left px-3 py-2 rounded-lg border hover:shadow-sm transition"
              style={{
                borderColor: node.color,
                backgroundColor: `${node.color}10`,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-sm font-semibold">{node.label}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{node.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* EXECUTE WORKFLOW */}
      <div className="px-4 py-3">
        <h3 className="font-semibold text-gray-700 mb-2">▶ Execute Workflow</h3>

        <textarea
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          rows={5}
          className="w-full border rounded p-2 text-xs font-mono focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isExecuting ? "Executing..." : "Execute"}
        </button>

        {error && (
          <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {output && (
          <pre className="mt-2 text-xs bg-gray-50 border rounded p-2 max-h-40 overflow-y-auto">
            {JSON.stringify(output, null, 2)}
          </pre>
        )}

        <div className="flex justify-between text-xs text-gray-600 pt-2 border-t mt-2">
          <span>Nodes: {nodes.length}</span>
          <span>Edges: {edges.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
