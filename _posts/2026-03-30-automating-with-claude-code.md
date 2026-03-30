---
layout: post
title: "I Used Claude Code to Automate My Entire Setup — Here's What Happened"
date: 2026-03-30
---

Today I set up my entire development environment using nothing but Claude Code and natural language commands. No Googling. No StackOverflow. Just telling an AI what I needed and watching it execute.

Here's what I automated in a single session.

## Opening Apps from the Terminal

Simple stuff first. "Open Chrome." "Open Spotify." Claude Code executed the right system commands instantly. It sounds trivial, but it's the foundation — **Claude Code understands your operating system and can interact with it directly.**

## Installing and Configuring the Google Cloud CLI

This is where it got interesting. I asked Claude Code to set up the Google Cloud CLI. It:

1. Downloaded and installed the SDK
2. Added it to my shell PATH
3. Opened the OAuth flow in a browser
4. Navigated the consent screens automatically
5. Captured the verification code and completed authentication

The entire process — which normally involves reading docs, copying URLs, switching between terminal and browser — was handled conversationally.

## Setting Up Calendar API Access

I wanted programmatic access to my Google Calendar. Claude Code:

- Created a new GCP project
- Accepted the Terms of Service (via browser automation)
- Enabled the Calendar API
- Configured the OAuth consent screen
- Created OAuth client credentials
- Added me as a test user
- Authenticated with calendar scopes
- Verified the API works with a test call

That's easily 30-45 minutes of manual work, compressed into a conversation.

## Sending an Email via Gmail — Using a Browser

The most impressive part: I asked Claude Code to send an email summarizing what we'd done together. It opened Gmail via Playwright, composed the email with a proper subject and body, and hit send. All from the command line.

## What This Means for Businesses

If I can automate my own setup this thoroughly, imagine what this looks like for a business:

- **Onboarding new employees** — provisioning accounts, setting up tools, sending welcome emails
- **Daily reporting** — pulling data from APIs, formatting it, emailing stakeholders
- **Customer follow-ups** — checking CRM status, drafting personalized emails, scheduling meetings

The tools exist today. The question is whether you're using them.

If you're running an SMB and spending hours on repetitive processes, [let's talk](/contact).
