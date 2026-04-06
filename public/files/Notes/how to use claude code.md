# Notes on Using Claude Code to Move Faster

Date: March 9, 2026

These notes summarize the talk **Using Claude Code to move faster** and reorganize it into a clear, concise guide for PhD students and researchers.

Tthe original slides is available here: [Slides/Move faster by Claude Code.pdf](../Slides/Move%20faster%20by%20Claude%20Code.pdf)


---

## 1. Core idea

Claude Code is best understood as a **long-horizon coding agent** rather than just an autocomplete tool.

It is useful for tasks that involve:

- reading a codebase,
- planning a multi-step solution,
- making coordinated edits,
- resuming work across sessions,
- and handling several related subtasks with limited supervision.

The main shift is this:

> The bottleneck is moving from **writing code** to **finding the right task, decomposing it well, and verifying the result**.

---

## 2. Why people use Claude Code

### 2.1 It is built for task-level work
Claude Code is designed for extended coding sessions, not just local code completion. It can maintain a plan, execute it, and continue across longer workflows.

### 2.2 It supports decomposition
A major advantage is that it can break a large task into smaller subtasks and work through them systematically.

### 2.3 It reduces micromanagement
Instead of steering every line of code, the user can often:

1. define the task,
2. inspect the plan,
3. let Claude Code execute,
4. review the final diff or PR.

This changes the human role from **constant operator** to **supervisor and verifier**.

### 2.4 It works well in parallel
Claude Code is lightweight in the command line and works naturally with Git worktrees, which makes parallel task execution easier.

---

## 3. When to use Claude Code

Claude Code is most useful when a task is:

- large enough to require planning,
- clear enough to describe in natural language,
- and easy enough to verify afterward.

### Good use cases

#### Research engineering
Examples:

- adding a new evaluation pipeline,
- refactoring experiment infrastructure,
- implementing a new model interface,
- writing tests for a systems component,
- improving experiment logging or reproducibility.

#### Open-source maintenance
Examples:

- picking up tasks from `todo.md`,
- cleaning up documentation,
- improving tests,
- refactoring a module,
- fixing scoped issues.

#### Repetitive but nontrivial engineering work
Examples:

- adding instrumentation across files,
- reorganizing config systems,
- updating interfaces consistently across a codebase.

---

## 4. When not to use it too loosely

Claude Code is less reliable when:

- the task itself is not yet well defined,
- success is hard to verify,
- subtle architectural judgment is required,
- search/localization in a large codebase is difficult,
- or a wrong edit would be expensive to undo.

In such cases, it is better to use Claude Code as a planning or drafting tool rather than a fully autonomous one.

---

## 5. How people use Claude Code in practice

## 5.1 Put project rules in `CLAUDE.md`

The talk emphasizes that the most important project customization is often a file like `CLAUDE.md`.

This file can record:

- project goals,
- coding constraints,
- documentation conventions,
- evaluation criteria,
- important design principles.

This matters because the agent needs a **clear specification of what “good” means**.

### Example

```markdown
## Project rules
- Prefer simple implementations over fallback-heavy logic.
- Do not introduce hidden defaults that affect experiments.
- Log seed, config, and dataset version for every run.
- Add tests for any change to evaluation logic.
```

A file like this acts as persistent project memory.

---

## 5.2 Ask for a plan before execution

The talk recommends using **plan mode** to inspect the high-level approach before letting the agent edit code.

This is useful because it lets you check:

- whether the task was understood correctly,
- whether the decomposition is sensible,
- whether any important constraints were missed.

A strong workflow is:

1. ask for a plan,
2. review the decomposition,
3. then allow implementation.

---

## 5.3 Use checkpoints: resume and rewind

Useful commands mentioned in the talk:

- `/resume` — continue recent chat history
- `/rewind` — go back to a previous checkpoint

This is important for long-running work because research and engineering are iterative. You often need to resume, revise, and backtrack.

---

## 5.4 Use Git aggressively

A key practical lesson:

> Autonomy is only safe when rollback is cheap.

If Claude Code is allowed to make broad edits, frequent Git commits and clean diffs become essential.

Good practice:

- commit before a major task,
- review diffs often,
- keep changes scoped,
- use branches or worktrees for isolation.

---

## 5.5 Use worktrees for parallel tasks

One advanced workflow from the talk is:

```bash
claude --worktree feature-auth
```

The idea is to run Claude Code in separate Git worktrees so that multiple tasks can proceed in parallel without editing the same working directory.

### Why this matters

If three tasks are mostly independent, you can delegate them separately:

- authentication feature,
- experiment config refactor,
- evaluation logging cleanup.

