import { MindMapNode } from '../types';
import { useEffect, useRef, useState } from 'react';

interface MindMapVisualizationProps {
  data: MindMapNode;
}

export function MindMapVisualization({ data }: MindMapVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const width = svgRef.current.parentElement.clientWidth;
        setDimensions({ width, height: 600 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  interface LayoutNode extends MindMapNode {
    x: number;
    y: number;
    level: number;
    subtreeHeight: number;
    children?: LayoutNode[];
  }

  // Pre-calculate subtree heights
  const calculateSubtreeHeight = (node: MindMapNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return node.children.reduce((acc, child) => acc + calculateSubtreeHeight(child), 0);
  };

  // Main layout function
  const calculateLayout = (
    node: MindMapNode,
    level: number = 0,
    currentY: number = 0,
    totalSubtreeHeight: number = 1
  ): LayoutNode => {
    const nodeSubtreeHeight = calculateSubtreeHeight(node);
    const nodeWidth = 200;
    const nodeHeight = 80;
    
    // Horizontal position
    const x = level === 0 ? 100 : 100 + level * nodeWidth;
    
    // Vertical position (centered within its subtree height)
    const y = level === 0 
      ? dimensions.height / 2 
      : currentY + (nodeSubtreeHeight * nodeHeight) / 2;

    const layoutNode: LayoutNode = {
      ...node,
      x,
      y,
      level,
      subtreeHeight: nodeSubtreeHeight,
      children: [],
    };

    if (node.children && node.children.length > 0) {
      let childY = currentY;
      layoutNode.children = node.children.map((child) => {
        const childNode = calculateLayout(child, level + 1, childY, nodeSubtreeHeight);
        childY += calculateSubtreeHeight(child) * nodeHeight;
        return childNode;
      });

      // Recalculate parent Y to be the average of its children
      if (level > 0) {
        const childrenYSum = layoutNode.children.reduce((sum, c) => sum + c.y, 0);
        layoutNode.y = childrenYSum / layoutNode.children.length;
      }
    }

    return layoutNode;
  };

  const layout = calculateLayout(data);

  // Flatten tree to get all nodes and connections
  const getAllNodes = (node: LayoutNode): LayoutNode[] => {
    const nodes = [node];
    if (node.children) {
      node.children.forEach((child) => {
        nodes.push(...getAllNodes(child));
      });
    }
    return nodes;
  };

  const getAllConnections = (
    node: LayoutNode
  ): Array<{ from: LayoutNode; to: LayoutNode }> => {
    const connections: Array<{ from: LayoutNode; to: LayoutNode }> = [];
    if (node.children) {
      node.children.forEach((child) => {
        connections.push({ from: node, to: child });
        connections.push(...getAllConnections(child));
      });
    }
    return connections;
  };

  const allNodes = getAllNodes(layout);
  const allConnections = getAllConnections(layout);

  const getNodeColor = (level: number) => {
    const colors = [
      'fill-blue-600',
      'fill-purple-500',
      'fill-green-500',
      'fill-orange-500',
      'fill-pink-500',
    ];
    return colors[level % colors.length];
  };

  const getTextColor = (level: number) => {
    return 'fill-white';
  };

  return (
    <div className="w-full h-full overflow-auto bg-gray-800 rounded-lg border border-gray-700">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="min-w-full"
      >
        {/* Draw connections */}
        <g>
          {allConnections.map((conn, i) => (
            <line
              key={`conn-${i}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="#4b5563"
              strokeWidth="2"
              className="transition-all"
            />
          ))}
        </g>

        {/* Draw nodes */}
        <g>
          {allNodes.map((node) => {
            const textWidth = node.label.length * 8 + 20;
            const nodeWidth = Math.max(textWidth, 100);
            const nodeHeight = 40;

            return (
              <g key={node.id} className="cursor-pointer hover:opacity-80 transition-opacity">
                {/* Node background */}
                <rect
                  x={node.x - nodeWidth / 2}
                  y={node.y - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="8"
                  className={`${getNodeColor(node.level)} shadow-lg`}
                  stroke={node.level === 0 ? '#3b82f6' : '#e5e7eb'}
                  strokeWidth={node.level === 0 ? '3' : '1'}
                />

                {/* Node text */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${getTextColor(node.level)} font-medium`}
                  fontSize={node.level === 0 ? '16' : '14'}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}