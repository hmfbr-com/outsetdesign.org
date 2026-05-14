# Continuity Membrane Extension

Version: 0.1
Status: Active
Date: 2026-05-13

## Purpose

This directory contains the first loadable browser extension runtime experiment for the Continuity Runtime initiative.

The purpose is to validate:

- browser extension runtime loading
- overlay injection
- GitHub-native continuity runtime interaction
- local-first augmentation
- continuity runtime observability

---

# Current Runtime Scope

Included:

- MV3 extension manifest
- background runtime
- content script overlay injection
- popup runtime surface
- GitHub Pages runtime interaction

Excluded:

- advanced overlays
- orchestration systems
- AI systems
- production-scale infrastructure

---

# Current Runtime Goal

Validate that:

- the extension loads correctly
- overlays inject correctly
- GitHub Pages runtime surfaces remain observable
- continuity augmentation remains local-first

under actual browser runtime conditions.

---

# Installation

Microsoft Edge:

```text
edge://extensions
    ↓
Developer Mode
    ↓
Load unpacked
    ↓
Select this extension directory
```

Google Chrome:

```text
chrome://extensions
    ↓
Developer Mode
    ↓
Load unpacked
    ↓
Select this extension directory
```
