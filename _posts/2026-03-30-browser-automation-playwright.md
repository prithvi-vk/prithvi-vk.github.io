---
layout: post
title: "Browser Automation with AI: How Playwright + Claude Code Changes Everything"
date: 2026-03-30
---

Most automation tools break the moment a website changes its layout. A button moves, a class name changes, and your entire script fails. That's because traditional browser automation is *brittle* — it relies on exact selectors.

AI-powered browser automation is different. And today, it's practical.

## The Stack: Playwright MCP + Claude Code

Playwright is a browser automation framework. MCP (Model Context Protocol) is what connects it to Claude Code. Together, they let you control a real browser using natural language.

Instead of writing:

```python
driver.find_element(By.CSS_SELECTOR, "button.compose").click()
```

You say: "Click the Compose button in Gmail."

Claude Code takes an accessibility snapshot of the page, identifies the right element, and interacts with it. No fragile selectors. No XPath. Just semantic understanding of what's on screen.

## What I Automated Today

In a single session, I used this stack to:

### Send an Email via Gmail
Claude navigated to Gmail, clicked Compose, filled in the recipient, subject, and body, then hit Send. It handled the full Gmail UI — including the rich text composer and contact auto-complete.

### Authenticate with Google Cloud Console
The Google Cloud Console is one of the most complex web UIs out there. Claude navigated through:
- Account selection screens
- Terms of Service acceptance
- OAuth consent screen configuration (a 4-step wizard)
- Creating OAuth client credentials
- Adding test users

Each step involved different UI patterns — dropdowns, checkboxes, dialogs, radio buttons. Claude handled all of them.

### Complete GitHub Device Authentication
GitHub's device auth flow requires entering a code on a specific page. Claude opened the URL, read the page, and would have entered the code if the browser session hadn't timed out.

## Why This Matters for SMBs

Think about the web-based tasks your team does every day:

- **Data entry** into web portals that don't have APIs
- **Downloading reports** from SaaS dashboards
- **Filling forms** across multiple platforms
- **Checking statuses** on vendor portals

All of these can be automated with AI-driven browser control. And unlike traditional RPA tools that cost six figures, this stack is essentially free.

## The Limitations (Honest Take)

It's not perfect yet:

- **Speed** — AI browser automation is slower than direct API calls. Use APIs when available.
- **Authentication** — Some sites require manual login first. The AI can take over after that.
- **Complex state** — Very long multi-page workflows can hit context limits.

But for the 80% of web tasks that follow a predictable pattern? It works remarkably well.

Interested in automating your web workflows? [Get in touch](/contact).
