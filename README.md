# ⚡ Real-Time Workflow Automation Builder

A full-stack, visual, node-based workflow automation platform built with **React, Redux Toolkit, Tailwind CSS, Node.js, Express, and Socket.IO**.

Design, configure, and execute automated workflows through an interactive visual canvas — without writing code for every business rule.

---

## 💡 Project Overview

Imagine you run an online pizza store and want to automate order processing based on the total purchase amount.

For example:

* **If the order exceeds $50:** Send the customer a discount coupon via SMS.
* **If the order is $50 or less:** Continue with the standard order process.

Traditionally, implementing or modifying these rules requires developers to update backend code.

The **Real-Time Workflow Automation Builder** simplifies this process by providing a visual canvas where users can create workflows using connected nodes. Users can configure triggers, define conditional rules, and design automation sequences through an intuitive interface.

Inspired by workflow automation platforms such as Zapier and n8n, this project demonstrates how visual programming and real-time event processing can simplify business automation.

## ⚡ Real-Time Webhook Engine

The platform supports event-driven workflow execution through an Express-based webhook receiver and Socket.IO.

When an external application sends an order event:

1. **Webhook Reception:** The Node.js server receives the incoming HTTP POST request.
2. **Real-Time Communication:** Socket.IO broadcasts the event payload to connected clients.
3. **Workflow Evaluation:** The workflow evaluates the incoming data against the configured conditions.
4. **Visual Execution:** The React canvas highlights the corresponding nodes and connections as the workflow progresses.
5. **Execution Logging:** Each execution step is displayed in the live console.

This provides immediate visual feedback without requiring page refreshes or manual execution.

## 🎨 Key Features

* **Visual Workflow Canvas:** Create workflows by positioning and connecting trigger, condition, and action nodes.
* **Drag-and-Drop Interface:** Arrange workflow nodes through an interactive canvas.
* **Custom SVG Connections:** Render dynamic Bézier curves between node input and output handles.
* **Webhook Integration:** Receive external events through an Express HTTP endpoint.
* **Real-Time Updates:** Use Socket.IO to deliver webhook events to connected clients.
* **Conditional Branching:** Evaluate business rules using incoming payload data, such as `amount > 50`.
* **Visual Execution Tracking:** Highlight active nodes and connections as workflows execute.
* **Live Execution Console:** Display step-by-step execution logs with color-coded status messages.
* **Manual Simulation:** Test workflow behavior using predefined sample data without sending an external webhook.

## 🍕 Example: Pizza Order Automation

This example demonstrates how a pizza store can automate order processing based on the order amount.

### Workflow Structure

`New Pizza Order → Check Order Amount → Send SMS Notification`

**1. Trigger Node — New Pizza Order**

Receives incoming order events through the webhook endpoint:

`POST http://localhost:4000/api/webhook`

**2. Condition Node — Check Order Amount**

Evaluates the following condition:

`amount > 50`

**3. Action Node — Send SMS Notification**

Represents the notification action when the condition evaluates to `TRUE`.

### Execution Scenarios

| Order Amount | Condition           | Expected Result                                            |
| ------------ | ------------------- | ---------------------------------------------------------- |
| $85          | `85 > 50` → `TRUE`  | Continue to the action node                                |
| $25          | `25 > 50` → `FALSE` | Follow the false branch or stop if no branch is configured |

The visual execution path and console logs help users understand how each event moves through the workflow.

> **Note:** The SMS node represents the notification action in this example. Actual SMS delivery requires integration with an SMS provider, such as Twilio.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) — version 18 or higher
* npm, included with Node.js, or Yarn
* Git (optional, for cloning the repository)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Replace the repository URL and project folder with your actual GitHub repository details.

### 2. Install Dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd ../server
npm install
```

### 3. Start the Backend Server

Open your first terminal:

```bash
cd server
node index.js
```

The backend server should be available at:

`http://localhost:4000`

### 4. Start the Frontend Application

Open a second terminal from the project root:

```bash
cd client
npm run dev
```

The frontend should be available at:

`http://localhost:5173`

Open the frontend URL in your browser to start building workflows.

---

## 🧪 Testing the Workflow

The application supports two workflow testing approaches.

### 1. Real-Time Webhook Execution ⚡

This mode allows you to test workflows using actual HTTP requests.

**Step 1:** Start both the backend and frontend servers.

**Step 2:** Open the application at:

`http://localhost:5173`

**Step 3:** Create and connect the workflow nodes:

`Trigger → Condition → Action`

Configure the condition to evaluate `amount > 50`.

**Step 4:** Open a third terminal in PowerShell and send a test request.

#### Test A — Order Amount: $85

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:4000/api/webhook" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"amount":85,"customer":"Sarah"}'
```

**Expected behavior:**

* The server receives the order payload.
* The event is broadcast to connected clients.
* The condition evaluates to `TRUE`.
* The corresponding workflow path is highlighted.
* Execution proceeds to the action node.

#### Test B — Order Amount: $25

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:4000/api/webhook" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"amount":25,"customer":"John"}'
```

**Expected behavior:**

* The server receives and broadcasts the order payload.
* The condition evaluates to `FALSE`.
* The workflow follows the false branch, if configured.
* If no false branch exists, execution stops at the condition node.
* The console displays the corresponding execution status.

> **Important:** These tests assume that the frontend's Socket.IO listener and workflow execution logic are configured to process incoming webhook events.

### 2. Manual Simulation 🖱️

The **Run Simulation** button allows you to test a workflow using predefined sample data.

This is useful for testing workflow behavior without sending an external HTTP request.

1. Open the workflow builder.
2. Configure and connect the desired nodes.
3. Click **Run Simulation**.
4. Observe the workflow execution and console logs.

Manual simulation is useful during development, while webhook execution demonstrates real-time event handling.

---

## 🛠️ Technology Stack

| Technology    | Purpose                                |
| ------------- | -------------------------------------- |
| React         | Interactive user interface             |
| Redux Toolkit | Frontend state management              |
| Tailwind CSS  | Responsive styling                     |
| Lucide React  | Interface icons                        |
| Node.js       | Backend runtime                        |
| Express.js    | HTTP server and webhook endpoint       |
| Socket.IO     | Real-time, bidirectional communication |
| SVG           | Dynamic workflow connection lines      |

---

## 🏗️ Architecture

The application consists of three main components:

**Frontend — React**

Provides the visual workflow editor, node configuration, execution animations, and live console.

**Backend — Node.js and Express**

Receives webhook requests and handles server-side event processing.

**Real-Time Communication — Socket.IO**

Transmits incoming events to connected clients so the frontend can visualize workflow execution.

---

## 🎯 Project Goals

This project demonstrates practical implementation of:

* Visual workflow design and node-based interfaces
* Event-driven application architecture
* REST API and webhook integration
* Real-time communication using WebSockets
* Conditional logic and workflow execution
* State management in React applications
* Interactive UI design and dynamic SVG rendering

## 🔮 Future Improvements

Potential enhancements include:

* Persistent workflow storage using a database
* User authentication and workflow management
* Additional triggers, conditions, and action nodes
* Multiple conditional branches
* Integration with email and SMS providers
* Workflow execution history and analytics
* Retry mechanisms and error recovery
* Scheduled and recurring workflows

---

## 👨‍💻 Author

**Shazam Virk**

BSCS Graduate | MERN Stack Developer | React Native Developer | AI Enthusiast

Interested in building scalable web applications, mobile applications, and intelligent automation solutions.

* **GitHub:** [github.com/shazamvirk](https://github.com/shazamvirk)
* **LinkedIn:** [Add your LinkedIn profile](https://www.linkedin.com/)

---

