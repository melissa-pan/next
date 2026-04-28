# Notes on Vibe Paper Writing

Date: April 6, 2025

These notes summarize the talk **Introduction to Vibe Paper Writing** and reorganize it into a practical chapter-style guide for researchers and students who want to use local AI tools to write papers more effectively without losing control over accuracy, authorship, or technical substance.

Source materials:

- Slides: [Vibe paper writing.pdf](../Slides/Vibe%20paper%20writing.pdf)

---

## 1. Core idea

The central idea of the talk is that **AI-assisted paper writing works best when it is local, context-rich, and embedded in the real writing workflow**.

The point is not to dump isolated paragraphs into a web chatbot and hope for good prose. The point is to build a writing environment where the AI can see:

- the full paper source,
- nearby sections,
- co-author comments,
- references,
- figures,
- and the structure of the project as a whole.

This is the main shift:

> Treat paper writing as a **project-level workflow** rather than a sequence of disconnected chat prompts.

That is why the talk emphasizes local IDEs, local copies of Overleaf projects, subagents, and writing top-down from high-level ideas.

---

## 2. What "vibe paper writing" means

In this talk, "vibe paper writing" does not mean careless writing or letting AI invent the paper for you.

Instead, it points to a workflow in which:

- AI helps with drafting,
- AI improves style and clarity,
- AI helps resolve comments and edits,
- AI can assist with figures and reviews,
- but humans still supervise factual correctness and scientific judgment.

So the workflow is neither:

- purely manual academic writing,
- nor fully automated paper generation.

It is a **human-supervised AI writing system** for research papers.

---

## 3. Why local writing environments matter

One of the strongest practical recommendations in the slides is to set up a **local AI writing environment**.

The suggested workflow is:

1. sync the Overleaf project locally using Git,
2. edit the paper in a local code IDE,
3. use local AI assistance directly over the project files.

### Why this is better than web chat

If you copy-paste a paragraph into a web chat interface, the model only sees a narrow snippet. It usually does not know:

- how the section connects to the rest of the paper,
- what notation is already defined,
- what claims were made elsewhere,
- which references are already cited,
- or what style the paper has established.

A local project-aware agent can reason over the actual repository of the paper.

That gives it much better context for:

- polishing writing,
- preserving terminology,
- keeping notation consistent,
- and making edits that fit the whole document.

### Example

Suppose your methods section uses the term "cross-layer validation" while the introduction calls the same idea "multi-source verification."

A web chat revision of one paragraph may not notice the mismatch.

A local agent working over the whole project can:

- detect inconsistent naming,
- propose a single term,
- and update the relevant `.tex` files consistently.

---

## 4. Recommended setup

The deck presents a lightweight setup rather than a complicated research infrastructure.

### 4.1 Put the Overleaf project under local version control

The first step is to connect the Overleaf project to a local Git workflow.

This matters because it gives you:

- local files,
- version history,
- easy inspection of diffs,
- and compatibility with code IDEs and coding agents.

### 4.2 Write in a local code IDE

The talk recommends writing the paper inside a local IDE rather than treating Overleaf as the primary editing surface.

That enables:

- next-line completion,
- project-wide edits,
- agent-based assistance across many files,
- and easier integration with scripts or figure-generation tools.

### 4.3 Use an agent that can edit across the project

The slides specifically point out that you can ask the agent to make edits "through the project."

That is an important distinction.

Academic papers are not single paragraphs. They are interdependent systems involving:

- `main.tex`,
- section files,
- bibliography files,
- figure source files,
- appendices,
- and comment threads from co-authors.

Project-aware editing is therefore much more valuable than paragraph-only editing.

---

## 5. Polishing academic writing

One of the most immediate use cases for AI is polishing prose.

The talk contrasts:

- **bad practice:** copy-pasting writing into a web chat interface,
- **better practice:** asking a local coding or writing agent with full project context.

### Why polishing is a good AI task

Polishing is often well suited to AI because the model can help with:

- clarity,
- conciseness,
- grammar,
- sentence flow,
- and tone normalization.

These are local improvements that benefit from context but do not necessarily require the model to invent new scientific content.

### What the human should still control

Even in polishing mode, the human still needs to verify:

- whether the technical meaning changed,
- whether hedging became too strong or too weak,
- whether citations still support the claim,
- and whether the style matches the field and target venue.

### Example prompt pattern

A good local instruction might be:

> Rewrite this subsection to improve clarity and flow, but do not change the technical claim, notation, or citation structure. Keep the tone suitable for a systems conference paper.

This is much better than simply saying:

> Make this better.

The more precisely the task is framed, the more reliable the result tends to be.

---

## 6. Resolving co-authors' comments

The slides also highlight an underrated use case: handling co-author comments.

The talk argues against treating the Overleaf comment UI as the main place for unresolved writing discussion.

Instead, the recommendation is closer to:

- put substantive comments directly into the `.tex` source,
- let the agent see them in context,
- and resolve them where the actual paper text lives.

### Why this is powerful

Co-author comments are often not isolated editing requests. They may involve:

