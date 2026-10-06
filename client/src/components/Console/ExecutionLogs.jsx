import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Terminal, Trash2 } from 'lucide-react';
import { clearExecutionLogs } from '../../store/workflowSlice';

export const ExecutionLogs = () => {
  const dispatch = useDispatch();
  const { executionLogs } = useSelector((state) => state.workflow);

  return (
    <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col z-20">
      <div className="h-8 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Terminal className="w-3.5 h-3.5" /> Simulation Logs Console
        </div>
        <button
          onClick={() => dispatch(clearExecutionLogs())}
          className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 font-mono text-xs">
        {executionLogs.length === 0 ? (
          <div className="text-slate-600 italic">No execution logs yet. Click "Run Simulation" to test your graph.</div>
        ) : (
          executionLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-slate-500 text-[10px] shrink-0">{log.timestamp}</span>
              <span
                className={`${
                  log.type === 'error'
                    ? 'text-red-400'
                    : log.type === 'success'
                    ? 'text-emerald-400'
                    : 'text-indigo-300'
                }`}
              >
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};