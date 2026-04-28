# 04-06 Lecture: AI-Assisted Academic Writing and Retro Code

Date: 2026-04-06 18:07:26
Location: [Insert Location]
## Summary
This series of lectures and discussions provides a comprehensive overview of using AI assistants, such as Claude, to aid in academic and development workflows.
The first part, led by QiuYang, focuses on academic paper writing. Xiu shares his personal workflow, which eschews traditional web-based tools like Overleaf's interface in favor of a local, IDE-based setup using Git. He details several use cases for AI, including polishing text, resolving comments, drawing figures using TikZ, and conducting automated paper reviews. A significant portion of the lecture is dedicated to an advanced, experimental method for writing a paper from scratch with AI. This method emphasizes a system of sub-agents that continually learn from user feedback to minimize human intervention and align with the user's preferences and project details. The talk concludes with a caution about the current limitations and risks of fully automated AI writing.
The second part introduces a side project, Retro Code, designed to help users benefit from their interaction histories with AI coding agents like Cocal, Cursor, and Codex. The primary motivation is to reclaim value from the vast amounts of money spent on agent tokens. Retro Code analyzes local agent trajectories to automatically generate and share skills, create playbooks for better future interactions, test hypotheses about agent behavior, and provide personalized usage analytics. The tool aims to create a feedback loop where past interactions, especially failures, are condensed into actionable knowledge to improve agent performance and facilitate knowledge sharing among users.
The final part is a discussion session. The first half is a Q&A about the Retro Code system, covering its scenarios, the granularity of skill creation, and the challenges of evaluating skill effectiveness, including cost and privacy concerns. The second half shifts to a group discussion on using AI for academic paper writing. Participants share personal workflows, compare different models (ChatGPT, Claude, Gemini) for various tasks, and discuss the challenges of maintaining a personal writing style while avoiding discernible AI-generated text patterns.
## Knowledge Points
### 1. Introduction to AI-Assisted Note-Taking and Paper Writing
- **Interacting with Notes**
  - Melissa introduces a system for interacting with lecture notes in two primary ways.
  1. **Web Page Interaction:** Users can visit a web page to perform keyword searches. This interface provides access to slides, AI-generated meeting summaries (transcripts), and notes generated from the slides.
  - 
  2. **Direct Repository Interaction:** Users can `git clone` the note directory and use tools like Claude Code or Cursor to directly ask questions about the content.
  - The goal is to enable users to ask specific questions and get answers by searching the repository.
- **Overview of Xiu Yang's Talk**
  - The main speaker, Xiu Yang, will discuss the controversial topic of using AI assistants for academic paper writing.
  - The talk will cover:
    - A quick setup for a local AI paper writing workflow.
    - Four common use cases: polishing writing, resolving comments, drawing figures, and AI review.
    - A method for writing a paper from scratch with AI, where the AI continually learns to understand the project.
    - Tips for avoiding hallucination, speeding up the process with sub-agents, and minimizing the need for human-in-the-loop.
### 2. Local Workflow for AI-Assisted Paper Writing
- **Personal Setup**
  - The speaker, Xiu Yang, advocates for a local-first workflow, minimizing the use of the Overleaf web page.
  - The process involves using `git clone` to bring the Overleaf project into a local IDE.
  - Benefits of the local IDE include smart AI for next-line completion and the ability for an AI agent to read the entire paper structure to make edits.
  - Changes are pushed back to Overleaf, similar to a standard GitHub workflow.
- **Polishing Writing**
  - The speaker argues that using a web interface like ChatGPT to polish text is a bad practice for academic writing because it requires manually copying and pasting a large amount of context.
  - The recommended practice is to ask a local Claude agent to polish the text, as it can automatically find the necessary context from the project files.
- **Resolving Comments**
  - Using the Overleaf comment feature is considered inefficient for an AI-driven workflow because AI agents cannot retrieve those comments.
  - The suggested method is to leave comments directly within the `.tex` file, allowing an agent to find all comments, identify context, and propose solutions automatically.
  - The user still reviews the AI-generated patches before accepting them.
- **Drawing Figures**
  - For generating figures from results, the speaker recommends having the AI generate TikZ code instead of Python code (e.g., Matplotlib).
  - The advantage of TikZ is that the figure's source code can be stored directly in the `.tex` file, making it more convenient for future iterations.
  - The raw data for the figures should be stored in the same project directory.
### 3. AI for Paper Review
- **Critique of Existing Tools**
  - Many students use tools like the "Stanford Engineering Reviewer" website, which the speaker argues is a bad practice due to weaker models and an inefficient manual process.
- **Local AI Reviewer Agent**
  - The technical details of the Stanford reviewer are publicly available, allowing one to create a local sub-agent using a more powerful model like Claude Code.
  - **Advantages of a Local Reviewer:**
    - Can use a more powerful model.
    - Can be called automatically and unlimitedly.
    - Enables "self-play," where one agent proposes review comments and another agent automatically tries to resolve them.
  - The speaker runs this reviewer agent periodically using `tmux`, even overnight.
### 4. Writing a Paper From Scratch with AI (Experimental)
- **Initial Setup**
  - This is presented as a new and experimental method, not recommended for real paper submissions yet.
  - Start with an empty paper directory and place a few reference papers (ideally `.tex` source files from the same conference) inside to help the AI learn the style.
  - **Crucially**, do not include papers from a similar research area to avoid paraphrasing.
