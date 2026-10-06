import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Download, Upload, Trash2, Cpu } from 'lucide-react';
import { runWorkflowSimulation } from '../utils/executionEngine';
import { loadWorkflowJSON, clearExecutionLogs } from '../store/workflowSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { nodes, connections, isExecuting } = useSelector((state) => state.workflow);

  const handleRun = () => {
    if (!isExecuting) {
      runWorkflowSimulation(dispatch, nodes, connections);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, connections }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `workflow-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          dispatch(loadWorkflowJSON(parsed));
        } catch (err) {
          alert('Invalid JSON File Format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-20 relative">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600/20 border border-indigo-500/40 rounded-lg text-indigo-400">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-100">Workflow Automation Builder</h1>
          <p className="text-xs text-slate-400">Interactive DAG Flow Engine</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={isExecuting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
            isExecuting
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          {isExecuting ? 'Running...' : 'Run Simulation'}
        </button>

        <div className="h-6 w-[1px] bg-slate-800 my-auto" />

        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-medium border border-slate-700 transition"
        >
          <Download className="w-3.5 h-3.5" />
          Export JSON
        </button>

        <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-medium border border-slate-700 transition cursor-pointer">
          <Upload className="w-3.5 h-3.5" />
          Import
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </header>
  );
};