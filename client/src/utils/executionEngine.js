// import {
//   addExecutionLog,
//   clearExecutionLogs,
//   setIsExecuting,
//   setActiveExecutingNodeId,
// } from '../store/workflowSlice';

// export async function runWorkflowSimulation(dispatch, nodes, connections) {
//   dispatch(clearExecutionLogs());
//   dispatch(setIsExecuting(true));
//   dispatch(addExecutionLog({ type: 'info', message: '🚀 Starting Workflow Simulation...' }));

//   if (nodes.length === 0) {
//     dispatch(addExecutionLog({ type: 'error', message: 'Canvas is empty. Add nodes to execute.' }));
//     dispatch(setIsExecuting(false));
//     return;
//   }

//   // Find root nodes (nodes with no incoming target connection)
//   const targetIds = new Set(connections.map((c) => c.target));
//   const rootNodes = nodes.filter((n) => !targetIds.has(n.id));

//   if (rootNodes.length === 0) {
//     dispatch(
//       addExecutionLog({
//         type: 'error',
//         message: 'Cyclic or invalid graph: No starting trigger node found.',
//       })
//     );
//     dispatch(setIsExecuting(false));
//     return;
//   }

//   const queue = [...rootNodes];
//   const visited = new Set();

//   while (queue.length > 0) {
//     const currentNode = queue.shift();

//     if (visited.has(currentNode.id)) continue;
//     visited.add(currentNode.id);

//     // Highlight node in UI
//     dispatch(setActiveExecutingNodeId(currentNode.id));
//     dispatch(
//       addExecutionLog({
//         type: 'info',
//         message: `Executing [${currentNode.title}] (${currentNode.type.toUpperCase()})...`,
//       })
//     );

//     // Simulated execution delay
//     await new Promise((resolve) => setTimeout(resolve, 900));

//     // Evaluate node logic
//     let executionSuccess = true;
//     let logDetail = '';

//     if (currentNode.type === 'trigger') {
//       logDetail = `Trigger received payload from ${currentNode.config.url || 'Webhook'}`;
//     } else if (currentNode.type === 'condition') {
//       const { field, operator, value } = currentNode.config;
//       logDetail = `Evaluated Condition (${field || 'status'} ${operator || 'equals'} ${value || 'active'}) -> TRUE`;
//     } else if (currentNode.type === 'action') {
//       logDetail = `Executed Action: Sent notification to ${currentNode.config.channel || 'Output'}`;
//     }

//     if (executionSuccess) {
//       dispatch(
//         addExecutionLog({
//           type: 'success',
//           message: `✔ ${currentNode.title}: ${logDetail}`,
//         })
//       );
//     }

//     // Queue outgoing target nodes
//     const outgoingConnections = connections.filter((c) => c.source === currentNode.id);
//     const nextNodes = outgoingConnections
//       .map((c) => nodes.find((n) => n.id === c.target))
//       .filter(Boolean);

//     queue.push(...nextNodes);
//   }

//   dispatch(setActiveExecutingNodeId(null));
//   dispatch(setIsExecuting(false));
//   dispatch(
//     addExecutionLog({
//       type: 'info',
//       message: '🎉 Workflow execution completed successfully!',
//     })
//   );
// }






// src/utils/executionEngine.js
// import {
//   addExecutionLog,
//   clearExecutionLogs,
//   setIsExecuting,
//   setActiveExecutingNodeId,
// } from '../store/workflowSlice';

// // Manual simulation function (used when clicking "Run Simulation" in Header)
// // Manual Simulation (Runs when you click "Run Simulation" button)
// export async function runWorkflowSimulation(dispatch, nodes, connections) {
//   dispatch(clearExecutionLogs());
//   dispatch(setIsExecuting(true));
//   dispatch(addExecutionLog({ type: 'info', message: '🚀 Starting Workflow Simulation...' }));

//   if (nodes.length === 0) {
//     dispatch(addExecutionLog({ type: 'error', message: 'Canvas is empty. Add nodes to execute.' }));
//     dispatch(setIsExecuting(false));
//     return;
//   }

//   const targetIds = new Set(connections.map((c) => c.target));
//   const rootNodes = nodes.filter((n) => !targetIds.has(n.id));

