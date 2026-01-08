import { useState, useEffect } from "react";
import type { Node } from "@xyflow/react";
import { DEFAULT_MODELS } from "../../../constants/nodeTypes";

interface NodeEditorProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
  onClose: () => void;
}

const NodeEditor = ({
  selectedNode,
  onUpdateNode,
  onClose,
}: NodeEditorProps) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data || {});
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateNode(selectedNode.id, formData);
    onClose();
  };

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-xl p-4 w-80 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Edit Node</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        {/* Node Type Display */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Node Type
          </label>
          <div className="px-3 py-2 bg-gray-100 rounded text-sm text-gray-700">
            {selectedNode.type}
          </div>
        </div>

        {/* Label */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Label
          </label>
          <input
            type="text"
            value={formData.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Node label"
          />
        </div>

        {/* Prompt Node specific fields */}
        {selectedNode.type === "prompt" && (
          <>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                System Prompt
              </label>
              <textarea
                value={formData.systemPrompt || ""}
                onChange={(e) => handleChange("systemPrompt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={3}
                placeholder="System instructions..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                User Prompt
              </label>
              <textarea
                value={formData.userPrompt || ""}
                onChange={(e) => handleChange("userPrompt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={3}
                placeholder="User message with {{variables}}..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Model
              </label>
              <select
                value={formData.model || "gpt-4o"}
                onChange={(e) => handleChange("model", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DEFAULT_MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Temperature: {formData.temperature || 0.7}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature || 0.7}
                onChange={(e) =>
                  handleChange("temperature", parseFloat(e.target.value))
                }
                className="w-full"
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NodeEditor;
