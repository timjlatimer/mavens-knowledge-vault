# Human-in-the-Loop for AI Agents: Best Practices, Frameworks, Use Cases, and Demo

**URL:** https://www.permit.io/blog/human-in-the-loop-for-ai-agents-best-practices-frameworks-use-cases-and-demo

---

🤍 agent.security - Permit's New Platform for Enterprise-Grade AI Agent Security | Try it here 🤍
Solutions
Learn
Pricing
Docs
Company
5.4k
Sign In
Start Now
Home
/
Blog
/
Human-in-the-Loop for AI Agents: Best Practices, Frameworks, Use Cases, and Demo
Human-in-the-Loop for AI Agents: Best Practices, Frameworks, Use Cases, and Demo
Learn how to safely integrate AI agents with human-in-the-loop (HITL) workflows. Explore best practices, frameworks, real-world use cases, and a live demo.

Gabriel L. Manor

|
Jun 5 2025
Share:
Table of Contents

AI agents are no longer just passive observers in our applications—they’re active participants in our systems. With the rapid rise of LLMs, agents today can query APIs, modify infrastructure, respond to users, and trigger workflows. They’re increasingly embedded in customer support, developer tools, operations, and even decision-making pipelines.

But with this autonomy comes a critical question:

Can you trust an agent to act without oversight?

The short answer: no.

Agents may hallucinate actions, misinterpret prompts, or overstep boundaries. And when those actions touch sensitive systems—like access control, financial operations, or customer data—it's not a risk that you should take.

It also doesn’t mean that AI agents have no place in performing these actions. We all know that they will have the capability to do it sooner or later, and it’s only a question of how we adequately prepare for it, especially from a security perspective.

That’s where the concept of Human-in-the-Loop (HITL) comes in. By delegating final decisions to a human, developers can combine the efficiency of automation with the judgment of real people. That’s what we're here to talk about. This article explores:

Why HITL is essential in agentic systems
What it means to delegate permissions to humans
The best tools and frameworks for building HITL workflows
Real-world use cases where oversight is non-negotiable
And a short glimpse into a working demo that ties it all together

Let’s get into it -

Why Human Oversight Is Essential in Agentic Workflows

AI agents are incredibly useful—but they’re not infallible. Even the most advanced LLMs operate without true understanding. They can simulate reasoning, but they can’t evaluate risk, interpret social nuance, or take accountability for decisions.

When agents are empowered to take actions, not just generate text, that gap becomes a liability.

What can go wrong?
Hallucinated actions: The agent makes up nonexistent commands, tools, or resource IDs.
Misused permissions: A vague prompt leads the agent to act outside its intended scope.
Overreach: The agent tries to approve its own access or bypass a restriction.
Lack of traceability: No one knows who authorized what, or why it was allowed.

Now imagine those behaviors in the context of changing user roles in a production system, approving infrastructure changes in a CI/CD flow, accessing knowledge bases, deleting customer data, or issuing refunds. You can see how quickly risks can escalate.

Human-in-the-loop (HITL) isn’t just about safety—it’s about control

Inserting humans at key decision points allows you to prevent irreversible mistakes before they happen, ensure accountability, so that every action has a reviewer or approver, comply with audit requirements, such as SOC 2 policies and internal governance, as well as build trust by making your AI a supervised assistant, instead of a a black box.

This isn't a nice-to-have - in many agentic workflows, HITL is the only responsible way forward.

What Delegating Permissions to Humans Really Means

When we talk about delegating permissions in AI systems, we don’t mean giving humans more buttons to press. We mean teaching agents to ask for permission—and wait.

This is the core of human-in-the-loop (HITL):

The agent doesn’t act until a human explicitly approves the request.

The HITL Control Loop

The HITL workflow follows a predictable and repeatable pattern:

https://www.notion.so/image/attachment:2c36152b-db46-4f43-b7d4-559bb670cec2:image.png?table=block&id=1f91af21-8505-80b3-843e-ec880029c936&spaceId=48f31e07-1306-4196-b097-866f06339b53&width=2000&userId=dc560c56-eb2d-4661-a5fa-fa184d52d923&cache=v2

Agent receives a task by processing a prompt or trigger.
Agent proposes an action, like “I need access to this document”.
Agent pauses and routes the request to a human approver using built-in interrupt() .
Human reviews the context and either approves or rejects the proposed action.
Agent resumes, executing the action only if it has been approved.

This pattern works across roles, industries, and use cases—from DevOps and security to customer service and compliance.

Frameworks and Libraries for HITL Integration

The agent ecosystem is evolving fast—and so are the tools designed to add human judgment into the loop.

