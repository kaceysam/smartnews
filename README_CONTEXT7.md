# Context7 MCP Server Setup for Cursor

Complete guide for installing and using the Context7 MCP server in Cursor IDE.

## 📚 Documentation Files

1. **INSTALLATION_STEPS.md** - Quick step-by-step installation guide
2. **CONTEXT7_SETUP_GUIDE.md** - Comprehensive setup and usage guide
3. **CONTEXT7_EXAMPLES.md** - Ready-to-use prompt examples
4. **mcp.json.template** - Configuration template file

## 🚀 Quick Start

### 1. Get API Key
- Sign up at [context7.com](https://context7.com)
- Get your API key from the dashboard

### 2. Configure Cursor
- Open `~/.cursor/mcp.json` (create if it doesn't exist)
- Use the template in `mcp.json.template` and add your API key
- Or use Cursor Settings UI: `Cmd+Shift+P` → "Cursor Settings" → MCP

### 3. Restart Cursor
- Quit and reopen Cursor completely

### 4. Start Using
- Add `use context7` to any prompt in Cursor
- Example: `"Show me React hooks examples. use context7"`

## 📖 What is Context7?

Context7 MCP provides access to **4,000+ libraries** with up-to-date, version-specific documentation directly in Cursor. It:

- ✅ Prevents outdated code examples
- ✅ Eliminates hallucinated APIs
- ✅ Provides version-specific documentation
- ✅ Works seamlessly in your development workflow

## 🎯 Common Use Cases

### React Development
```
"How do I use React hooks with TypeScript? use context7"
```

### Next.js Development
```
"Create a Next.js 14 App Router API route. use context7"
```

### Supabase Integration
```
"Set up Supabase authentication in Next.js. use context7"
```

### Tailwind CSS
```
"Show me Tailwind CSS utility classes for responsive layouts. use context7"
```

## 📝 Configuration Format

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## 🔗 Resources

- **Context7 Docs**: [https://context7.com/docs](https://context7.com/docs)
- **Cursor MCP Docs**: [Cursor Documentation](https://cursor.com/docs/mcp)

## 📋 Files in This Directory

- `INSTALLATION_STEPS.md` - Start here for installation
- `CONTEXT7_SETUP_GUIDE.md` - Complete reference guide
- `CONTEXT7_EXAMPLES.md` - Copy-paste prompt examples
- `mcp.json.template` - Configuration template

---

**Need help?** Check `INSTALLATION_STEPS.md` for troubleshooting tips!
