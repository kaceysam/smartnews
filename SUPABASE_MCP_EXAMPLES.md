# Supabase MCP - Practical Usage Examples

Ready-to-use prompts and examples for working with Supabase in Cursor.

---

## Database Queries

### Basic SELECT Queries

```
Query all users from the users table in my Supabase database, showing id, email, and created_at columns
```

```
Get the latest 10 posts from the posts table, ordered by created_at descending
```

```
Show me all orders from the orders table where status is 'pending' and created in the last 7 days
```

### Filtered Queries

```
Query products from my Supabase database where price is greater than 100 and category is 'electronics'
```

```
Find all users who signed up in the last month and have made at least one purchase
```

```
Get all comments for post_id 'abc-123' from the comments table, ordered by created_at
```

### Aggregations

```
Show me the total revenue by month from the orders table in my Supabase database
```

```
Count how many users are in each subscription tier from the users table
```

```
Calculate the average order value for each product category
```

---

## Schema Management

### Creating Tables

```
Create a new table called 'notifications' in my Supabase database with:
- id: uuid (primary key, default gen_random_uuid())
- user_id: uuid (foreign key to users.id)
- type: text (not null)
- message: text (not null)
- read: boolean (default false)
- created_at: timestamp (default now())
```

```
Create a 'tags' table with:
- id: uuid (primary key)
- name: text (unique, not null)
- slug: text (unique, not null)
- created_at: timestamp
```

### Modifying Tables

```
Add a 'deleted_at' column to the posts table (nullable timestamp)
```

```
Add an index on the 'email' column of the users table
```

```
Add a foreign key constraint: comments.post_id references posts.id
```

```
Rename the 'description' column to 'content' in the posts table
```

### Viewing Schema

```
Show me the complete schema of my Supabase database including all tables, columns, and relationships
```

```
Display the structure of the 'orders' table including column types, constraints, and indexes
```

```
List all foreign key relationships in my database
```

---

## Row Level Security (RLS) Policies

### Enabling RLS

```
Enable Row Level Security on the posts table
```

```
Enable RLS on all tables in the public schema
```

### SELECT Policies

```
Create an RLS policy on the posts table that allows:
- Anyone to read published posts (published = true)
- Users can read their own unpublished posts
```

```
Create a policy on the users table allowing users to read only their own profile
```

```
Allow public read access to the 'products' table
```

### INSERT Policies

```
Create an RLS policy allowing only authenticated users to insert into the posts table
```

```
Allow users to insert comments only if they are authenticated
```

```
Create a policy allowing service role to insert into the audit_log table
```

### UPDATE Policies

```
Create an RLS policy on posts allowing users to update only their own posts
```

```
Allow users to update their own profile in the users table
```

```
Create a policy allowing admins (role = 'admin') to update any post
```

### DELETE Policies

```
Create an RLS policy allowing users to delete only their own posts
```

```
Allow only the post owner to delete comments on their posts
```

```
Create a soft delete policy: users can mark their posts as deleted but not actually delete them
```

### Complex RLS Policies

```
Create an RLS policy on the orders table that allows:
- Users to read only their own orders
- Users to create orders for themselves
- Admins to read and update all orders
```

```
Create a policy on the team_members table allowing:
- Team members to read other members of their team
- Team owners to update and delete team members
```

---

## SQL Migrations

### Creating Migrations

```
Create a migration to add a 'status' column to the orders table:
- Column: status (text)
- Default: 'pending'
- Constraint: status IN ('pending', 'processing', 'completed', 'cancelled')
- Add an index on status
```

```
Create a migration to:
1. Add a 'parent_id' column to comments (nullable uuid)
2. Add a foreign key: comments.parent_id references comments.id
3. Create an index on parent_id
```

### Data Migrations

```
Create a migration to backfill the 'full_name' column in users table by concatenating first_name and last_name
```

```
Migrate all posts with status 'draft' to status 'unpublished' in the posts table
```

---

## Database Debugging

### Performance Analysis

