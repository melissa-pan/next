# Notes on Agent Swarms: Hive and Multi-Agent Optimization

Date: March 23, 2026

These notes summarize the slide deck **Hive** and reorganize it into a clear, concise guide for PhD students, researchers, and research engineers.

Tthe original slides is available here: [Hive.pdf](../Slides/Hive.pdf)

---

## 1. Core idea

The central idea behind **agent swarms** is simple:

> Instead of improving a system with a single agent working sequentially, let **many agents explore in parallel**, share what they learn, and collectively improve the system faster.

The motivation is that a **single evolving agent is slow**. If only one agent proposes changes, evaluates them, and iterates, progress is bottlenecked by serial search.

An agent swarm addresses this by turning improvement into a **parallel search and optimization process**.

---

## 2. What Hive is

**Hive** is presented as a framework for **agent collaboration**.

Its goal is to let one agent collaborate with many other agents so that the overall system can tackle harder benchmarks and more difficult engineering or research tasks.

A good way to think about Hive is:

- each agent explores a possible direction,
- agents work in parallel,
- promising ideas are kept,
- bad ideas are discarded,
- and the system improves through repeated rounds of evaluation and selection.

In short, Hive treats agent improvement as a kind of **distributed evolutionary search**.

---

## 3. Why agent swarms matter

The slides highlight a key limitation of many earlier systems:

> iteration is slow because only a single agent is evolving.

This is important. In many real research and engineering problems, improvement requires searching over many possibilities:

- prompts,
- scaffolds,
- code structure,
- hyperparameters,
- system configurations,
- optimization strategies.

A single agent can only test these one after another. A swarm can test many at once.

### Main benefit

The main promise of a swarm is:

- **faster iteration**, because many experiments run in parallel;
- **greater diversity**, because different agents can try different strategies;
- **better global search**, because the system is not locked into one local path.

---

## 4. How a swarm system works

Although the Hive slides are concise, the overall workflow is clear.

A swarm system usually contains the following components:

### 4.1 A task
This is the optimization target, such as:

- improving an agent harness,
- training a better model,
- optimizing a GPU kernel,
- or improving code for a benchmark.

### 4.2 Multiple agents
Each agent works on a candidate strategy or modification.

For example, agents may try different:

- prompts,
- code changes,
- configurations,
- optimization heuristics,
- or implementation ideas.

### 4.3 Evaluation
Each proposed change is tested against a measurable objective.

Examples:

- benchmark score,
- compression score,
- throughput,
- validation loss,
- or task success rate.

### 4.4 Selection and memory
The system keeps the better ideas and discards weaker ones.

A strong swarm system also stores shared knowledge such as:

- notes,
- prior attempts,
- reusable skills,
- and successful strategies.

### 4.5 Repetition
The process repeats over many rounds, producing an iterative improvement loop.

This makes the swarm behave like a combination of:

- **parallel search**,
- **automatic experimentation**,
- and **evolutionary optimization**.

---

## 5. A useful mental model

A helpful mental model is to view agent swarms as a hybrid of:

- **research group** — many workers explore in parallel,
- **hyperparameter search** — many variations are tested,
- **evolutionary computation** — better variants survive,
- **software engineering automation** — the outputs are code, prompts, or system changes.

This is why swarm methods are especially attractive for research and systems problems.

---

## 6. Applications of Hive

The slides describe three main application areas.

---

## 6.1 Optimizing an agent harness

### Problem
Start with a simple ReAct-style agent and improve its **harness** rather than changing the underlying model.

The harness includes things like:

- prompts,
- scaffolding,
- code structure,
- configuration.

The model is fixed; only the surrounding system is optimized.

### Why this matters
This is a very important research point:

> performance does not only depend on the base model; it also depends heavily on the **agent scaffold**.

In other words, better orchestration can produce large gains even when the model itself stays the same.

### Reported results
The slides report improvements on two benchmarks:

- **Tau2-Bench:** from **40% to 77%**
- **BabyVision-Lite:** from **25% to 53%**

### Interpretation
This shows that swarm-based optimization can meaningfully improve a system by searching over the **agent design space**, not just the model space.