//   if (rootNodes.length === 0) {
//     dispatch(
//       addExecutionLog({
//         type: 'error',
//         message: 'Cyclic or invalid graph: No starting trigger node found.',
//       })
//     );
//     dispatch(setIsExecuting(false));
//     return;
//   }

//   const queue = [...rootNodes];
//   const visited = new Set();

//   while (queue.length > 0) {
//     const currentNode = queue.shift();

//     if (visited.has(currentNode.id)) continue;
//     visited.add(currentNode.id);

//     dispatch(setActiveExecutingNodeId(currentNode.id));
//     dispatch(
//       addExecutionLog({
//         type: 'info',
//         message: `Executing [${currentNode.title}] (${currentNode.type.toUpperCase()})...`,
//       })
//     );

//     await new Promise((resolve) => setTimeout(resolve, 800));

//     let shouldContinue = true;

//     if (currentNode.type === 'trigger') {
//       dispatch(
//         addExecutionLog({
//           type: 'success',
//           message: `✔ ${currentNode.title}: Trigger received payload from ${currentNode.config.url || 'Webhook'}`,
//         })
//       );
//     } else if (currentNode.type === 'condition') {
//       const field = currentNode.config.field || 'amount';
//       const targetValue = parseFloat(currentNode.config.value) || 50;
      
//       // Look up if user typed a custom test value in node config, else default to test payload 25
//       const testInput = parseFloat(currentNode.config.testValue) || 25;
//       const isConditionMet = testInput > targetValue;

//       if (isConditionMet) {
//         dispatch(
//           addExecutionLog({
//             type: 'success',
//             message: `✔ [${currentNode.title}] Condition Met! (${field}: ${testInput} > ${targetValue}) -> TRUE`,
//           })
//         );
//       } else {
//         dispatch(
//           addExecutionLog({
//             type: 'error',
//             message: `✖ [${currentNode.title}] Condition Failed! (${field}: ${testInput} <= ${targetValue}) -> FALSE. Stopping flow.`,
//           })
//         );
//         shouldContinue = false; // Stops execution!
//       }
//     } else if (currentNode.type === 'action') {
//       dispatch(
//         addExecutionLog({
//           type: 'success',
//           message: `✔ ${currentNode.title}: Executed Action: Sent notification to ${currentNode.config.channel || 'Output'}`,
//         })
//       );
//     }

//     if (shouldContinue) {
//       const outgoingConnections = connections.filter((c) => c.source === currentNode.id);
//       const nextNodes = outgoingConnections
//         .map((c) => nodes.find((n) => n.id === c.target))
//         .filter(Boolean);

//       queue.push(...nextNodes);
//     }
//   }

//   dispatch(setActiveExecutingNodeId(null));
//   dispatch(setIsExecuting(false));
// }






















import {
  addExecutionLog,
  clearExecutionLogs,
  setIsExecuting,
  setActiveExecutingNodeId,
} from '../store/workflowSlice';

