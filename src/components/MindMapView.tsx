import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface MindMapViewProps {
  data?: {
    nodes: Node[];
    edges: Edge[];
  };
}

export default function MindMapView({ data }: MindMapViewProps) {
  const initialNodes: Node[] = data?.nodes || [
    {
      id: '1',
      type: 'input',
      data: { label: 'Main Concept' },
      position: { x: 400, y: 50 },
    },
  ];

  const initialEdges: Edge[] = data?.edges || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Generating mind map...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-gray-50"
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#3B82F6', strokeWidth: 2 },
        }}
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'input') return '#3B82F6';
            return '#94A3B8';
          }}
          className="bg-white"
        />
      </ReactFlow>
    </div>
  );
}