```
Analyze the performance of queries on the orders table. Show me:
1. Current indexes
2. Slow query patterns
3. Suggested indexes for optimization
```

```
Show me the execution plan for: SELECT * FROM posts WHERE user_id = 'xxx' AND published = true
```

```
Identify tables without proper indexes that might cause performance issues
```

### Query Optimization

```
Optimize this query: SELECT * FROM orders o JOIN users u ON o.user_id = u.id WHERE o.status = 'pending'
```

```
Suggest indexes to improve query performance on the posts table for queries filtering by user_id and created_at
```

### Data Integrity

```
Check for orphaned records: Find all comments where the referenced post doesn't exist
```

```
Verify foreign key constraints are working correctly in my database
```

```
Find duplicate email addresses in the users table
```

---

## Authentication & Users

### User Management

```
Show me all users in the auth.users table with their email and last_sign_in_at
```

```
Find users who haven't signed in for more than 90 days
```

```
List all users with their role from the public.users table
```

### Authentication Setup

```
Show me how to set up Supabase authentication in a Next.js app with email/password and OAuth
```

```
Create a function to handle user signup with email verification
```

---

## Real-time Subscriptions

### Setting Up Subscriptions

```
Show me how to set up a real-time subscription to the posts table in Supabase
```

```
Create a real-time subscription that listens for new comments on a specific post
```

---

## Storage Operations

### File Management

```
List all files in the 'avatars' bucket in my Supabase storage
```

```
Show me how to upload a file to Supabase storage from a Next.js API route
```

```
Create a signed URL for downloading a file from Supabase storage
```

---

## Advanced Queries

### Joins

```
Query posts with their author information: Join posts and users tables, showing post title, author name, and created_at
```

```
Get all orders with product details: Join orders, order_items, and products tables
```

### Subqueries

```
Find users who have made more than 5 orders (using a subquery)
```

```
Get the most recent comment for each post
```

### Window Functions

```
Rank products by total sales using a window function
```

```
Calculate running totals for orders by date
```

---

## Database Functions

### Creating Functions

```
Create a PostgreSQL function that calculates the total price of an order including tax
```

```
Create a function to generate a unique slug from a title for the posts table
```

```
Create a trigger function that automatically updates the updated_at timestamp
```

### Using Functions

```
Call the calculate_order_total function for order_id 'xxx'
```

---

## Best Practices Prompts

### Complete Setup

```
Set up a complete blog system in Supabase with:
1. Posts table (id, title, content, author_id, published, created_at)
2. Comments table (id, post_id, user_id, content, created_at)
3. Users table (id, email, name, avatar_url)
4. RLS policies for all tables
5. Indexes for performance
6. Foreign key relationships
```

### Security Audit

```
Audit the security of my Supabase database:
1. Check which tables have RLS enabled
2. Review all RLS policies
3. Identify any tables with sensitive data that should have RLS
4. Check for proper foreign key constraints
```

### Migration Strategy

```
Create a migration strategy for adding a new 'categories' table and linking it to existing posts:
1. Create categories table
2. Add category_id to posts
3. Migrate existing data
4. Add foreign key constraint
5. Create indexes
```

---

## Troubleshooting Prompts

### Error Debugging

```
I'm getting a permission denied error when querying the posts table. Help me debug the RLS policies
```

```
My query is slow. Analyze the posts table and suggest optimizations
```

```
I can't insert into the orders table. Check the RLS policies and constraints
```

### Data Issues

```
Find all posts that reference a user_id that doesn't exist in the users table
```

```
Check for data inconsistencies in my orders table
```

---

## Tips for Better Results

1. **Be Specific**: Include table names, column names, and exact requirements
2. **Include Context**: Mention your use case and requirements
3. **Specify Constraints**: Include validation rules, defaults, and constraints
4. **Ask for Explanations**: Request explanations of RLS policies and security implications
5. **Request Examples**: Ask for complete, working SQL examples

---

Remember: Always test queries in the Supabase SQL Editor first before running them through MCP, especially for write operations!
