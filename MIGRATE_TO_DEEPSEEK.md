# Migrating from OpenAI to DeepSeek

This guide will help you switch from OpenAI to DeepSeek for AI summarization.

## Why DeepSeek?

- **Cost-effective**: DeepSeek offers competitive pricing
- **OpenAI-compatible**: Uses the same API format, easy migration
- **No quota issues**: Avoid OpenAI quota/billing problems
- **High quality**: DeepSeek Chat provides excellent summarization

## Migration Steps

### Step 1: Get Your DeepSeek API Key

1. Visit [https://platform.deepseek.com](https://platform.deepseek.com)
2. Sign up for an account (or sign in if you have one)
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key (it starts with `sk-`)

### Step 2: Update Environment Variables

**Option A: Automatic Update (Recommended)**

Run the migration script:
```bash
./update-env-deepseek.sh
```

This will:
- Backup your current `.env.local` file
- Replace `OPENAI_API_KEY` with `DEEPSEEK_API_KEY`
- Keep your existing key (if you want to reuse it)

**Option B: Manual Update**

Edit `.env.local` manually:
```bash
nano .env.local
```

Change:
```env
OPENAI_API_KEY=sk-...
```

To:
```env
DEEPSEEK_API_KEY=sk-...
```

Or add a new line if you want to keep both:
```env
DEEPSEEK_API_KEY=sk-your-deepseek-key-here
```

### Step 3: Test the Connection

Test your DeepSeek API key:
```bash
node test-deepseek.js
```

You should see:
```
✅ API Key found: sk-...
🔄 Testing DeepSeek API connection...
✅ API Response: Hello, DeepSeek API is working!
✅ DeepSeek API is working correctly!
```

### Step 4: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test in Browser

1. Open http://localhost:3000
2. Click "Refresh" to fetch news
3. Articles should now be summarized using DeepSeek!

## What Changed?

### Code Changes
- `lib/summarize.ts` - Now uses DeepSeek API endpoint
- Model changed from `gpt-4o-mini` to `deepseek-chat`
- API endpoint: `https://api.deepseek.com`

### Environment Variables
- `OPENAI_API_KEY` → `DEEPSEEK_API_KEY`
- Same format (starts with `sk-`)

### No Other Changes Needed!
- Same API format (OpenAI-compatible)
- Same function signatures
- Same UI and features
- Just different backend provider

## Troubleshooting

### "DEEPSEEK_API_KEY is not set"
- Make sure `.env.local` has `DEEPSEEK_API_KEY=...`
- Restart the development server after updating

### "401 Unauthorized"
- Check your API key is correct
- Verify the key is active in your DeepSeek account
- Make sure you copied the full key

### "429 Rate Limit"
- DeepSeek has rate limits too
- Wait a few minutes and try again
- Check your usage at https://platform.deepseek.com

### Still Using OpenAI?
- Check that `.env.local` has `DEEPSEEK_API_KEY` (not `OPENAI_API_KEY`)
- Restart the server after changing environment variables
- Clear browser cache and hard refresh (Cmd+Shift+R)

## Benefits

✅ **No more quota issues** - DeepSeek typically has better availability  
✅ **Cost savings** - Often more affordable than OpenAI  
✅ **Same quality** - DeepSeek Chat provides excellent results  
✅ **Easy migration** - Drop-in replacement, no code changes needed  

## Need Help?

- DeepSeek Docs: https://platform.deepseek.com/docs
- Test script: `node test-deepseek.js`
- Check server logs for detailed error messages

---

**Migration complete!** Your SmartNews app is now powered by DeepSeek. 🚀
