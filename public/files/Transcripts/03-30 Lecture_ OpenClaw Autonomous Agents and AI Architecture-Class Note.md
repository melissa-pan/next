# 03-30 Seminar: Autonomous Agent System Architecture, Connectors, Memory, Scheduling, and Security

Date & Time: 2026-03-30 18:05:00
Location: [Insert Location]
Speaker: Alex (with contributions from Melissa and others)
Subject
- Autonomous System Design Principles
- Open Claw/OpenCLAW/OpenCloud Architecture
- Agentic Workflow & Tools Integration
- Sessions, Connectors, and Scoped Permissions
- Configuration via Markdown (user.md, soul.md, agents.md, tools.md, bootstrap.md, heartbeat.md)
- Memory Management and Indexing
- Cron/Cron-like Heartbeat Scheduling
- Admin UI and Model Selection (Opus/Sonnet)
- CLI Integrations and Local Hosting
- Tools vs Skills (Anthropic skills), LSP tools, ACP sub-agents
- Security Considerations and Operational Setup
- Real-World Workflows (Slack/Sheets scheduling, email digests, prototyping, ML orchestration, website deployment)
Summary
Evolution of Agentic Systems and Goals
- Progression from single-pass next-token predictors to assistants, to scoped tool-using agents (React loops), to autonomous agents with dynamic tool discovery, environment control, parallelism, and recursive context feedback (“loopiness”). The Matryoshka metaphor illustrates nested wrappers culminating in an outer supervisory layer that owns the environment and babysits jobs over time.
- Open Claw’s goal—“the AI that actually does things”—requires closing control loops, navigating ambiguity, and extensibility to arbitrary tasks via flexible interfaces and tooling.
Architecture and Layers
- Layered stack:
  - Connectors: Adapt external platforms (Discord, WhatsApp, Telegram, Gmail, SMS) into internal messages and sessions, often via reverse-engineered flows (e.g., WhatsApp QR→token→web backend). Reliability varies by platform and setup; Telegram is commonly stable, while WhatsApp/iMessage can be brittle.
  - Gateway Controller: Manages sessions, memory indexing, basic security, scheduling (heartbeat/cron), IPC, and context compaction; stores overflow history per-session in filesystem folders. Offers a notion of security and scoped permissions but is constrained by platform-level limitations.
  - Agent Runtime: Assembles rich context and orchestrates repeated LLM calls, tool use, dynamic tool discovery, parallel execution, sub-agent spawning via ACP, and reinjection of outputs. It is an outer supervisory layer distinct from basic React loops and can spin up and manage multiple code sessions while owning the environment.
  - Providers: Remote LLMs and MCP servers; local components (connectors, gateway, runtime, web UI) run on the host.
Sessions, Threads, and Routing
- Sessions are process-like containers with isolated context, scoped permissions, and IPC; they can spawn multiple sub-agents (threads). Special sessions include:
  - Main session: full admin privileges through the admin UI.
  - Heartbeat session: wakes periodically (e.g., every 30 minutes) to check heartbeat.md and trigger scheduled tasks or escalate issues.
- Connectors map external channels to sessions (e.g., each Discord channel → its own session), enabling strict context isolation and permission scoping per project. Optional sandboxing via containers further restricts capabilities.
Context, Memory, and Prompt Composition
- System prompt enumerates tools, ACP usage for sub-agents (e.g., Claude Code), safety guardrails (no power-seeking/self-preservation/replication; avoid long-term plans absent user request; prioritize human oversight), skills inclusion, memory policy, workspace info, agent/tool metadata, and heartbeat behavior. The runtime then attaches the user message and chat history to form a single structured LLM call.
- Memory management: Gateway indexes past conversations and daily summaries into a memory store; sessions may share subsets of memories with scoped permissions. Additional artifacts (e.g., PDFs) can be ingested. Plugins can partition memories by threads, but leakage risks require careful configuration. Timing of memory updates (during vs after sessions) needs tracing; indexing occurs at startup.
Configuration via Markdown and Identity Evolution
- Text-first configuration stored in markdown:
  - user.md (user info and trust rules),
  - soul.md (temperament, values, boundaries; notify user on changes),
  - agents.md (agent behavior guidance),
  - tools.md (available tools),
  - bootstrap.md (self-identification prompts on startup),
  - heartbeat.md (items for periodic checks).
- On startup, bootstrap.md drives an identity conversation and context compilation (e.g., name, location, research, education, skills, links), populating user.md and soul.md with ongoing LLM-guided updates.
Tools, Skills, and ACP Sub-Agents
- Tools:
  - Built-in: read, write, edit, grep, code search, cron, inter-session communication.
  - MCP-provided: ingested from tool server descriptions.
  - Auto-generated LSP tools (hover/definition/references) for code navigation and refactoring.