Below is a breakdown of the most effective frameworks and libraries you can use today to build human-in-the-loop (HITL) workflows for AI agents. Each has a different focus, but all support some form of permission delegation or real-time human approval.

Quick Comparison
Framework / Tool	Strengths	HITL Support
LangGraph	Graph-based control, modular nodes, native interrupt/resume support	interrupt() pauses the graph for human input
CrewAI	Multi-agent task orchestration with role-based design	human_input flag and HumanTool support
HumanLayer	SDK/API for integrating human decisions across channels (Slack, Email, Discord)	@require_approval() decorator and human_as_tool() support
LangChain MCP Adapters	Bridges LangChain agents with external access/approval flows like Permit.io	HITL when combined with LangGraph or LangChain callbacks
Permit.io + MCP	Real-world authorization engine with UI/API-based access and operation approvals	Built-in support for access requests and delegated approvals
Framework Highlights

LangGraph is ideal for building structured workflows where you need full control over how an agent reasons, routes, and pauses. Its interrupt() function lets you pause the graph mid-execution, wait for human input, and resume cleanly, ****making it a top choice for inserting HITL checkpoints. Use it when you need custom routing logic, deterministic, debuggable behavior, or when you're managing multiple agents/tool types.

CrewAI focuses on collaborative, role-based agent teams. It’s great for decomposing tasks among agents with different goals or capabilities. HITL comes in via human_input, or by defining a HumanTool the agent can call for guidance. Use it when your workflow involves multiple agents, or when you want to keep humans in the loop as decision-makers or fallback experts.

The HumanLayer SDK enables agents to communicate with humans via familiar tools (Slack, Email, Discord). Its decorators (@require_approval, human_as_tool) wrap functions to make approval logic seamless. Use it when you want asynchronous human decisions, notifications/multi-channel communication, or when you need an orchestration-agnostic implementation.

LangChain MCP Adapters connect LangChain agents to real-world access systems (like Permit.io). They convert access request and approval tools into LangChain-compatible tools, so agents can ask for access, but require policy-defined human approval before proceeding. Use it when you're already using LangChain, you want policy-driven access control, or when you’re integrating with Permit MCP workflows.

Permit.io + MCP

Permit.io offers a complete authorization-as-a-service layer. With its Model Context Protocol (MCP) server, you can turn access and approval workflows into tools that an LLM can call but only execute after human approval via built-in logic or dashboard controls. Use it when you need to manage sensitive permissions, full auditability, and role enforcement, and want UI + API + agent-level integration.

These tools aren’t mutually exclusive.

In fact, some of the strongest HITL setups use LangGraph + MCP Adapters + Permit.io together for full control, flexibility, and policy enforcement.

Key Design Patterns for HITL in Agentic Workflows

Building a human-in-the-loop (HITL) workflow isn’t just about picking a framework—it’s about choosing where, when, and how to involve humans in the agent's decision-making process.

Below are the most effective HITL design patterns used across real-world agentic systems.

Interrupt & Resume:

Used in: LangGraph
How it works: The agent is paused mid-execution using an interrupt() call. Human input is collected (yes/no, select from options, etc.), and then the workflow resumes based on the response.
Best for:
Approving tool calls (e.g. approve_access_request)
Pausing long-running workflows
Inserting human checkpoints before final actions

Human-as-a-Tool:

Used in: LangChain, CrewAI, HumanLayer
How it works: The agent sees a "human" as just another callable tool. When it's unsure, it routes a question to the human tool and uses the returned response in context.
Best for:
Ambiguous prompts
Fact-checking or contextual clarification
Letting humans fill in gaps (e.g. “What should I do here?”)

Approval Flows:

Used in: Permit.io, ReBAC systems
How it works: Permissions are structured such that only specific human roles (e.g. “Reviewer”) can approve access or actions. Agents can initiate requests, but only users with the right roles can approve them via UI or API.
Best for:
Fine-grained, policy-backed access control
Scenarios where human approval is required by design (e.g. legal, financial ops)
Systems with delegated authority and role hierarchies

Fallback Escalation:

Used in: Hybrid agent-human systems
How it works: The agent attempts to complete a task. If it fails, lacks permissions, or gets stuck, it escalates the task to a human via Slack, email, or a dashboard for resolution.
Best for:
Reducing friction while keeping a safety net
Complex queries with low LLM confidence
Keeping human load low but available

These patterns are not mutually exclusive. The best HITL architectures often combine:

interrupt() for real-time decisions
approval roles for policy gating
fallback escalation for graceful recovery
audit-first for transparency

Use them modularly. And always design around the question:

"Would I be okay if the agent did this without asking me?"

