# getpocketdungeon.com

Public static website for Pocket Dungeon.

This repository intentionally contains only public-facing website files and a
small curated sprite subset. The private Pocket Dungeon source repository keeps
the backend, Android project, orchestration code, prompts, database schema,
deployment scripts, secrets, and tests.

## Boundary

- Public site: static HTML, CSS, JavaScript, promotional sprites.
- Private backend: `https://api.getpocketdungeon.com`.
- No provider keys, tester tokens, private prompts, or backend source belong in
  this repository.
