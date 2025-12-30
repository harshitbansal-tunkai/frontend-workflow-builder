import { memo } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

const PromptNode = ({ id, data, selected }: NodeProps) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
  const label =
    typeof (data as { label?: unknown })?.label === "string"
      ? (data as { label: string }).label
      : undefined;

  const systemPrompt =
    typeof (data as { systemPrompt?: unknown })?.systemPrompt === "string"
      ? (data as { systemPrompt: string }).systemPrompt
      : undefined;

  const model =
    typeof (data as { model?: unknown })?.model === "string"
      ? (data as { model: string }).model
      : undefined;

  const displayText =
    label ??
    (systemPrompt ? `${systemPrompt.slice(0, 40)}...` : "AI Prompt Node");

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 shadow-md bg-white min-w-[200px] max-w-[250px] ${
        selected ? "border-blue-500" : "border-blue-400"
      }`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 text-xs text-gray-400 hover:text-red-500"
        title="Delete node"
      >
        ✕
      </button>
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-blue-500 !w-3 !h-3"
      />

      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-blue-500" />
        <div className="font-bold text-sm text-gray-700">Prompt</div>
      </div>

      {/* ✅ Safe JSX text */}
      <div className="text-xs text-gray-600 mb-2">{displayText}</div>

      {model && <div className="text-xs text-gray-400 font-mono">{model}</div>}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(PromptNode);
