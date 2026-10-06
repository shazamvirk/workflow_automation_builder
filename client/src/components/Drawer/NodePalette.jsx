import React from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Zap, GitBranch, Send } from 'lucide-react';
import { addNode } from '../../store/workflowSlice';

export const NodePalette = () => {
  const dispatch = useDispatch();

  const handleAdd = (type) => {
    const id = `node-${Date.now()}`;
    const defaultConfigs = {
      trigger: {
        title: 'Webhook Event',
        type: 'trigger',
        config: { url: 'https://api.example.com/hooks', method: 'POST' },
      },
      condition: {
        title: 'Filter Logic',
        type: 'condition',
        config: { field: 'status', operator: 'equals', value: 'approved' },
      },
      action: {
        title: 'Execute Task',
        type: 'action',
        config: { channel: '#general', message: 'Workflow Event Fired' },
      },
    };

    const template = defaultConfigs[type];

    dispatch(
      addNode({
        id,
        type: template.type,
        title: template.title,
        position: { x: 150 + Math.random() * 80, y: 150 + Math.random() * 80 },
        config: template.config,
      })
    );
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-3 px-6 flex items-center gap-4 z-10">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
        <Plus className="w-3.5 h-3.5" /> Add Nodes:
      </span>

      <button
        onClick={() => handleAdd('trigger')}
        className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-medium transition"
      >
        <Zap className="w-3.5 h-3.5" /> + Trigger
      </button>

      <button
        onClick={() => handleAdd('condition')}
        className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-medium transition"
      >
        <GitBranch className="w-3.5 h-3.5" /> + Condition
      </button>

      <button
        onClick={() => handleAdd('action')}
        className="flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 text-pink-300 px-3 py-1.5 rounded-lg text-xs font-medium transition"
      >
        <Send className="w-3.5 h-3.5" /> + Action
      </button>
    </div>
  );
};