### Example
Suppose you have an evaluation agent for a vision-language task. Different agents in the swarm might explore:

- different prompt templates,
- different tool-calling rules,
- different retry behavior,
- different decomposition strategies,
- different memory or summary formats.

The evaluation loop identifies which scaffold performs best, and the swarm gradually improves the harness.

---

## 6.2 Automating ML training

### Problem
Use an agent swarm to improve training strategies automatically.

The example in the slides is the **OpenAI Parameter Golf Challenge**, where the goal is to train the best model under strict resource constraints:

- model artifact under **16MB**,
- training in under **10 minutes** on **8×H100**,
- evaluated by compression performance on the FineWeb validation set.

### Reported results
The slides report a progression over several days:

- **Day 1:** 1.22 → 1.19
- **Day 2:** 1.19 → 1.14
- **Day 4:** 1.14 → 1.123

The system reportedly reached the top of the leaderboard more than once during this process.

### Interpretation
This is a strong example of swarm intelligence for ML research.

The agents are not just writing code; they are effectively searching over training decisions such as:

- architecture choices,
- optimization settings,
- compression strategies,
- implementation adjustments,
- or evaluation tricks that remain within the rules.

### Example
Imagine a swarm where different agents try:

- a different tokenizer strategy,
- a new loss weighting,
- a smaller architecture,
- an alternative normalization rule,
- or a revised training schedule.

A central evaluator runs the experiments and keeps the best-performing variants.

This turns ML experimentation into a **continuous automated search process**.

---

## 6.3 Automating GPU kernel optimization

### Problem
Use agents to optimize GPU kernels, particularly in a setting where performance depends on many interacting low-level design choices.

The example in the slides is **Flash K-Means**, a Triton-based implementation of GPU kernels for k-means.

### Reported result
The slides report:

- **three-phase optimization**
- **2.7× throughput improvement overall**

### Why this is important
GPU kernel optimization is a strong test case for swarm methods because it has:

- many local design choices,
- hard-to-predict interactions,
- measurable outcomes,
- and expensive but clear evaluation.

This makes it a natural target for iterative automated search.

### Example
Different agents might explore:

- block sizes,
- memory layouts,
- fusion strategies,
- tiling schemes,
- synchronization changes,
- or algorithmic restructuring.

The performance evaluator measures throughput, and the swarm preserves the best candidates.

---

## 7. Why these examples matter

The three applications all share the same structure.

### Common pattern
1. There is a **well-defined objective**.
2. There is a large **design space**.
3. Improvements can be **evaluated automatically**.
4. Parallel exploration is more effective than serial exploration.

This tells us when swarm methods are most useful.

---

## 8. When to use agent swarms

Agent swarms are especially valuable when:

- the search space is large,
- many ideas can be tested independently,
- evaluation is automatic or semi-automatic,
- and diversity of strategies is important.

### Good use cases
- benchmark optimization,
- harness or prompt optimization,
- model training automation,
- compiler or kernel tuning,
- experiment design under fixed metrics,
- code or system optimization with measurable performance.

### Strong signal that a swarm may help
A swarm is a good fit when the problem looks like:

> “There are many possible improvements, and I can score each one.”

---

## 9. When agent swarms are less useful

Swarm methods are less effective when:

- success cannot be measured clearly,
- the task depends on subtle human judgment,
- the environment is too expensive to evaluate,
- or the search space is poorly constrained.

In those cases, parallel exploration may produce a lot of activity without useful progress.

A swarm is powerful only when there is a **strong feedback signal**.

---

## 10. Related work in the slides

The deck mentions several related systems.

---

## 10.1 Coral

The slides highlight **Coral** as related work on autonomous multi-agent evolution.

The diagram in the deck shows a typical multi-agent architecture with:

- a **task**,
- an **evaluation component** that returns score and feedback,
- a **manager infrastructure** for health monitoring and coordination,
- a **heartbeat** mechanism for periodic interruption and reflection,
- an **agent pool** where multiple agents work in isolated workspaces,
- and a shared memory containing **notes**, **attempts**, and **skills**.

### Why this matters
This diagram makes an important point:

> A swarm is not just “many agents.” It also needs infrastructure for coordination, memory, and evaluation.

