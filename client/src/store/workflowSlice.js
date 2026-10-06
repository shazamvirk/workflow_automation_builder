import { createSlice } from '@reduxjs/toolkit';

const initialNodes = [
  {
    id: 'node-1',
    type: 'trigger',
    title: 'Incoming Webhook',
    position: { x: 100, y: 150 },
    config: { url: 'https://api.example.com/webhook', method: 'POST' },
  },
  {
    id: 'node-2',
    type: 'condition',
    title: 'Validate Payload',
    position: { x: 480, y: 150 },
    config: { field: 'status', operator: 'equals', value: 'active' },
  },
  {
    id: 'node-3',
    type: 'action',
    title: 'Send Notification',
    position: { x: 860, y: 150 },
    config: { channel: '#alerts', message: 'Workflow Triggered Successfully!' },
  },
];

const initialConnections = [
  { id: 'conn-1', source: 'node-1', target: 'node-2' },
  { id: 'conn-2', source: 'node-2', target: 'node-3' },
];

const initialState = {
  nodes: initialNodes,
  connections: initialConnections,
  selectedNodeId: null,
  activeExecutingNodeId: null,
  connectingSourceId: null,
  mousePos: { x: 0, y: 0 },
  executionLogs: [],
  isExecuting: false,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
      state.selectedNodeId = action.payload.id;
    },
    updateNodePosition: (state, action) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((n) => n.id === id);
      if (node) {
        node.position = position;
      }
    },
    updateNodeConfig: (state, action) => {
      const { id, config, title } = action.payload;
      const node = state.nodes.find((n) => n.id === id);
      if (node) {
        if (config) node.config = { ...node.config, ...config };
        if (title) node.title = title;
      }
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((n) => n.id !== nodeId);
      state.connections = state.connections.filter(
        (c) => c.source !== nodeId && c.target !== nodeId
      );
      if (state.selectedNodeId === nodeId) {
        state.selectedNodeId = null;
      }
    },
    setConnectingSourceId: (state, action) => {
      state.connectingSourceId = action.payload;
    },
    updateMousePos: (state, action) => {
      state.mousePos = action.payload;
    },
    addConnection: (state, action) => {
      const { source, target } = action.payload;
      if (
        source &&
        target &&
        source !== target &&
        !state.connections.some((c) => c.source === source && c.target === target)
      ) {
        state.connections.push({
          id: `conn-${Date.now()}`,
          source,
          target,
        });
      }
      state.connectingSourceId = null;
    },
    deleteConnection: (state, action) => {
      state.connections = state.connections.filter((c) => c.id !== action.payload);
    },
    setSelectedNodeId: (state, action) => {
      state.selectedNodeId = action.payload;
    },
    setActiveExecutingNodeId: (state, action) => {
      state.activeExecutingNodeId = action.payload;
    },
    setIsExecuting: (state, action) => {
      state.isExecuting = action.payload;
    },
    addExecutionLog: (state, action) => {
      state.executionLogs.push({
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        ...action.payload,
      });
    },
    clearExecutionLogs: (state) => {
      state.executionLogs = [];
    },
    loadWorkflowJSON: (state, action) => {
      if (action.payload.nodes && action.payload.connections) {
        state.nodes = action.payload.nodes;
        state.connections = action.payload.connections;
        state.selectedNodeId = null;
      }
    },
  },
});

export const {
  addNode,
  updateNodePosition,
  updateNodeConfig,
  deleteNode,
  setConnectingSourceId,
  updateMousePos,
  addConnection,
  deleteConnection,
  setSelectedNodeId,
  setActiveExecutingNodeId,
  setIsExecuting,
  addExecutionLog,
  clearExecutionLogs,
  loadWorkflowJSON,
} = workflowSlice.actions;

export default workflowSlice.reducer;