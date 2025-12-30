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

import { nodeTypes } from "./components/Flow/CustomNodes";
import { edgeTypes } from "./components/Flow/CustomEdges";
import NodeEditor from "./components/Flow/Controls/NodeEditor";
import EdgeEditor from "./components/Flow/Controls/EdgeEditor";
import SidePanel from "./components/Flow/Controls/SidePanel";
import { NODE_TYPES_CONFIG } from "./constants/nodeTypes";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const nodeIdCounter = useRef(1);
  const edgeIdCounter = useRef(1);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect: OnConnect = useCallback((connection: Connection) => {
    const newEdge: Edge = {
      ...connection,
      id: `e${edgeIdCounter.current++}`,
      type: "default",
    };
    setEdges((eds) => addEdge(newEdge, eds));
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

  // Update edge
  const handleUpdateEdge = useCallback(
    (edgeId: string, updates: { type?: string; data?: any }) => {
      setEdges((eds) =>
        eds.map((edge) => (edge.id === edgeId ? { ...edge, ...updates } : edge))
      );
    },
    []
  );

  // Delete edge
  const handleDeleteEdge = useCallback((edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  }, []);

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  // Handle edge selection
  const onEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Handle canvas click (deselect)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Close editors
  const handleCloseNodeEditor = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleCloseEdgeEditor = useCallback(() => {
    setSelectedEdge(null);
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
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {/* Node Panel */}

      {/* Node Editor */}
      <NodeEditor
        selectedNode={selectedNode}
        onUpdateNode={handleUpdateNode}
        onClose={handleCloseNodeEditor}
      />

      {/* Edge Editor */}
      <EdgeEditor
        selectedEdge={selectedEdge}
        onUpdateEdge={handleUpdateEdge}
        onDeleteEdge={handleDeleteEdge}
        onClose={handleCloseEdgeEditor}
      />

      {/* Execution Panel */}
      <SidePanel nodes={nodes} edges={edges} onAddNode={handleAddNode} />
    </div>
  );
}
