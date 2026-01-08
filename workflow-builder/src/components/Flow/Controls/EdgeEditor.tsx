import { useState, useEffect } from "react";
import type { Edge } from "@xyflow/react";

interface EdgeEditorProps {
  selectedEdge: Edge | null;
  onUpdateEdge: (edgeId: string, data: any) => void;
  onDeleteEdge: (edgeId: string) => void;
  onClose: () => void;
}

const EdgeEditor = ({
  selectedEdge, // ✅ Just destructure normally
  onUpdateEdge, // ✅ Just destructure normally
  onDeleteEdge, // ✅ Just destructure normally
  onClose, // ✅ Just destructure normally
}: EdgeEditorProps) => {
  const [edgeType, setEdgeType] = useState("default");
  const [condition, setCondition] = useState("");

  // ✅ Single useEffect with all logic
  useEffect(() => {
    if (selectedEdge) {
      setEdgeType(selectedEdge.type || "default");

      const condition =
        typeof selectedEdge.data?.condition === "string"
          ? selectedEdge.data.condition
          : "";

      setCondition(condition);
    }
  }, [selectedEdge]);

  if (!selectedEdge) return null;

  const handleSave = () => {
    const newData = {
      ...selectedEdge.data,
      condition: edgeType === "conditional" ? condition : undefined,
    };
    onUpdateEdge(selectedEdge.id, { type: edgeType, data: newData });
    onClose();
  };

  const handleDelete = () => {
    if (confirm("Delete this edge?")) {
      onDeleteEdge(selectedEdge.id);
      onClose();
    }
  };

  return (
    <div className="absolute top-20 right-4 z-10 bg-white rounded-lg shadow-xl p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Edit Edge</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        {/* Edge Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Edge Type
          </label>
          <select
            value={edgeType}
            onChange={(e) => setEdgeType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="conditional">Conditional</option>
          </select>
        </div>

        {/* Condition (only for conditional edges) */}
        {edgeType === "conditional" && (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Condition
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., BILLING, HIGH, etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              This condition will be displayed on the edge
            </p>
          </div>
        )}

        {/* Edge Info */}
        <div className="text-xs text-gray-500">
          <div>From: {selectedEdge.source}</div>
          <div>To: {selectedEdge.target}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EdgeEditor;