- Skills (Anthropic text recipes): Named, tiered textual instructions (up to 150 skills or 30k characters) that guide procedures and tool use (e.g., OnePassword setup). Skills are easy to author/install and are widely adopted; when limits are exceeded, selection logic narrows context to relevant skills.
- ACP (agent-client protocol): Launches and manages sub-agents like Claude Code with structured I/O, offering a principled alternative to ad-hoc terminal multiplexing.
Scheduling: Heartbeat and Cron
- Heartbeat: Periodic wake-ups (default 30 minutes) inject heartbeat.md items for monitoring and can trigger “heartbeat_ok” or escalations to responsible sessions.
- Cron manager: Agents create and maintain jobs.json entries to schedule future wake-ups (e.g., meetings, monitoring, digests) without explicit user scheduling each time. OS-level cron wakes sessions to act with preserved history.
Admin UI and Model Selection
- The admin portal surfaces costs, channels, instances, session details, and a chat interface to the main thread (admin). It supports runtime configuration, including model switching between Sonnet (routine) and Opus (critical or complex reasoning), and even code modification for advanced users. Complaints about “bot-like” responses are attributed to model quality, not the framework.
Operational Setup and Local Hosting
- Strong recommendation: run on a dedicated, isolated VM (e.g., EXE.dev) or behind a private network (e.g., Tailscale), not on a personal laptop. Avoid public exposure; use authenticated local connectivity. Some setups use dedicated phone numbers/subnets to isolate agent traffic.
- Local stack: connectors, gateway/controller, agent runtime, and a localhost web UI run on the machine; providers remain remote. Idle agents sleep; cron wakes sessions as scheduled.
Integrations and Automation Patterns
- CLI-first integration: Trend toward using official CLIs (e.g., Google Workspace CLI) over MCPs for stability and discoverability. Agents authenticate via dedicated tokens/emails to check mail, create Docs, prepare reports, generate graphs, and share documents. Agents can also start Claude Code locally and choose when to switch models (e.g., Sonnet → Opus) for important tasks.
- Discord/Sheets/Slack orchestration:
  - Weekly Slack scheduler: Every Friday at 9:00 a.m., read a shared sheet for the talk schedule, send a topic-based pun, handle swap requests in-thread by querying next speakers and updating the sheet; optional confirmation to the alternate speaker is feasible.
  - Monday email digests: Cron wakes a session at 9:00 a.m. to pull papers from the last 24 hours, summarize, and email a digest automatically.
- Side quest pattern: A “/sq” message can trigger automatic creation of a new channel/session, loading context for a fresh project, announcing readiness, and running autonomously.
Security, Permissions, and Reliability
- Scoped tokens and permissions: Sessions are scoped to minimize risk (e.g., customer support read-only with limited DB access vs. dev sessions with code write access). GitHub’s fine-grained tokens are recommended; messaging apps often lack robust scoping.
- API keys: Special handling keeps keys out of regular context and tries to prevent saving; bypasses may exist.
- Prompt-injection and supply-chain risks: Soft prompts can be overridden; binary skills may hide malicious behavior; granting deep access (e.g., email/financial accounts) increases exposure.
- Reliability variability: Connector success varies by platform and setup; Telegram tends to be reliable; WhatsApp/iMessage/Signal/Gmail can work but may require trial-and-error and model choice (e.g., Claude 4.x vs Sonnet) affects guided setup quality.
Real-World Use and Demonstrations
- Adoption: Reported widespread experimentation (notably in China and among NY product teams) for prototyping, inbox management, and autonomous workflows. Friction is acknowledged; broader adoption is expected over time.
- Automated website deployment: From a simple request (“I want a website on how attention works”), the agent provisioned an EXE.dev VM, copied assets, configured public access, and deployed the site—emphasizing integration orchestration over mere content generation.
- ML orchestration: Given a paper/codebase, the agent designed a pipeline, detected lack of local GPU, used Modal for training, monitored progress, and delivered results in a Google Doc.
- Inter-agent skill exchange: Agents can package and email skills to each other, verify trusted senders based on user.md rules, request approval via Discord, and auto-install—enabling autonomous capability growth with optional human oversight.
- Workflow exemplar: Draft PRD/design docs → launch multiple Claude Code instances → open browser and capture screenshots → solicit feedback → iterate → compose and send team emails—demonstrating the outer supervisory layer that manages environment, parallelism, and communications.
Shifts in Engineering Focus
- With coding assistants handling much of implementation, code quality concerns are deprioritized relative to design and architectural abstractions. Strategic design choices and reliable orchestration across tools and sessions are increasingly the differentiators.
Homework
- Set up at least one messaging connector (e.g., Discord or Telegram) and document the setup, including any QR/token flows and failures.
- Configure a dedicated, isolated VM (e.g., via EXE.dev or Tailscale) and avoid running on a personal laptop; ensure no public exposure.
- Initialize bootstrap.md, complete identity discovery, and populate user.md and soul.md with clear trust rules; notify on soul.md changes.
- Create scoped sessions with distinct permissions (e.g., read-only customer support vs. read/write dev workflow) and test IPC.
- Implement heartbeat and cron: add a heartbeat.md check for a long-running job; schedule a Monday 9:00 a.m. paper digest email; schedule a time-delayed task and verify session wake-up.
- Configure Google Workspace CLI with a dedicated agent email and verify email checking, Doc creation, report preparation, and graph generation.
- Generate LSP tools for a sample codebase; perform a refactor using definition/references plus edit/write.
- Compare model guidance (Claude 4.x vs Sonnet) during connector setup; track success rate and issues; define policy logic for dynamic model switching (Sonnet vs Opus).
- Define memory partitioning policies by session/thread; trace timing of memory updates and add safeguards (rate limits, quotas, heartbeat protection) against resource exhaustion attacks.
- Review and harden security posture: scoped tokens, API key isolation, prompt-injection mitigation, and policies for accepting external skills/binaries.