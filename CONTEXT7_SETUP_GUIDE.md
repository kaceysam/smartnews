# Context7 MCP Server Installation & Configuration Guide for Cursor

## Overview

Context7 MCP (Model Context Protocol) server provides access to up-to-date, version-specific documentation for 4,000+ libraries directly within Cursor. This eliminates outdated code examples and hallucinated APIs by pulling documentation directly from source repositories.

---

## 1. Installation

### Option A: One-Click Installation (Recommended)

1. Visit the Context7 installation page or use the one-click installer
2. You'll be redirected to sign in with OAuth (GitHub, Google, etc.)
3. The configuration will be automatically added to Cursor

### Option B: Manual Installation

#### Step 1: Get Your API Key

1. Sign up at [context7.com](https://context7.com) or sign in if you have an account
2. Navigate to your API settings/dashboard
3. Generate or copy your `CONTEXT7_API_KEY`

#### Step 2: Configure in Cursor

**Method 1: Via Cursor Settings UI**
1. Open Cursor Settings:
   - **macOS**: `Cursor` → `Settings...` → `Cursor Settings` → `MCP`
   - **Windows/Linux**: `File` → `Preferences` → `Settings` → `MCP`
   - Or use Command Palette: `Cmd+Shift+P` (macOS) / `Ctrl+Shift+P` (Windows/Linux) → type "Cursor Settings"
2. Click **"Add a Custom MCP Server"**
3. Enter the configuration (see below)

**Method 2: Edit Configuration File Directly**
1. Open the MCP configuration file: `~/.cursor/mcp.json`
2. Add or update the configuration

#### Step 3: Configuration Format

Add this to your `mcp.json` file:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Important Notes:**
- Replace `YOUR_API_KEY_HERE` with your actual API key
- The file path is `~/.cursor/mcp.json` (in your home directory)
- If the file doesn't exist, create it with the above structure
- If you already have other MCP servers configured, add `context7` to the existing `mcpServers` object

#### Step 4: Restart Cursor

After adding the configuration, restart Cursor to load the MCP server.

---

## 2. Usage

### Basic Usage Pattern

Simply add `use context7` to your prompts in Cursor. Context7 will automatically fetch relevant, up-to-date documentation for the libraries you're asking about.

### How It Works

1. Write your prompt naturally, describing what you want to do
2. Add `use context7` at the end of your prompt
3. Context7 fetches version-specific documentation from official sources
4. You receive accurate, current code examples and API references

### Querying Documentation

#### General Pattern
```
"Your question about a library or framework. use context7"
```

#### Library-Specific Queries

**React:**
```
"How do I use React hooks for state management? use context7"
```

**Next.js:**
```
"Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to /login. use context7"
```

**Supabase:**
```
"Show me how to set up Supabase authentication with Next.js. use context7"
```

**Tailwind CSS:**
```
"What are the Tailwind CSS utility classes for responsive grid layouts? use context7"
```

### Best Practices

1. **Be Specific**: Include the library name and what you want to accomplish
   - ✅ Good: "How do I use React Query's useQuery hook with TypeScript? use context7"
   - ❌ Less effective: "Show me React Query. use context7"

2. **Include Context**: Mention your use case or requirements
   - ✅ Good: "Create a Next.js API route that handles POST requests with authentication. use context7"
   - ❌ Less effective: "Next.js API routes. use context7"

3. **Version-Specific Queries**: Context7 automatically resolves versions, but you can be explicit:
   - "Show me React 18 hooks documentation. use context7"
   - "Next.js 14 App Router examples. use context7"

4. **Combine with Code Context**: Context7 works best when you have relevant code open in your editor

5. **Iterative Refinement**: Start broad, then narrow down:
   - First: "How do I use React Context? use context7"
   - Then: "Show me React Context with TypeScript and custom hooks. use context7"

---

## 3. Examples

### Example 1: React Hooks Documentation

**Prompt:**
```
"Show me how to use React's useState and useEffect hooks together to fetch data from an API. Include error handling and loading states. use context7"
```

**What Context7 Provides:**
- Current React hooks API documentation
- Best practices for combining hooks
- TypeScript examples if applicable
- Error handling patterns

### Example 2: Next.js App Router

**Prompt:**
```
"How do I create a dynamic route in Next.js 14 App Router with server components? Show me the file structure and code example. use context7"
```

**What Context7 Provides:**
- Next.js 14 App Router documentation
- File structure conventions
- Server component examples
- Dynamic route patterns

### Example 3: Tailwind CSS Utility Classes

**Prompt:**
```
"What are the Tailwind CSS utility classes for creating a responsive card layout with hover effects? use context7"
```

**What Context7 Provides:**
- Current Tailwind CSS utility classes
- Responsive design patterns
- Hover state utilities
- Layout examples

### Example 4: Supabase Integration

**Prompt:**
```
"Show me how to set up Supabase client-side authentication in a Next.js app with the App Router. Include login and logout functions. use context7"
```

**What Context7 Provides:**
- Supabase authentication API
- Next.js integration patterns
- Client-side setup examples
- Security best practices

### Example 5: Library Version Resolution

**Prompt:**
```
"I'm using React 18.2.0. Show me the latest patterns for using concurrent features like useTransition. use context7"
```

**What Context7 Provides:**
- Version-specific React 18.2.0 documentation
- useTransition hook examples
- Concurrent rendering patterns
- Migration guides if applicable

---

## 4. Troubleshooting

### MCP Server Not Connecting

1. **Check Configuration File**: Verify `~/.cursor/mcp.json` exists and has correct syntax
2. **Verify API Key**: Ensure your API key is correct and active
3. **Restart Cursor**: Close and reopen Cursor after configuration changes
4. **Check Cursor Logs**: Look for MCP-related errors in Cursor's developer console

### Documentation Not Appearing

1. **Include "use context7"**: Make sure you add this phrase to your prompt
2. **Be Specific**: Vague queries may not trigger documentation fetching
3. **Check Library Name**: Use the official library name (e.g., "React" not "reactjs")

### API Key Issues

1. **Regenerate Key**: If your key isn't working, generate a new one from your Context7 dashboard
2. **Check Quota**: Verify you haven't exceeded your API usage limits
3. **OAuth Alternative**: Consider using OAuth authentication instead of API keys

---

## 5. Advanced Configuration

### Using OAuth Instead of API Keys

If you prefer OAuth authentication (automatic token refresh), you can configure it instead:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

On first connection, you'll be redirected to sign in, and tokens will refresh automatically.

### Multiple MCP Servers

If you have multiple MCP servers configured:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    },
    "another-server": {
      "url": "https://another-mcp-server.com/mcp",
      "headers": {
        "API_KEY": "ANOTHER_KEY"
      }
    }
  }
}
```

---

## 6. Resources

- **Context7 Documentation**: [https://context7.com/docs](https://context7.com/docs)
- **Cursor MCP Setup**: [Cursor MCP Documentation](https://cursor.com/docs/mcp)
- **Context7 GitHub**: Check for updates and examples

---

## Quick Reference

### Installation Checklist
- [ ] Sign up for Context7 account
- [ ] Get API key from dashboard
- [ ] Open `~/.cursor/mcp.json`
- [ ] Add context7 configuration
- [ ] Restart Cursor
- [ ] Test with a simple query

### Usage Checklist
- [ ] Write your question naturally
- [ ] Add `use context7` to your prompt
- [ ] Include library name and specific use case
- [ ] Review the documentation provided
- [ ] Apply the examples to your code

---

**Happy coding with Context7! 🚀**
