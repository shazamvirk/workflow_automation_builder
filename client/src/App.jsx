// import React from 'react';
// import { Header } from './components/Header';
// import { NodePalette } from './components/Drawer/NodePalette';
// import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
// import { ConfigDrawer } from './components/Drawer/ConfigDrawer';
// import { ExecutionLogs } from './components/Console/ExecutionLogs';

// export default function App() {
//   return (
//     <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
//       <Header />
//       <NodePalette />
//       <div className="flex-1 flex overflow-hidden relative">
//         <WorkflowCanvas />
//         <ConfigDrawer />
//       </div>
//       <ExecutionLogs />
//     </div>
//   );
// }





// src/App.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Header } from './components/Header';
import { NodePalette } from './components/Drawer/NodePalette';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { ConfigDrawer } from './components/Drawer/ConfigDrawer';
import { ExecutionLogs } from './components/Console/ExecutionLogs';
import { runWorkflowWithPayload } from './utils/executionEngine';

export default function App() {
  const dispatch = useDispatch();
  const { nodes, connections } = useSelector((state) => state.workflow);

  // Keep a live mutable reference to the latest nodes and connections
  const stateRef = useRef({ nodes, connections });

  useEffect(() => {
    stateRef.current = { nodes, connections };
  }, [nodes, connections]);

  useEffect(() => {
    const socket = io('http://localhost:4000', {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('⚡ Connected to Webhook Server');
    });

    socket.on('webhook_received', (eventData) => {
      console.log('📦 Real Webhook Payload Received:', eventData.data);
      
      // Always pull the freshest nodes & connections from stateRef
      const { nodes: currentNodes, connections: currentConnections } = stateRef.current;
      
      runWorkflowWithPayload(dispatch, currentNodes, currentConnections, eventData.data);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
      <Header />
      <NodePalette />
      <div className="flex-1 flex overflow-hidden relative">
        <WorkflowCanvas />
        <ConfigDrawer />
      </div>
      <ExecutionLogs />
    </div>
  );
}