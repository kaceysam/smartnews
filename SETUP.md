# SmartNews Setup Guide

## Quick Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 15
- React 19
- OpenAI SDK
- Tailwind CSS
- Shadcn UI components
- Prettier for code formatting

### 2. Get API Keys

#### OpenAI API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)

#### GNews API Key
1. Go to [https://gnews.io/](https://gnews.io/)
2. Sign up for a free account
3. Navigate to API section
4. Copy your API key

### 3. Create Environment File

Create a file named `.env.local` in the root directory:

```bash
touch .env.local
```

Add the following content:

```env
HUGGINGFACE_API_KEY=
HF_TOKEN=
DEEPSEEK_API_KEY=sk-ab7e212f257f40539c50873bcf1a0e47
GNEWS_API_KEY=90113005274eba5c5f00f883101f4b1d
STYLE=CEO
```

**Important**: Replace the placeholder values with your actual API keys.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Test the Application

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You should see the SmartNews homepage
3. Toggle between "CEO Mode" and "Tech Enthusiast Mode"
4. Click "Refresh" to fetch the latest news

## Verification Checklist

- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env.local` file created with API keys
- [ ] Development server starts without errors
- [ ] Homepage loads successfully
- [ ] Style toggle works
- [ ] News articles appear (may take a few seconds)

## Common Issues

### "OPENAI_API_KEY is not set"
- Make sure `.env.local` exists in the root directory
- Verify the key name is exactly `OPENAI_API_KEY`
- Restart the development server after adding the key

### "GNEWS_API_KEY is not set"
- Check `.env.local` file exists
- Verify the key name is exactly `GNEWS_API_KEY`
- Restart the development server

### "No articles found"
- Check your GNews API key is valid
- Verify you have API quota remaining
- Check browser console for detailed error messages

### Port 3000 already in use
- Next.js will automatically use the next available port (3001, 3002, etc.)
- Or stop the process using port 3000

## Next Steps

Once setup is complete:
1. Customize the news query terms in `lib/fetchNews.ts`
2. Adjust the summarization prompts in `lib/styles.ts`
3. Add more UI components using `npx shadcn@latest add [component]`
4. Deploy to Vercel or your preferred hosting platform

## Production Deployment

Before deploying:
1. Set environment variables in your hosting platform
2. Run `npm run build` to test the production build
3. Ensure all API keys are set in production environment

---

Need help? Check the main README.md for more details.
