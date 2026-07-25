# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Related

- [Agent workspace](/concepts/agent-workspace)

## Cursor Agent (available)

You **do** have Cursor access on this host via:

- **Tool:** `cursor_agent` — auto-invoke for code analysis (defaults to read-only `ask` mode)
- **Command:** `/cursor <project> [--mode ask|plan|agent] <prompt>`

Configured projects:

| Name | Path |
|------|------|
| `workspace` | `/home/dockeruser/.openclaw/workspace` |
| `openclaw` | `/home/dockeruser/openclaw` |
| `owner` | `/home/dockeruser/.openclaw/workspace/owner` |

When asked whether you have Cursor tools, **check your live tool list** (or run `/tools`) — do not guess. If `cursor_agent` is listed, you have access.

Examples:

- `/cursor openclaw --mode ask explain the gateway startup flow`
- `cursor_agent(project="openclaw", mode="ask", prompt="find auth middleware")`

`/cursor` returns Cursor output verbatim. `cursor_agent` tool results must not be summarized.