Without this infrastructure, multiple agents just create noise. With it, they become a productive search system.

---

## 10.2 AutoResearch @ home

The slides also mention **AutoResearch @ home**.

The interface shown in the deck suggests a large-scale, experiment-driven workflow in which many research agents contribute candidate strategies and results.

This reinforces the idea that swarms are particularly useful for:

- repeated experimentation,
- leaderboard-style improvement,
- and iterative search over many candidate changes.

### Research interpretation
This is close to an automated laboratory model:

- agents propose experiments,
- experiments are run,
- results are logged,
- and better strategies accumulate over time.

---

## 10.3 MiroFish

The deck also references **MiroFish**, described visually as a **universal swarm intelligence engine**.

Even without technical details in the slide, its inclusion supports the broader claim that:

> swarm-style AI systems are emerging as a general design pattern, not just a one-off research curiosity.

---

## 11. What the visual material suggests

Several visuals in the slides reinforce the main message.

### The Hive cover slide
The cover figure shows many trajectories with an improving top envelope. This visually suggests that many parallel attempts are being explored, while the best-so-far path keeps rising.

This is exactly what one would expect from an evolutionary or swarm-style system:
- many experiments,
- many failures,
- but steady improvement at the frontier.

### The Coral architecture diagram
The Coral figure emphasizes the importance of infrastructure:
- isolated workspaces,
- a manager,
- evaluation,
- shared memory,
- periodic reflection.

This suggests that successful swarms need both **exploration** and **organization**.

### The AutoResearch figure
The AutoResearch interface shows many experiments and contributors, reinforcing the idea that swarm systems are most natural when the task is already framed as **continuous experimentation**.

---

## 12. Main lessons for researchers

### Lesson 1: Parallelism changes the speed of discovery
If only one agent is allowed to improve at a time, iteration is slow. A swarm can transform progress by running many candidate improvements simultaneously.

### Lesson 2: The key ingredient is evaluation
A swarm is only as good as its scoring signal. If the benchmark or metric is weak, the swarm may optimize the wrong thing.

### Lesson 3: Swarms are best for search-heavy problems
They shine when:
- there are many design choices,
- the design space is hard to reason through analytically,
- and trial-and-feedback is feasible.

### Lesson 4: Infrastructure matters
A serious swarm system needs:
- coordination,
- memory,
- isolation,
- evaluation,
- and a mechanism for reflection or consolidation.

### Lesson 5: Agent swarms are a new research workflow
For many systems and ML tasks, the researcher’s role may shift from:
- manually trying ideas one by one

to:
- defining the objective,
- designing the evaluation loop,
- and managing the swarm.

---

## 13. Example research workflow

Here is a simple swarm-based workflow for a PhD student or research engineer.

### Goal
Improve the performance of a benchmarked agent system.

### Workflow
1. Define a clear target metric.
2. Enumerate the parts of the system that are allowed to change.
3. Launch multiple agents, each exploring a different modification.
4. Evaluate each proposal automatically.
5. Store good ideas and failed attempts.
6. Spawn the next generation from promising directions.
7. Periodically review results and refine the search space.

### Example
Suppose you are optimizing a retrieval-augmented research assistant.

Different agents could try:

- different prompt structures,
- different retrieval settings,
- different summarization rules,
- different planner-executor splits,
- different retry or reflection policies.

The evaluator scores each version on task accuracy, latency, and cost.

This is a natural swarm problem because:
- the design space is large,
- the metric is measurable,
- and many variants can be tested in parallel.

---

## 14. Concise takeaway

Hive presents **agent swarms** as a powerful way to automate improvement in research and engineering systems.

The main idea is:

> use many agents to explore many candidate improvements in parallel, evaluate them automatically, and keep the best ones.

This is especially effective for problems such as:

- agent harness optimization,
- ML training automation,
- and GPU kernel optimization.

The most important lesson is that swarm intelligence works best when the task has:

- a large search space,
- a clear evaluation metric,
- and enough infrastructure to coordinate many agents productively.

For researchers, the shift is profound:

> instead of improving systems one idea at a time, we can build systems that **search for improvements themselves**.