From Theory to Practice: The Food Ordering System Demo

To see all of this in action, let’s take a look at a working example:

A family food ordering system where AI agents handle routine tasks—but humans remain in control of sensitive decisions.

This system demonstrates a real-world implementation of HITL with:

LangGraph for agent orchestration
Permit.io MCP server for access requests and approval workflows
LangChain MCP Adapters to expose those workflows as tools
Gemini 2.0 Flash as the reasoning engine
Python for the orchestration layer and CLI interface
Scenario: Delegated Access in a Family System
Parents can view and manage all restaurants and dishes.
Children can only view a subset of restaurants.
If a child wants to access a restricted restaurant or order a premium dish:
The agent initiates an access request or operation approval.
The agent then pauses using LangGraph’s interrupt() function.
A human reviewer (a parent) is prompted for approval.
The workflow resumes only if approval is granted.

This means even though the LLM handles interactions and tool selection, it never executes sensitive actions on its own.

What Makes This a Strong HITL Demo
Policy-driven: All permissions and approval logic are managed via Permit.io
Real-time approvals: interrupt() ensures decisions are deliberate
Auditable and extensible: Every access request is logged, every tool call is human-verified
Modular design: Easily adaptable to other domains—DevOps, finance, internal tools
Try it Yourself

Explore the full implementation in the open-source repo

Best Practices & Final Thoughts

As AI agents take on more responsibility in our workflows, building for oversight isn’t optional—it’s foundational. Human-in-the-loop (HITL) systems strike the right balance between speed and safety, automation and accountability.

Whether you're adding simple approval gates or designing complex agent workflows with delegated authority, here are the best practices to follow:

Design for Decision Points, Not Just Prompts

Identify where human input is critical—access approvals, configuration changes, destructive actions—and design explicit checkpoints. Use tools like interrupt() to enforce those pauses.

Keep Prompts Contextual and Lightweight

When asking humans for approval, keep the request clear, focused, and explain why it's needed. Don't overload reviewers with raw JSON—summarize context when possible.

Use Policies, Not If-Statements

Hardcoding access rules leads to weak, non-scalable logic. Delegate approval logic to a policy engine, where changes are declarative, versioned, and enforceable across systems.

Log Everything

Audit trails aren’t just for compliance—they’re part of the HITL loop. Ensure that every access request, approval, and denial is tracked and reviewable.

Think Asynchronously When Needed

Not every human needs to approve something in real time. For low-priority or non-blocking flows, route to async review channels (Slack, email, dashboards) using frameworks like HumanLayer.

Human-in-the-loop is not a temporary workaround—it’s a long-term pattern for building AI agents we can trust. It ensures that LLMs stay within safe operational boundaries, sensitive actions don’t slip through automation, and teams remain in control—even as autonomy grows.

With tools like LangGraph, Permit.io, and LangChain MCP Adapters, it’s easier than ever to give agents the ability to ask for permission—without hardcoding approvals or sacrificing usability.

The best agents aren’t just intelligent. They’re responsible.

Further Reading & Tools
Permit.io MCP + ReBAC Docs
LangGraph interrupt() Reference
LangChain MCP Adapters
Demo GitHub Repo

Written by
Gabriel L. Manor

Full-Stack Software Technical Leader | Security, JavaScript, DevRel, OPA | Writer and Public Speaker

Read More from Gabriel
Related Tags
AI Identity
More to read
Exploring the x402 Protocol for Internet-Native Payments
The Ultimate Guide to MCP Auth: Identity, Consent, and Agent Security
What the OpenAI–Mixpanel Incident Really Reveals About Metadata Risk
Exploring the x402 Protocol for Internet-Native Payments
The Ultimate Guide to MCP Auth: Identity, Consent, and Agent Security
What the OpenAI–Mixpanel Incident Really Reveals About Metadata Risk
Exploring the x402 Protocol for Internet-Native Payments

Like this Article?

Star us on Github

Disagree?

Tell us why

Want more?

Join our Substack
Test in minutes,
go to prod in days.
Get Started Now
Join our Community

2938 Members

Get support from our experts,
Learn from fellow devs
Join Permit's Slack

Fullstack Permissions

PRODUCT
Blog
Videos
Pricing
FAQ's
Docs
Roadmap
SOLUTIONS
RBAC
ABAC
ReBAC
Elements
Healthcare
CLI
COMPANY
About
Customers
Open Source
Careers
SUPPORT
Terms & Conditions
Privacy Policy
Service Status
Talk With an Engineer
Email
CERTIFICATIONS & COMPLIANCE
Pending

© 2026 Permit Inc.