import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sliders, X } from 'lucide-react';
import { updateNodeConfig, setSelectedNodeId } from '../../store/workflowSlice';

export const ConfigDrawer = () => {
  const dispatch = useDispatch();
  const { nodes, selectedNodeId } = useSelector((state) => state.workflow);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) return null;

  const handleTitleChange = (e) => {
    dispatch(
      updateNodeConfig({
        id: selectedNode.id,
        title: e.target.value,
      })
    );
  };

  const handleConfigChange = (key, value) => {
    dispatch(
      updateNodeConfig({
        id: selectedNode.id,
        config: { [key]: value },
      })
    );
  };

  return (
    <aside className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col z-20 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <Sliders className="w-4 h-4" /> Node Settings
        </div>
        <button
          onClick={() => dispatch(setSelectedNodeId(null))}
          className="text-slate-500 hover:text-slate-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-5 flex-1 overflow-y-auto">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-400">Node Title</label>
          <input
            type="text"
            value={selectedNode.title}
            onChange={handleTitleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Dynamic Fields Based on Node Type */}
        {selectedNode.type === 'trigger' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Webhook Endpoint URL</label>
              <input
                type="text"
                value={selectedNode.config.url || ''}
                onChange={(e) => handleConfigChange('url', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">HTTP Method</label>
              <select
                value={selectedNode.config.method || 'POST'}
                onChange={(e) => handleConfigChange('method', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
              </select>
            </div>
          </div>
        )}

        {selectedNode.type === 'condition' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Target Field</label>
              <input
                type="text"
                value={selectedNode.config.field || ''}
                onChange={(e) => handleConfigChange('field', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Operator</label>
              <select
                value={selectedNode.config.operator || 'equals'}
                onChange={(e) => handleConfigChange('operator', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="equals">Equals (==)</option>
                <option value="contains">Contains</option>
                <option value="greater_than">Greater Than (&gt;)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Match Value</label>
              <input
                type="text"
                value={selectedNode.config.value || ''}
                onChange={(e) => handleConfigChange('value', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {selectedNode.type === 'action' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Output Channel</label>
              <input
                type="text"
                value={selectedNode.config.channel || ''}
                onChange={(e) => handleConfigChange('channel', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Message Payload</label>
              <textarea
                rows={3}
                value={selectedNode.config.message || ''}
                onChange={(e) => handleConfigChange('message', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};