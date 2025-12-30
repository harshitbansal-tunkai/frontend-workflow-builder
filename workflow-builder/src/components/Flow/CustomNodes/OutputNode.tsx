import { memo } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

const OutputNode = ({ id, data, selected }: NodeProps) => {
  const { deleteElements } = useReactFlow();

  const label =
    typeof (data as { label?: unknown })?.label === "string"
      ? (data as { label: string }).label
      : "Workflow Output";

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div
      className={`relative px-4 py-3 rounded-lg border-2 shadow-md bg-white min-w-[150px] ${
        selected ? "border-red-500" : "border-red-400"
      }`}
    >
      {/* ❌ Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 text-xs text-gray-400 hover:text-red-500"
        title="Delete node"
      >
        ✕
      </button>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-red-500 !w-3 !h-3"
      />

      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="font-bold text-sm text-gray-700">Output</div>
      </div>

      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
};

export default memo(OutputNode);
