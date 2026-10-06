
---

```markdown
# ⚡ Real-Time Workflow Automation Builder

> **A full-stack, visual node-based automation platform** built with **React, Redux Toolkit, Tailwind CSS, Node.js, Express, and Socket.io**.

---

## 💡 What is this project?

Imagine you run an online pizza store. When a customer places an order, you want different actions to happen automatically based on how much money they spend:
* **If order > $50:** Send them a free coupon code via SMS.
* **If order ≤ $50:** Process the order normally.

Normally, changing this threshold or adding new steps requires software developers to write and deploy new backend code. 

**This Workflow Builder solves that problem.** It provides an interactive visual canvas (similar to *Zapier* or *n8n*) where non-technical managers can **drag and drop nodes, connect them with lines, and configure business rules visually**—no coding required!

---

## ⚡ Real-Time Webhook Engine
When a real order comes in from an external website or webhook:
1. The **Node.js server** receives the HTTP payload.
2. **WebSockets (`Socket.io`)** stream the event data to the React frontend instantly.
3. The **React canvas** automatically animates and highlights the exact path the order takes through your visual flowchart in real time—**no page refreshes or manual button clicks needed!**

---

## 🎨 Key Features

* **Drag-and-Drop Canvas:** Intuitive UI to position and connect Trigger, Condition, and Action nodes.
* **Dynamic Connection Lines:** Custom SVG bezier curves linking output and input handles between nodes.
* **Real-World Webhook Receiver:** Express backend that accepts live HTTP `POST` requests and broadcasts payloads.
* **Real-Time Visual Execution:** WebSockets update and highlight active node paths as live orders flow through the system.
* **Conditional Branching:** Dynamic decision engine that evaluates properties (e.g., `amount > 50`) and halts or continues execution branches.
* **Live Console Logger:** Built-in console drawer showing step-by-step color-coded execution logs.

---

## 🏗️ System Architecture

```text
+-----------------------+              +-----------------------+              +-----------------------+
|  External App / cURL  |              | Node.js Express Server|              | React Canvas Frontend |
|  or Real Website      | --- HTTP --->|  (Port 4000)          | --- WebSocket|  (Port 5173)          |
|  POST /api/webhook    |  Payload     |  Parses & Emits Event |  (Socket.io) |  Executes Node Flow   |
+-----------------------+              +-----------------------+              +-----------------------+

```

---

## 🍕 Example Scenario: Pizza Order Automation

1. **Trigger Node (`New Pizza Order`):** Listens for incoming POST payloads at `http://localhost:4000/api/webhook`.
2. **Condition Node (`Check Order Amount`):** Evaluates if `amount > 50`.
3. **Action Node (`Send SMS Notification`):** Sends a notification if the condition evaluates to `TRUE`.

### Execution Paths:

* **Scenario A (Order = $85):** Condition `$85 > $50` evaluates to **`TRUE`**. Execution moves to the **Action Node**!
* **Scenario B (Order = $25):** Condition `$25 > $50` evaluates to **`FALSE`**. Execution **halts**, logs a red error in the console, and skips the notification.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm` or `yarn`

---

### Step 1: Clone the Repository

```bash
git clone [https://github.com/your-username/workflow-automation-builder.git](https://github.com/your-username/workflow-automation-builder.git)
cd workflow-automation-builder

```

---

### Step 2: Install Dependencies

**Frontend Dependencies:**

```bash
npm install

```

**Backend Server Dependencies:**

```bash
cd server
npm install
cd ..

```

---

### Step 3: Start the Application

You will need **two terminal windows** running simultaneously:

**Terminal 1 (Backend Server):**

```bash
cd server
node index.js

```

*Server runs on `http://localhost:4000*`

**Terminal 2 (Frontend React App):**

```bash
npm run dev

```

*Frontend runs on `http://localhost:5173*`

---

## 🧪 Testing Live Webhooks vs. Manual Simulation

This platform supports two execution modes:

### 1. Real-Time Webhook Execution (Automatic ⚡)

> ⚠️ **Note:** You do **NOT** need to click "Run Simulation" when testing real payloads! The socket listener will execute automatically when a payload arrives.

1. Open `http://localhost:5173` in your browser.
2. Build your flow on screen: Connect **Trigger Node** $\rightarrow$ **Condition Node** $\rightarrow$ **Action Node**.
3. Open a **third terminal window** (PowerShell) and send a live request:

**Test A: Order total = $85 (Passes Condition > $50)**

```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/webhook" -Method Post -ContentType "application/json" -Body '{"amount": 85, "customer": "Sarah"}'

```

> **What happens:** The canvas receives the event automatically via WebSockets, evaluates `$85 > $50` as **`TRUE`**, highlights the path in real time, and executes the action node!

**Test B: Order total = $25 (Fails Condition > $50)**

```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/webhook" -Method Post -ContentType "application/json" -Body '{"amount": 25, "customer": "John"}'

```

> **What happens:** The canvas catches the event, evaluates `$25 <= $50` as **`FALSE`**, halts execution at the condition node, and logs a red error message in the console.

---

### 2. Manual Dry-Run Simulation (Button Click 🖱️)

The **"Run Simulation"** button in the top navigation bar is used for **offline dry-runs** using static default configuration values when no backend server or external webhook is connected.

---

## 🛠️ Tech Stack

* **Frontend:** React, Redux Toolkit, Tailwind CSS, Lucide React
* **Backend:** Node.js, Express, Socket.io
* **Real-time Engine:** WebSockets (`socket.io-client`)