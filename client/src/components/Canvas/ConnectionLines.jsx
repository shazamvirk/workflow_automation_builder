import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteConnection } from '../../store/workflowSlice';

function getBezierPath(sourceX, sourceY, targetX, targetY) {
  const deltaX = Math.abs(targetX - sourceX) * 0.5;
  const controlX1 = sourceX + deltaX;
  const controlY1 = sourceY;
  const controlX2 = targetX - deltaX;
  const controlY2 = targetY;

  return `M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`;
}

export const ConnectionLines = () => {
  const dispatch = useDispatch();
  const { nodes, connections, connectingSourceId, mousePos } = useSelector((state) => state.workflow);

  // Constants based on node card layout
  const NODE_WIDTH = 256; // 64 * 4 = 256px
  const PORT_Y_OFFSET = 52; // Offset from node top to output port handle

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
        </marker>
      </defs>

      {/* Render established connections */}
      {connections.map((conn) => {
        const sourceNode = nodes.find((n) => n.id === conn.source);
        const targetNode = nodes.find((n) => n.id === conn.target);

        if (!sourceNode || !targetNode) return null;

        const sourceX = sourceNode.position.x + NODE_WIDTH;
        const sourceY = sourceNode.position.y + PORT_Y_OFFSET;
        const targetX = targetNode.position.x;
        const targetY = targetNode.position.y + PORT_Y_OFFSET;

        const pathData = getBezierPath(sourceX, sourceY, targetX, targetY);

        return (
          <g key={conn.id} className="group pointer-events-auto cursor-pointer">
            <path
              d={pathData}
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              markerEnd="url(#arrow)"
              className="transition-all group-hover:stroke-red-400 group-hover:stroke-[4]"
              onClick={() => dispatch(deleteConnection(conn.id))}
            />
          </g>
        );
      })}

      {/* Render active connection line while dragging */}
      {connectingSourceId && (() => {
        const sourceNode = nodes.find((n) => n.id === connectingSourceId);
        if (!sourceNode) return null;

        const sourceX = sourceNode.position.x + NODE_WIDTH;
        const sourceY = sourceNode.position.y + PORT_Y_OFFSET;

        const activePath = getBezierPath(sourceX, sourceY, mousePos.x, mousePos.y);

        return (
          <path
            d={activePath}
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
            strokeDasharray="6,6"
          />
        );
      })()}
    </svg>
  );
};