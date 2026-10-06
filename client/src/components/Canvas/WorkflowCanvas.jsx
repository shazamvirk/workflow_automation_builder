import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NodeCard } from './NodeCard';
import { ConnectionLines } from './ConnectionLines';
import { updateMousePos, setSelectedNodeId, setConnectingSourceId } from '../../store/workflowSlice';

export const WorkflowCanvas = () => {
  const dispatch = useDispatch();
  const { nodes } = useSelector((state) => state.workflow);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    dispatch(
      updateMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    );
  };

  const handleCanvasClick = () => {
    dispatch(setSelectedNodeId(null));
    dispatch(setConnectingSourceId(null));
  };

  return (
    <div
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      className="relative flex-1 bg-[#090d16] overflow-hidden select-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"
    >
      <ConnectionLines />
      {nodes.map((node) => (
        <NodeCard key={node.id} node={node} />
      ))}
    </div>
  );
};