- **High-Level vs. Concrete Writing Process**
  - It's better to start from a high-level outline rather than concrete sections. This helps the AI gradually understand the project's concepts as the user provides guidance.
- **Advanced Sub-Agent System for Continual Learning**
  - The goal is to reduce human-in-the-loop effort by having agents that continually learn and distill the user's knowledge.
  - The system prompt is to "reduce the human in the loop." Any user interruption is treated as a failure, prompting the agent to reflect and update its memory.
  - The AI maintains a long-term memory of user preferences and project details.
  - This system uses multiple, customized sub-agents (e.g., Technical Review, Human Preference Review, Action Agent) that run in an automated loop to review and improve the paper.
### 5. Retro Code System: Motivation and Core Concept
- **Problem Statement: Reclaiming Value from Agent Interactions**
  - Users spend significant money on AI coding agents, but model companies primarily benefit from the interaction trajectories used for training.
- **Proposed Solution: Retro Code**
  - A repository that takes a retrospective approach by reading a user's local agent trajectories (from Cocal, Cursor, Codex) to extract and share insights.
- **Primary Goal: Enhance Agent Performance and Share Knowledge**
  - The project aims to auto-generate skills and "playbook" (`cloud.md`) files from interaction histories and share them with the community.
### 6. Core Capabilities of Retro Code
- **1. Playbook Generation**
  - Automatically generates rules in a `cloud.md` file based on a user's interaction history, helping agents learn from past mistakes.
  - A reflection prompt acts as a "rational coach," focusing on human-agent interactions to fix user-identified issues.
  - These rules are appended to `cloud.md` to be included in the context of new sessions.
- **2. Skill Sharing**
  - Allows for simple sharing of skills derived from agent trajectories.
  - **Exporting/Importing:** Retro Code can export learned skills into a `.tar` file, which can be imported by others using various merge strategies (`local-first`, `smart-merge`, `interactive`, `dry-run`).
- **3. Hypothesis Generation and Testing**
  - Identifies patterns in agent behavior that predict future failures by detecting negative user feedback signals (e.g., "no, this is wrong").
  - **Community Sharing Platform:** Users can contribute hypotheses to a public repository (`Retro contribute`) and pull hypotheses from others (`Retro pull hypotheses`) to test on their private trajectories without sharing proprietary code.
- **4. Analyze Me**
  - A feature similar to Spotify's annual report that analyzes usage patterns like interaction times, session duration, and frequently used tools.
### 7. Retro Code System Q&A
- **Core Functionality and Use Cases**
  - The system's primary use case is automatically generating executable skills from summaries of conversation histories.
- **Skill Granularity and Portability**
  - A significant challenge is that generated skills can be machine-specific. A potential solution is to make skills more robust by adding checks (e.g., verifying GPU version) and allowing the skill to attempt a fix itself.
- **Evaluation of Generated Skills**
  - A key challenge is measuring skill effectiveness. Proposed methods include testing against benchmarks like Swebench or training on one half of a user's session and evaluating on the other.
  - Running these evaluations is very costly and difficult in an academic setting.
- **Privacy Concerns and Data Access**
  - Creating a benchmark from real user development history raises significant privacy issues, as it would require others to access private code.
### 8. AI in Academic Paper Writing: Group Discussion
- **General Workflows and Model Usage**
  - A common workflow is to write the main content manually and use AI for polishing.
  - Another approach is to have the AI generate a first draft from a detailed outline, then take manual control for refinement.
  - One user employs a "parallel agents" strategy, having multiple sub-agents generate different versions and another agent rank or merge them.
- **Model Strengths and Preferences**
  - **ChatGPT**: Good for initial brainstorming and localized proofreading.
  - **Claude Code**: Considered very effective for writing methodology/implementation sections as it can analyze a whole code repository.
  - **Gemini**: Described as more "creative" and effective for generating a polished first draft from scratch.
  - **Opus**: Considered good at writing a rough draft.
- **Recognizing AI-Generated Text and Maintaining Voice**
  - Participants noted that AI-generated text often has recognizable patterns.
  - A suggested strategy to maintain a personal writing style is to have an AI analyze one's past papers to extract stylistic elements ("voice").
## Questions
- [Insert Question/Confusion]
## Assignments
- [ ] 1. For those interested, try setting up a local paper writing workflow by cloning an Overleaf project to a local IDE and interacting with it using an AI assistant like Claude Code or Cursor.
- [ ] 2. Experiment with leaving comments directly in the `.tex` file and prompting an AI agent to find and resolve them.
- [ ] 3. Try using an AI assistant to generate TikZ code for a figure instead of using a separate plotting library.
- [ ] 4. Investigate the possibility of creating a local paper-reviewing agent based on publicly available instructions or prompts.
- [ ] 5. Try using the Retro Code tool, especially for complex development workflows like installing SkyDiscoverer or vllm, to see if it generates useful skills.
- [ ] 6. Test the hypothesis generation and contribution features by running `Retro contribute` and `Retro pull hypotheses`.
- [ ] 7. For those interested, contact the speaker to receive $20 in credits to test the Retro Code tool.
- [ ] 8. A paper on learning from traces in parallel is expected to be put on arXiv on April 7, 2026.
- [ ] 9. Consider running an experiment where skills are generated from all lab members' traces and then given to an agent to test performance improvements on Swebench Pro.
- [ ] 10. Ethan will lead a discussion on April 13, 2026, about using Obsidian and other tools for automating note-taking.