- rewriting a claim,
- clarifying an experimental detail,
- moving text between sections,
- or updating several places to maintain consistency.

An agent with access to the actual source files can often do a better job of resolving such comments than a chat model looking at one comment out of context.

### Example

Imagine a co-author writes:

```tex
% TODO: This paragraph overstates the robustness claim.
% Can we make the limitation clearer and connect it to Table 3?
```

A project-aware agent can:

- inspect the paragraph,
- look at `Table 3`,
- soften the claim,
- add a limitation sentence,
- and update neighboring text if needed.

This is much closer to real collaborative writing than isolated sentence polishing.

---

## 7. Drawing figures with AI

Another strong practical point from the slides is about figures.

The talk contrasts:

- **bad practice:** generate Python plotting code with AI and then drop the output into the paper,
- **better practice:** use `TikZ` together with a coding agent.

### Why TikZ is preferred here

For academic papers, especially in theory, systems, or methods-oriented work, TikZ has several advantages:

- figures live alongside the source,
- styles are reproducible,
- version control works cleanly,
- labels and typography match the paper,
- and small edits do not require manually re-exporting images.

### Why an AI agent helps

TikZ is powerful but tedious.

A coding agent can help by:

- drafting figure skeletons,
- aligning nodes,
- adjusting spacing,
- refining captions or labels,
- and applying consistent visual structure across figures.

### Example

Suppose you want a pipeline diagram showing:

- input traces,
- an embedding module,
- a validator,
- and an alerting output.

An agent can generate a first-pass TikZ diagram, and the human can then refine:

- exact wording,
- what should be emphasized,
- and whether the diagram accurately matches the method.

This keeps the figure editable and paper-native.

---

## 8. AI paper review

The deck also recommends using AI for review, but in a very specific way.

The warning is against relying on generic AI paper-review websites. Instead, the suggestion is to build a **local review subagent**.

The slides also mention using **self-play** between:

- a writing agent,
- and a reviewing agent.

### Why this is a good pattern

Writing and reviewing are different tasks.

A writing agent is often trying to:

- make the paper coherent,
- emphasize contributions,
- and present a strong narrative.

A review agent should instead try to:

- find ambiguity,
- identify missing assumptions,
- challenge unsupported claims,
- and detect weak experimental justification.

Using different roles encourages more adversarial and therefore more useful feedback.

### Example workflow

1. The writing agent drafts or revises a section.
2. The review agent critiques it like a conference reviewer.
3. The writing agent responds to that critique with revisions.
4. The human decides which critiques are legitimate and which are noise.

This is not a replacement for human review, but it is a good way to surface issues earlier.

---

## 9. Writing from scratch with AI

The second half of the deck moves from assistance to full-paper drafting workflow.

The talk recommends several principles.

### 9.1 Put reference papers in the same directory

The slides recommend placing a few reference papers alongside the project.

The ideal references are:

- from the same target conference,
- but from different research areas.

The stated reason is important:

> use venue-aligned references for style and structure, but avoid papers that are so close in topic that the model drifts toward plagiarism.

This is a smart constraint. It gives the model examples of:

- tone,
- section organization,
- expected level of detail,
- and conference style,

without encouraging near-copying of a directly competing paper.

### 9.2 Use a top-down writing paradigm

The talk describes a contrast between traditional writing and vibe writing.

Traditional writing often starts with concrete sections such as:

- methods,
- experiments,
- implementation details.

Only later does the author write:

- the introduction,
- the abstract,
- and the conclusion.

Vibe writing flips this.

It recommends starting with a few high-level bullets, especially for:

- the abstract,
- and the introduction,

then expanding those ideas top-down into a full paper.

### Why top-down writing helps

This is one of the most important ideas in the deck.

Starting from high-level bullets forces the author to define:

- the problem,
- the motivation,
- the key insight,
- the contributions,
- and the main experimental message.

If those are unclear, the rest of the paper usually becomes muddy.

AI can be especially helpful once those high-level bullets exist, because it can expand structure into prose.

### Example

A top-down seed might look like:

- The problem is that current validators rely on a single telemetry source.
- Our idea is to compare control inputs against orthogonal observations.
- The benefit is earlier detection of inconsistent or unsafe behavior.
- The main result is improved anomaly detection under realistic noise.

From there, the agent can help draft:

- an abstract,
- an introduction arc,
- section outlines,
- and transitions between sections.

---

## 10. Avoiding hallucinations

The slides explicitly warn that humans still need to stay in the loop.

This is the central safety constraint of AI paper writing.

### What hallucinations look like in papers

Hallucinations in academic writing are especially dangerous because they can appear polished while being wrong.

Common failure modes include:

- invented citations,
- overstated claims,
- incorrect descriptions of methods,
- fabricated experimental rationale,
- and smooth but inaccurate explanations of why a result occurred.

### Why human oversight is non-negotiable

The human author must verify:

- every scientific claim,
- every experimental detail,
- every citation,
- every quantitative statement,
- and every causal explanation.

The AI can help with expression and drafting, but it should not be trusted as the final source of truth.

### Practical rule

