import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

const InputNode = ({ data, selected }: NodeProps) => {
  const label =
    typeof (data as { label?: unknown })?.label === "string"
      ? (data as { label: string }).label
      : "Workflow Input";

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 shadow-md bg-white min-w-[150px] ${
        selected ? "border-green-500" : "border-green-400"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="font-bold text-sm text-gray-700">Input</div>
      </div>

      {/* ✅ Safe ReactNode */}
      <div className="text-xs text-gray-500">{label}</div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(InputNode);