// 1. Manual simulation function (used when clicking "Run Simulation" in Header)
export async function runWorkflowSimulation(dispatch, nodes, connections) {
  dispatch(clearExecutionLogs());
  dispatch(setIsExecuting(true));
  dispatch(addExecutionLog({ type: 'info', message: '🚀 Starting Workflow Simulation...' }));

  if (nodes.length === 0) {
    dispatch(addExecutionLog({ type: 'error', message: 'Canvas is empty. Add nodes to execute.' }));
    dispatch(setIsExecuting(false));
    return;
  }

  const targetIds = new Set(connections.map((c) => c.target));
  const rootNodes = nodes.filter((n) => !targetIds.has(n.id));

  if (rootNodes.length === 0) {
    dispatch(
      addExecutionLog({
        type: 'error',
        message: 'Cyclic or invalid graph: No starting trigger node found.',
      })
    );
    dispatch(setIsExecuting(false));
    return;
  }

  const queue = [...rootNodes];
  const visited = new Set();

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (visited.has(currentNode.id)) continue;
    visited.add(currentNode.id);

    dispatch(setActiveExecutingNodeId(currentNode.id));
    dispatch(
      addExecutionLog({
        type: 'info',
        message: `Executing [${currentNode.title}] (${currentNode.type.toUpperCase()})...`,
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    let shouldContinue = true;

    if (currentNode.type === 'trigger') {
      dispatch(
        addExecutionLog({
          type: 'success',
          message: `✔ ${currentNode.title}: Trigger received payload from ${currentNode.config.url || 'Webhook'}`,
        })
      );
    } else if (currentNode.type === 'condition') {
      const field = currentNode.config.field || 'amount';
      const targetValue = parseFloat(currentNode.config.value) || 50;
      const testInput = parseFloat(currentNode.config.testValue) || 25;
      const isConditionMet = testInput > targetValue;

      if (isConditionMet) {
        dispatch(
          addExecutionLog({
            type: 'success',
            message: `✔ [${currentNode.title}] Condition Met! (${field}: ${testInput} > ${targetValue}) -> TRUE`,
          })
        );
      } else {
        dispatch(
          addExecutionLog({
            type: 'error',
            message: `✖ [${currentNode.title}] Condition Failed! (${field}: ${testInput} <= ${targetValue}) -> FALSE. Stopping flow.`,
          })
        );
        shouldContinue = false;
      }
    } else if (currentNode.type === 'action') {
      dispatch(
        addExecutionLog({
          type: 'success',
          message: `✔ ${currentNode.title}: Executed Action: Sent notification to ${currentNode.config.channel || 'Output'}`,
        })
      );
    }

    if (shouldContinue) {
      const outgoingConnections = connections.filter((c) => c.source === currentNode.id);
      const nextNodes = outgoingConnections
        .map((c) => nodes.find((n) => n.id === c.target))
        .filter(Boolean);

      queue.push(...nextNodes);
    }
  }

  dispatch(setActiveExecutingNodeId(null));
  dispatch(setIsExecuting(false));
}

// 2. Live Webhook payload execution function (used when receiving real HTTP POST requests)
export async function runWorkflowWithPayload(dispatch, nodes, connections, incomingPayload) {
  dispatch(setIsExecuting(true));
  dispatch(
    addExecutionLog({
      type: 'info',
      message: `⚡ Live Webhook Event Triggered! Received: ${JSON.stringify(incomingPayload)}`,
    })
  );

  const targetIds = new Set(connections.map((c) => c.target));
  const rootNodes = nodes.filter((n) => !targetIds.has(n.id));

  if (rootNodes.length === 0) {
    dispatch(addExecutionLog({ type: 'error', message: 'No trigger node found on canvas.' }));
    dispatch(setIsExecuting(false));
    return;
  }

  const queue = [...rootNodes];
  const visited = new Set();
  let currentContextData = { ...incomingPayload };

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (visited.has(currentNode.id)) continue;
    visited.add(currentNode.id);

    dispatch(setActiveExecutingNodeId(currentNode.id));
    await new Promise((resolve) => setTimeout(resolve, 800));

    let shouldContinue = true;

    if (currentNode.type === 'trigger') {
      dispatch(
        addExecutionLog({
          type: 'success',
          message: `✔ [${currentNode.title}] Payload parsed successfully!`,
        })
      );
    } else if (currentNode.type === 'condition') {
      const field = currentNode.config.field || 'amount';
      const targetValue = parseFloat(currentNode.config.value) || 50;
      const actualValue = parseFloat(currentContextData[field]);

      const isConditionMet = actualValue > targetValue;

      if (isConditionMet) {
        dispatch(
          addExecutionLog({
            type: 'success',
            message: `✔ [${currentNode.title}] Condition Met! (${field}: ${actualValue} > ${targetValue}) -> TRUE`,
          })
        );
      } else {
        dispatch(
          addExecutionLog({
            type: 'error',
            message: `✖ [${currentNode.title}] Condition Failed! (${field}: ${actualValue} <= ${targetValue}) -> FALSE. Halting path.`,
          })
        );
        shouldContinue = false;
      }
    } else if (currentNode.type === 'action') {
      dispatch(
        addExecutionLog({
          type: 'success',
          message: `🚀 [${currentNode.title}] Executed Action: Sent notification for payload: ${JSON.stringify(
            currentContextData
          )}`,
        })
      );
    }

    if (shouldContinue) {
      const outgoingConnections = connections.filter((c) => c.source === currentNode.id);
      const nextNodes = outgoingConnections
        .map((c) => nodes.find((n) => n.id === c.target))
        .filter(Boolean);

      queue.push(...nextNodes);
    }
  }

  dispatch(setActiveExecutingNodeId(null));
  dispatch(setIsExecuting(false));
}