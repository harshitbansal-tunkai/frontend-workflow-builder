// src/components/Flow/NodePanel.tsx
import { NODE_TYPES_CONFIG } from "../../constants/nodeTypes";

interface NodePanelProps {
  onAddNode: (type: string) => void;
}

const NodePanel = ({ onAddNode }: NodePanelProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="font-bold text-lg mb-3 text-gray-800">Add Nodes</h3>
      <div className="space-y-2">
        {NODE_TYPES_CONFIG.map((nodeConfig) => (
          <button
            key={nodeConfig.type}
            onClick={() => onAddNode(nodeConfig.type)}
            className="w-full text-left px-4 py-3 rounded-lg border-2 hover:shadow-md transition-all"
            style={{
              borderColor: nodeConfig.color,
              backgroundColor: `${nodeConfig.color}10`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: nodeConfig.color }}
              ></div>
              <span className="font-semibold text-sm text-gray-700">
                {nodeConfig.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {nodeConfig.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Click a node type to add it to the canvas
        </p>
      </div>
    </div>
  );
};

export default NodePanel;
