# Quick Installation Steps for Context7 MCP in Cursor

## Step-by-Step Installation

### Step 1: Get Your API Key

1. Visit [https://context7.com](https://context7.com)
2. Sign up for an account (or sign in if you already have one)
3. Navigate to your dashboard/API settings
4. Copy your `CONTEXT7_API_KEY`

### Step 2: Configure Cursor

**Option A: Using the Template File (Easiest)**

1. Open the file `mcp.json.template` in this directory
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Copy the entire contents
4. Create the file at `~/.cursor/mcp.json`:
   ```bash
   # On macOS/Linux:
   nano ~/.cursor/mcp.json
   # Or use any text editor
   
   # On Windows:
   # Navigate to: C:\Users\YourUsername\.cursor\mcp.json
   ```
5. Paste the configuration and save

**Option B: Using Cursor Settings UI**

1. Open Cursor
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Cursor Settings" and select it
4. Navigate to the **MCP** section
5. Click **"Add a Custom MCP Server"**
6. Enter:
   - **Name**: `context7`
   - **URL**: `https://mcp.context7.com/mcp`
   - **Headers**: Add a new header:
     - **Key**: `CONTEXT7_API_KEY`
     - **Value**: Your API key

### Step 3: Verify Configuration

Your `~/.cursor/mcp.json` file should look like this:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "your-actual-api-key-here"
      }
    }
  }
}
```

### Step 4: Restart Cursor

1. Completely quit Cursor (not just close the window)
2. Reopen Cursor
3. The MCP server should now be connected

### Step 5: Test It

In Cursor's chat, try this prompt:

```
Show me how to use React's useState hook. use context7
```

If Context7 is working, you'll see documentation appear in the response.

---

## Troubleshooting

### "MCP server not found" or connection errors

1. **Check file location**: Make sure the file is at `~/.cursor/mcp.json` (not in your project directory)
2. **Check JSON syntax**: Use a JSON validator to ensure the file is valid JSON
3. **Check API key**: Verify your API key is correct and active
4. **Restart Cursor**: Always restart after configuration changes

### File path help

- **macOS/Linux**: `~/.cursor/mcp.json` = `/Users/YourUsername/.cursor/mcp.json`
- **Windows**: `C:\Users\YourUsername\.cursor\mcp.json`

### Verify file exists

Run this command in terminal:
```bash
# macOS/Linux
cat ~/.cursor/mcp.json

# Windows (PowerShell)
Get-Content $env:USERPROFILE\.cursor\mcp.json
```

---

## Next Steps

1. Read `CONTEXT7_SETUP_GUIDE.md` for detailed usage instructions
2. Check `CONTEXT7_EXAMPLES.md` for ready-to-use prompts
3. Start using Context7 in your development workflow!

---

## Quick Reference

- **Configuration file**: `~/.cursor/mcp.json`
- **API endpoint**: `https://mcp.context7.com/mcp`
- **Header name**: `CONTEXT7_API_KEY`
- **Usage**: Add `use context7` to any prompt in Cursor
