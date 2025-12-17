// src/App.tsx
import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./components/Flow/CustomNodes/index.ts";
import NodePanel from "./components/Flow/NodePanel.tsx";
import NodeEditor from "./components/Flow/Controls/NodeEditor";
import { NODE_TYPES_CONFIG } from "./constants/nodeTypes";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const nodeIdCounter = useRef(1);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect: OnConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, type: "default" }, eds));
  }, []);

  // Add new node
  const handleAddNode = useCallback((type: string) => {
    const nodeConfig = NODE_TYPES_CONFIG.find((n) => n.type === type);
    if (!nodeConfig) return;

    const newNode: Node = {
      id: `${type}_${nodeIdCounter.current++}`,
      type: type,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: { ...nodeConfig.defaultData },
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  // Update node data
  const handleUpdateNode = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  }, []);

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Close editor
  const handleCloseEditor = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {/* Node Panel */}
      <NodePanel onAddNode={handleAddNode} />

      {/* Node Editor */}
      <NodeEditor
        selectedNode={selectedNode}
        onUpdateNode={handleUpdateNode}
        onClose={handleCloseEditor}
      />
    </div>
  );
}
