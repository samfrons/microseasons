# Microseasons skills

Project-scoped Claude Code **skills** — on-trigger procedural playbooks that
encode "the canonical way to do X in _this_ repo", in the same shape as the
`mes-*` skills in the MESSAI repo. Git-tracked, so they sync to every
teammate and every worktree.

## Conventions (borrowed from MESSAI `.claude/skills/README.md`)

- **Home:** `.claude/skills/<name>/SKILL.md`; supporting reference beside it.
- **`description` = triggers, not workflow.** Third person, "Use when…", packed
  with the phrases an agent would actually say or see.
- **Thin-skill rule:** encode the _procedure and the gotchas_, never the facts
  that change (dates, counts, colours) — point at the code / data file that
  owns them.
- **Name the deprecated path you must NOT resurrect.** That line is the most
  valuable one in the skill.

## Roadmap

| Skill                       | Status   | Covers                                                                                                                                                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `microseasons-digital-twin` | **live** | The bioreactor-calendar digital twin: wall elevation from the kō table (`buildCalendarTwin`), the array P&ID, one P&ID per panel (`buildPanelPid`), `lintCalendarTwin` / `lintPid`, the blueprint plate, `/twin`. |
