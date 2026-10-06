import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Zap, GitBranch, Send, Trash2 } from 'lucide-react';
import {
  updateNodePosition,
  setSelectedNodeId,
  setConnectingSourceId,
  addConnection,
  deleteNode,
} from '../../store/workflowSlice';

export const NodeCard = ({ node }) => {
  const dispatch = useDispatch();
  const { selectedNodeId, activeExecutingNodeId, connectingSourceId } = useSelector(
    (state) => state.workflow
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const isSelected = selectedNodeId === node.id;
  const isExecuting = activeExecutingNodeId === node.id;

  const handleMouseDown = (e) => {
    e.stopPropagation();
    dispatch(setSelectedNodeId(node.id));
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      dispatch(
        updateNodePosition({
          id: node.id,
          position: {
            x: Math.max(0, e.clientX - dragOffset.x),
            y: Math.max(0, e.clientY - dragOffset.y),
          },
        })
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getTypeIcon = () => {
    switch (node.type) {
      case 'trigger':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'condition':
        return <GitBranch className="w-4 h-4 text-cyan-400" />;
      case 'action':
      default:
        return <Send className="w-4 h-4 text-pink-400" />;
    }
  };

  const getTypeBadge = () => {
    switch (node.type) {
      case 'trigger':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
      case 'condition':
        return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300';
      case 'action':
        return 'border-pink-500/40 bg-pink-500/10 text-pink-300';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <div
      style={{ left: `${node.position.x}px`, top: `${node.position.y}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`absolute w-64 bg-slate-900 rounded-xl border p-4 shadow-xl select-none cursor-move transition-shadow z-10 ${
        isExecuting
          ? 'border-emerald-400 ring-4 ring-emerald-500/30 shadow-emerald-950'
          : isSelected
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Input Port Anchor */}
      {node.type !== 'trigger' && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (connectingSourceId) {
              dispatch(addConnection({ source: connectingSourceId, target: node.id }));
            }
          }}
          className="absolute -left-3 top-[44px] w-6 h-6 bg-slate-800 border-2 border-indigo-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
          title="Connect Input"
        >
          <div className="w-2 h-2 bg-indigo-400 rounded-full" />
        </div>
      )}

      {/* Card Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <span className="font-semibold text-sm text-slate-100 truncate max-w-[130px]">
            {node.title}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteNode(node.id));
          }}
          className="text-slate-500 hover:text-red-400 p-1 rounded transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Body */}
      <div className="space-y-1">
        <span
          className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded border ${getTypeBadge()}`}
        >
          {node.type}
        </span>
        <div className="text-xs text-slate-400 truncate">
          {node.type === 'trigger' && `URL: ${node.config.url || 'Not Set'}`}
          {node.type === 'condition' &&
            `If ${node.config.field || 'field'} ${node.config.operator || '=='} ${
              node.config.value || 'val'
            }`}
          {node.type === 'action' && `Target: ${node.config.channel || 'Default'}`}
        </div>
      </div>

      {/* Output Port Anchor */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setConnectingSourceId(node.id));
        }}
        className="absolute -right-3 top-[44px] w-6 h-6 bg-slate-800 border-2 border-indigo-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
        title="Drag Connection Output"
      >
        <div className="w-2 h-2 bg-indigo-400 rounded-full" />
      </div>
    </div>
  );
};