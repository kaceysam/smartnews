# Complete Installation Commands for SmartNews

Follow these commands step-by-step to set up the SmartNews application.

## Step 1: Verify Prerequisites

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 10+)
npm --version
```

## Step 2: Navigate to Project Directory

```bash
cd /Users/KalaniS/Public/SmartNews
```

## Step 3: Install All Dependencies

```bash
npm install
```

This will install:
- Next.js 15.1.0
- React 19.0.0
- TypeScript 5.7.2
- Tailwind CSS 3.4.17
- OpenAI SDK 4.67.0
- Shadcn UI components
- Prettier for code formatting
- All other required dependencies

## Step 4: Create Environment File

```bash
# Create .env.local file
cat > .env.local << 'EOF'
OPENAI_API_KEY=your_openai_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
STYLE=CEO
EOF
```

**Important**: Replace `your_openai_api_key_here` and `your_gnews_api_key_here` with your actual API keys.

## Step 5: Get API Keys

### Get OpenAI API Key:
```bash
# Open in browser (or visit manually)
open https://platform.openai.com/api-keys
```

### Get GNews API Key:
```bash
# Open in browser (or visit manually)
open https://gnews.io/
```

## Step 6: Edit Environment File

```bash
# Edit .env.local with your favorite editor
nano .env.local
# or
code .env.local
# or
vim .env.local
```

Add your actual API keys:
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
GNEWS_API_KEY=xxxxxxxxxxxxx
STYLE=CEO
```

## Step 7: Format Code (Optional)

```bash
# Format all code with Prettier
npm run format
```

## Step 8: Start Development Server

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000)

## Step 9: Verify Installation

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the SmartNews homepage with:
- Style toggle (CEO Mode / Tech Enthusiast Mode)
- Refresh button
- News articles (after API calls complete)

## Complete Command Sequence (Copy & Paste)

```bash
# 1. Navigate to project
cd /Users/KalaniS/Public/SmartNews

# 2. Install dependencies
npm install

# 3. Create environment file template
cat > .env.local << 'EOF'
OPENAI_API_KEY=your_openai_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
STYLE=CEO
EOF

# 4. Edit .env.local with your API keys
# (Use your preferred editor: nano, vim, code, etc.)
nano .env.local

# 5. Format code (optional)
npm run format

# 6. Start development server
npm run dev
```

## Additional Useful Commands

```bash
# Run linter
npm run lint

# Check code formatting
npm run format:check

# Build for production
npm run build

# Start production server
npm start

# Install additional Shadcn UI components
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## Troubleshooting Commands

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Check environment variables are loaded
node -e "console.log(process.env.OPENAI_API_KEY ? 'OPENAI_API_KEY: Set' : 'OPENAI_API_KEY: Not set')"
```

## Verification Checklist

After running the installation commands, verify:

- [ ] `node_modules` directory exists
- [ ] `.env.local` file exists with API keys
- [ ] `npm run dev` starts without errors
- [ ] Browser shows SmartNews homepage at localhost:3000
- [ ] No console errors in browser
- [ ] Style toggle works
- [ ] News articles load (may take 10-30 seconds)

## Next Steps

1. **Test the application**: Toggle between CEO and Tech Enthusiast modes
2. **Customize**: Edit `lib/styles.ts` to adjust summarization prompts
3. **Add features**: Use Shadcn UI to add more components
4. **Deploy**: Follow deployment instructions in README.md

---

**Note**: Make sure to keep your `.env.local` file secure and never commit it to Git!
