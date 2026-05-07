# getpocketdungeon.com

Public static website for Pocket Dungeon.

This repository intentionally contains only public-facing website files and
generated marketing art approved for the public site. The private Pocket
Dungeon source repository keeps the backend, Android project, orchestration
code, prompts, database schema, deployment scripts, secrets, and tests.

## Boundary

- Public site: static HTML, CSS, JavaScript, public marketing graphics.
- Current website art lives in `assets/graphics`; earlier public environment
  concepts are preserved in `assets/environments` for collaborators.
- Private backend: `https://api.getpocketdungeon.com`.
- No provider keys, tester tokens, private prompts, or backend source belong in
  this repository.