A good operational rule is:

> Let AI expand, polish, reorganize, and critique, but let humans own truth.

That is probably the most important principle in the entire talk.

---

## 11. Using subagents

The slides mention **subagents** as part of the writing-from-scratch workflow.

This is a strong idea because paper writing naturally contains multiple subtasks that benefit from specialization.

Possible subagent roles include:

- a writing agent,
- a reviewer agent,
- a citation-checking agent,
- a figure agent,
- a rebuttal or response-to-comments agent,
- and a formatting or cleanup agent.

### Why subagents help

A single agent trying to do everything often mixes goals.

For example:

- one part of the process wants persuasive storytelling,
- another wants skeptical review,
- another wants stylistic cleanup,
- and another wants structured figure generation.

Separating these roles can improve focus and reduce prompt confusion.

### Example

A simple subagent workflow might be:

1. the outline agent expands bullet points into section outlines,
2. the draft agent writes first-pass prose,
3. the review agent critiques novelty and clarity,
4. the figure agent drafts TikZ diagrams,
5. the cleanup agent standardizes notation and style.

The human remains the supervising editor across all of them.

---

## 12. Minimizing human-in-the-loop does not mean removing humans

The slides mention minimizing human-in-the-loop, but this should be read carefully.

It does **not** mean fully removing human authorship or verification.

Instead, it means reducing low-value manual effort such as:

- repetitive rewriting,
- project-wide cleanup,
- formatting fixes,
- repetitive comment resolution,
- and boilerplate figure editing.

This frees the human to spend more time on:

- scientific judgment,
- experimental design,
- conceptual framing,
- and deciding what the paper should actually say.

### Better interpretation

The ideal is not "human absent."

The ideal is:

- human at the right abstraction level,
- AI doing the repetitive and structure-heavy labor,
- and final intellectual ownership staying with the researchers.

---

## 13. A full end-to-end workflow

Putting the talk together, a good vibe paper writing workflow looks like this.

### Step 1: Set up the paper locally

- sync Overleaf with Git,
- open the paper in a local IDE,
- make sure the whole project is visible to the agent.

### Step 2: Seed the project with references

- add a few venue-appropriate reference papers,
- use them for style and organizational cues,
- avoid overly similar papers that may bias toward plagiarism.

### Step 3: Start top-down

- write high-level bullets for the abstract and introduction,
- define the problem, idea, contribution, and evidence,
- use the agent to expand these into outlines and drafts.

### Step 4: Draft section-by-section

- methods,
- experiments,
- limitations,
- discussion,
- related work,
- conclusion.

### Step 5: Use specialized assistance

- polishing agent for prose,
- review agent for critique,
- figure agent for TikZ,
- cleanup agent for notation consistency,
- comment-resolution agent for co-author feedback.

### Step 6: Human verification

- validate claims,
- check citations,
- inspect equations,
- verify figure accuracy,
- ensure the final narrative is actually true.

This sequence captures the spirit of the deck well.

---

## 14. Practical examples

To make the talk more concrete, here are a few examples of good uses of the workflow.

### Example 1: Rewrite a weak introduction

Input:

- an introduction that is technically correct but too verbose and unfocused.

Good AI task:

- shorten the motivation,
- clarify the problem statement,
- sharpen the contribution bullets,
- preserve the technical claims.

### Example 2: Resolve scattered co-author feedback

Input:

- multiple TODO comments across `.tex` files.

Good AI task:

- gather the comments,
- cluster them by topic,
- revise the paper consistently,
- leave a summary of what changed and what still needs a human decision.

### Example 3: Create a clean method figure

Input:

- a rough block diagram sketched in words.

Good AI task:

- convert it into TikZ,
- align typography with the paper,
- revise labels for consistency,
- leave the source editable in the repo.

### Example 4: Internal review before submission

Input:

- a near-final draft.

Good AI task:

- produce reviewer-style criticism,
- identify unclear claims,
- point out missing baselines or unmotivated choices,
- suggest likely reviewer questions.

These are all high-leverage tasks because they are tedious, structured, and benefit from full-project context.

---

## 15. What not to outsource to AI

The slides are optimistic, but they also imply clear limits.

You should not outsource:

- the scientific truth of the paper,
- the central novelty claim,
- interpretation of results without verification,
- citation correctness without checking,
- or the final authorship judgment of what should be said.

AI can help write the paper.
It should not be allowed to decide what is true.

---

## 16. Final takeaway

The deepest lesson of the talk is that AI paper writing becomes much more useful when it is treated as a **local, structured, supervised workflow** rather than a casual chat experience.

The most important ingredients are:

- a local project-aware environment,
- top-down drafting from high-level ideas,
- direct editing of source files,
- AI support for polishing, review, comments, and figures,
- subagents for specialized writing tasks,
- and strong human oversight to prevent hallucinations and preserve scientific integrity.

In short:

> the best use of AI in paper writing is not to replace the researcher, but to raise the level at which the researcher operates.

The human should spend less time fighting formatting and sentence-level friction, and more time shaping the argument, validating the science, and deciding what the paper truly claims.