This suggests an important shift:

> Agents may scale nearly linearly, so the main bottleneck becomes **human orchestration**.

---

## 5.6 Use remote control for continuity

The talk also describes a remote-control workflow, where a Claude Code session can be accessed from the app, even from a phone.

This is useful when you want to:

- monitor a long-running task,
- give a quick instruction while away from your machine,
- keep work moving with low friction.

The trade-off is obvious: less GUI support, but more flexibility.

---

## 6. Important commands and what they are for

### `claude --dangerously-skip-permissions`
This is similar to an auto-accept workflow. It can make Claude Code faster, but should be used carefully.

Best used only when:

- the task is low risk,
- you are committing frequently,
- and rollback is easy.

### `/resume`
Continue a recent session.

### `/rewind`
Return to an earlier checkpoint.

### Plan mode
Get the high-level strategy before execution.

### `claude --worktree ...`
Run an isolated Claude Code session in a separate Git worktree.

### `/remote-control`
Connect or continue a session remotely.

---

## 7. Example workflows

## Example 1: Open-source maintenance

Suppose your repository contains:

```markdown
- Add tests for tokenizer edge cases
- Improve error messages in config loader
- Document new training flag
```

A strong Claude Code workflow is:

1. define project rules in `CLAUDE.md`,
2. ask Claude Code to choose one concrete task,
3. ask for a plan,
4. let it implement the change,
5. review the diff and tests.

### Why this works
Open-source maintenance often contains tasks that are:

- clearly scoped,
- easy to verify,
- and easy to isolate.

These are ideal agent tasks.

---

## Example 2: Research codebase with explicit constraints

Suppose you are working on a retrieval or systems paper and want to add a reranking experiment.

You might write in `CLAUDE.md`:

```markdown
## Research constraints
- Prefer simple, explicit logic.
- Do not add fallback behavior unless requested.
- Log all experimental settings.
- Any metric change must be documented.
```

Then give Claude Code a task like:

```text
Add support for a new reranking experiment. Follow CLAUDE.md.
First propose a plan, then implement it, add tests, and summarize the changes.
```

### Why this is a good use case

Because:

- the task is concrete,
- the constraints are explicit,
- and the result can be checked with tests or experiments.

---

## Example 3: Parallel feature development

Suppose you need to do three mostly independent things:

- add auth for a demo service,
- refactor config loading,
- improve experiment logging.

You can assign each one to a separate worktree session.

Your role then becomes:

- assign tasks,
- inspect plans,
- compare outputs,
- merge verified results.

This is a strong example of the new research workflow:

> use natural language to define work, and use code, tests, and diffs to verify it.

---

## 8. Limitations and trade-offs

## 8.1 Code search may be weaker than specialized IDE tools

The talk notes that some IDE-based tools may still have an advantage in code localization or semantic retrieval.

Implication:

- Claude Code is strong at execution and orchestration,
- but it may need better retrieval support in very large or complex codebases.

## 8.2 Verification is still hard

The real challenge is often not code generation itself, but:

- choosing the right task,
- decomposing it correctly,
- and knowing whether the result is actually correct.

For researchers, this is especially important because research code often has ambiguous objectives and subtle failure modes.

---

## 9. Main lessons for researchers

### Lesson 1: Specify before you delegate
Write down:

- goals,
- constraints,
- expected outputs,
- success criteria.

### Lesson 2: Use natural language for implementation, code for verification
This is one of the deepest workflow changes.

A useful pattern is:

- describe the task in natural language,
- verify it using tests, logs, metrics, and diffs.

### Lesson 3: Parallelize independent tasks
If the work can be decomposed, use multiple worktrees or sessions.

### Lesson 4: Documentation is part of the control loop
Files like `CLAUDE.md` are not just notes. They are part of the mechanism that lets the agent work effectively.

### Lesson 5: Human bandwidth is now the scarce resource
As agents get better, the harder problems become:

- deciding what to do,
- sequencing tasks,
- and validating outputs efficiently.

---

## 10. Concise takeaway

Claude Code is most effective for **well-specified, verifiable, multi-step coding tasks**.

People use it to:

- plan and execute substantial coding work,
- continue tasks across sessions,
- run several tasks in parallel,
- and reduce the amount of manual implementation work.

For researchers, the strongest workflow is:

1. encode project knowledge in `CLAUDE.md`,
2. ask for a plan,
3. delegate a concrete task,
4. use Git and checkpoints aggressively,
5. verify using code, tests, experiments, and diffs.

The big idea is simple:

> The future productivity gain is not just faster code generation.  
> It is better **task decomposition, orchestration, and verification**.
