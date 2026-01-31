# Supabase MCP Server Setup Guide for Cursor

## Overview

This guide covers setting up Supabase integration with Cursor IDE. While there isn't a widely documented official Supabase MCP server, this guide provides:

1. **MCP Server Setup** (if available or community implementations)
2. **Supabase Credentials Management** (secure configuration)
3. **Direct Supabase Integration** (using Supabase client libraries)
4. **Database Query Examples** (SQL, RLS policies, schema management)

---

## 1. Installation & Setup

### Step 1: Get Your Supabase Credentials

1. **Sign in to Supabase Dashboard**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign in to your account
   - Select your project (or create a new one)

2. **Get Your Project Credentials**
   - Navigate to **Settings** → **API** in your Supabase dashboard
   - You'll need:
     - **Project URL**: `https://your-project-ref.supabase.co`
     - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     - **Service Role Key** (for admin operations): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ⚠️ Keep this secret!

3. **Database Connection String** (Optional, for direct SQL access)
   - Go to **Settings** → **Database**
   - Copy the connection string (if needed for direct database access)

### Step 2: Configure Supabase MCP Server (If Available)

#### Option A: Using npm Package (If Available)

If a Supabase MCP server package exists, you can install it:

```bash
npm install -g @supabase/mcp-server
# or
npx @supabase/mcp-server
```

Then configure in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://your-project-ref.supabase.co",
        "SUPABASE_ANON_KEY": "your-anon-key-here",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key-here"
      }
    }
  }
}
```

#### Option B: Using Environment Variables (More Secure)

For better security, use environment variables instead of hardcoding keys:

1. **Create a `.env` file** (in your home directory or project root):
   ```bash
   # ~/.supabase.env or project/.env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

2. **Update `~/.cursor/mcp.json`**:
   ```json
   {
     "mcpServers": {
       "supabase": {
         "command": "npx",
         "args": ["-y", "@supabase/mcp-server"],
         "env": {
           "SUPABASE_URL": "${SUPABASE_URL}",
           "SUPABASE_ANON_KEY": "${SUPABASE_ANON_KEY}",
           "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
         }
       }
     }
   }
   ```

3. **Load environment variables** before starting Cursor:
   ```bash
   # macOS/Linux
   export $(cat ~/.supabase.env | xargs)
   
   # Or add to your shell profile (~/.zshrc or ~/.bashrc)
   source ~/.supabase.env
   ```

#### Option C: Manual MCP Server Configuration

If you're using a custom or community Supabase MCP server:

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp-supabase-server.com/mcp",
      "headers": {
        "X-Supabase-URL": "https://your-project-ref.supabase.co",
        "X-Supabase-Key": "your-anon-key-here"
      }
    }
  }
}
```

### Step 3: Secure Credential Storage

**⚠️ Security Best Practices:**

1. **Never commit credentials to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables or secure credential storage

2. **Use Anon Key for Client-Side Operations**
   - The anon key is safe for client-side use (protected by RLS)
   - Use it in frontend applications

3. **Protect Service Role Key**
   - Service role key bypasses RLS - keep it secret!
   - Only use in server-side code or secure environments
   - Never expose in client-side code

4. **Use Cursor's Secure Storage** (if available)
   - Some MCP servers support secure credential storage
   - Check MCP server documentation for secure options

### Step 4: Restart Cursor

After configuration:
1. Save `~/.cursor/mcp.json`
2. Completely quit Cursor
3. Reopen Cursor
4. The MCP server should connect automatically

---

## 2. Features & Capabilities

### Database Querying

Once configured, you can query your Supabase database directly from Cursor:

**Example Prompts:**
```
Query all users from the users table in my Supabase database
```

```
Show me the schema of my Supabase database tables
```

```
Execute this SQL query: SELECT * FROM posts WHERE published = true LIMIT 10
```

### SQL Query Execution

The MCP server should allow you to:
- Execute SELECT queries
- Run INSERT, UPDATE, DELETE operations
- Execute migrations
- View query results directly in Cursor

**Example:**
```
Run this SQL query on my Supabase database: 
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5
```

### Schema Management

View and manage your database schema:

```
Show me the structure of all tables in my Supabase database
```

```
Create a new table called 'comments' with columns: id (uuid), post_id (uuid), content (text), created_at (timestamp)
```

```
Add a foreign key constraint between comments.post_id and posts.id
```

### Row Level Security (RLS) Policies

Manage RLS policies directly:

```
Show me all RLS policies on the posts table
```

```
Create an RLS policy that allows users to read only their own posts
```

```
Update the RLS policy on the users table to allow public read access
```

### Documentation Access

Access Supabase documentation and examples:

```
Show me Supabase documentation for setting up authentication
```

```
How do I use Supabase real-time subscriptions in Next.js?
```

---

## 3. Usage Examples

### Example 1: Query Data from Tables

**Prompt:**
```
Query the 'posts' table from my Supabase database and show me the latest 10 posts with their author information
```

**Expected Result:**
- MCP server executes SQL query
- Returns results in a readable format
- Shows column names and data types

### Example 2: Create Database Schema

**Prompt:**
```
Create a new table called 'products' in my Supabase database with these columns:
- id: uuid (primary key, default gen_random_uuid())
- name: text (not null)
- price: numeric(10,2) (not null)
- description: text
- created_at: timestamp (default now())
- updated_at: timestamp (default now())
```

**Expected Result:**
- SQL CREATE TABLE statement generated
- Table created in database
- Confirmation message

### Example 3: Set Up RLS Policies

**Prompt:**
```
Create RLS policies for the 'posts' table:
1. Enable RLS on the table
2. Policy for SELECT: Users can read all published posts or their own unpublished posts
3. Policy for INSERT: Only authenticated users can create posts
4. Policy for UPDATE: Users can only update their own posts
5. Policy for DELETE: Users can only delete their own posts
```

**Expected Result:**
- RLS enabled on table
- Policies created with proper SQL
- Security rules applied

### Example 4: Debug Database Queries

**Prompt:**
```
I'm getting slow queries on my 'orders' table. Show me:
1. The current table structure
2. Existing indexes
3. Suggest indexes to improve query performance
4. Show me how to analyze query performance
```

**Expected Result:**
- Table schema displayed
- Index information
- Performance optimization suggestions
- EXPLAIN ANALYZE examples

### Example 5: Execute Migrations

**Prompt:**
```
Create a migration to add a 'status' column to the 'orders' table:
- Column name: status
- Type: text
- Default: 'pending'
- Add a check constraint: status IN ('pending', 'processing', 'completed', 'cancelled')
```

**Expected Result:**
- Migration SQL generated
- Migration applied to database
- Rollback instructions provided

### Example 6: View Database Schema

**Prompt:**
```
Show me a complete overview of my Supabase database schema including:
- All tables and their columns
- Foreign key relationships
- Indexes
- RLS policies
```

**Expected Result:**
- Complete schema diagram or list
- Relationships visualized
- Security policies listed

---

## 4. Alternative: Direct Supabase Integration

If an MCP server isn't available, you can still use Supabase effectively in Cursor:

### Using Supabase Client Library

1. **Install Supabase Client:**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Client:**
   ```typescript
   // lib/supabase.ts
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. **Use in Your Code:**
   ```typescript
   // Query data
   const { data, error } = await supabase
     .from('posts')
     .select('*')
     .eq('published', true)
   ```

