# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal technical blog built with Hugo and the PaperMod theme. Deployed automatically via Netlify.

**Live site:** https://dannycunningham.com

## Commands

```bash
hugo server          # Run local development server (http://localhost:1313)
hugo new posts/YYYY-MM-DD-slug/index.md   # Create new post from archetype
```

Netlify handles production builds automatically on push to main (Hugo v0.151.0).

## Architecture

- **Static site generator:** Hugo (custom theme in `layouts/`)
- **Content:** Markdown files in `content/posts/[DATE]-[slug]/index.md`
- **Custom layouts:** Override theme in `layouts/` (partials, single.html, list.html)
- **Custom styles:** `/static/css/style.css` (CSS variables for colors, Inter/Raleway fonts)
- **Custom JS:** `/static/js/footnotes.js` (hover popups for footnotes)
- **Math support:** MathJax v3 via `layouts/partials/math.html` - use `\( \)` for inline, `$$ $$` or `\[ \]` for block

## Post Frontmatter

Posts use TOML frontmatter:
```toml
+++
title = 'Post Title'
subtitle = ""
date = 2025-01-26
tags = ["tag1", "tag2"]
draft = true
description = "SEO/sharing description"
+++
```

Set `draft = false` to publish.