### Using Supabase CLI

Install Supabase CLI for local development and migrations:

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
supabase db pull  # Pull schema from remote
```

---

## 5. Troubleshooting

### MCP Server Not Connecting

1. **Check Configuration File:**
   ```bash
   cat ~/.cursor/mcp.json
   ```
   - Verify JSON syntax is valid
   - Check that credentials are correct

2. **Verify Credentials:**
   - Test Supabase connection using curl:
     ```bash
     curl -H "apikey: YOUR_ANON_KEY" \
          -H "Authorization: Bearer YOUR_ANON_KEY" \
          https://your-project-ref.supabase.co/rest/v1/
     ```

3. **Check Cursor Logs:**
   - Look for MCP-related errors in Cursor's developer console
   - Check for connection timeout errors

### Authentication Errors

1. **Invalid API Key:**
   - Verify you're using the correct key (anon vs service role)
   - Check if key has expired or been rotated

2. **RLS Blocking Queries:**
   - Ensure RLS policies allow your operations
   - Use service role key for admin operations (server-side only)

### Query Execution Issues

1. **SQL Syntax Errors:**
   - Verify SQL syntax
   - Check Supabase SQL documentation
   - Test queries in Supabase SQL Editor first

2. **Permission Denied:**
   - Check RLS policies
   - Verify you're using appropriate credentials
   - Ensure user has necessary permissions

---

## 6. Security Checklist

- [ ] Never commit `.env` files or credentials to Git
- [ ] Use environment variables for all credentials
- [ ] Anon key is safe for client-side (protected by RLS)
- [ ] Service role key is kept secret (server-side only)
- [ ] RLS policies are properly configured
- [ ] Database connection strings are encrypted in transit
- [ ] Regular credential rotation is implemented
- [ ] Access logs are monitored

---

## 7. Resources

- **Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
- **Supabase Dashboard**: [https://app.supabase.com](https://app.supabase.com)
- **Supabase GitHub**: [https://github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Supabase SQL Editor**: Available in your project dashboard
- **Cursor MCP Documentation**: Check Cursor's official MCP docs

---

## 8. Quick Reference

### Configuration File Location
- **macOS/Linux**: `~/.cursor/mcp.json`
- **Windows**: `C:\Users\YourUsername\.cursor\mcp.json`

### Required Credentials
- `SUPABASE_URL`: Your project URL
- `SUPABASE_ANON_KEY`: Public/anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (admin)

### Common Commands
```bash
# Test Supabase connection
curl -H "apikey: YOUR_KEY" https://YOUR_PROJECT.supabase.co/rest/v1/

# View MCP configuration
cat ~/.cursor/mcp.json

# Check environment variables
echo $SUPABASE_URL
```

---

**Note**: If a Supabase MCP server doesn't exist yet, you can:
1. Use Supabase client libraries directly in your code
2. Use Supabase CLI for migrations and schema management
3. Use Supabase Dashboard for database operations
4. Check for community MCP server implementations on GitHub

For the most up-to-date information, check the [Supabase GitHub repository](https://github.com/supabase/supabase) for MCP server implementations.
