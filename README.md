# SmartNews - AI-Powered Daily News Briefing

A modern Next.js application that generates personalized daily news briefings using AI. Get the latest news in technology, AI, and fintech, summarized in your preferred reading style.

## 🚀 Features

- **AI-Powered Summaries**: Uses OpenAI GPT-4o-mini to summarize news articles
- **Dual Reading Modes**:
  - **CEO Mode**: Strategic, executive-focused summaries with business impact
  - **Tech Enthusiast Mode**: Technical, builder-focused summaries with deep insights
- **Real-time News Fetching**: Fetches latest news from GNews API
- **Beautiful UI**: Built with Tailwind CSS and Shadcn UI
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Automatic theme adaptation

## 📦 Tech Stack

- **Framework**: Next.js 15.1.0 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn UI
- **AI**: DeepSeek Chat (OpenAI-compatible API)
- **News API**: GNews API
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (v22.18.0 recommended)
- npm 10+ (v10.9.3 recommended)
- DeepSeek API key ([Get one here](https://platform.deepseek.com))
- GNews API key ([Get one here](https://gnews.io/))

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd SmartNews
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Edit `.env.local` and add your API keys:**
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
STYLE=CEO  # or ENTHUSIAST
```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
SmartNews/
├── app/
│   ├── api/
│   │   └── news/
│   │       └── route.ts          # API endpoint for fetching/summarizing news
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage with news briefing
├── components/
│   ├── ui/                         # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── toggle.tsx
│   ├── news-card.tsx              # News article card component
│   └── style-toggle.tsx           # Reading mode toggle
├── lib/
│   ├── types.ts                   # TypeScript type definitions
│   ├── fetchNews.ts               # News fetching service
│   ├── summarize.ts               # AI summarization service
│   ├── styles.ts                  # Style prompts for CEO/Tech modes
│   └── utils.ts                   # Utility functions
└── Configuration files
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DEEPSEEK_API_KEY` | Your DeepSeek API key | Yes |
| `GNEWS_API_KEY` | Your GNews API key | Yes |
| `STYLE` | Default reading mode (CEO or ENTHUSIAST) | No |

### API Keys Setup

1. **DeepSeek API Key**:
   - Visit [DeepSeek Platform](https://platform.deepseek.com)
   - Create an account or sign in
   - Generate a new API key
   - Copy and paste into `.env.local`

2. **GNews API Key**:
   - Visit [GNews.io](https://gnews.io/)
   - Sign up for a free account
   - Get your API key from the dashboard
   - Copy and paste into `.env.local`

## 🎨 Reading Modes

### CEO Mode
- **Tone**: Strategic, concise, executive
- **Focus**: Business impact, risks, opportunities
- **Format**:
  - Headline
  - Why it matters
  - Strategic implication

### Tech Enthusiast Mode
- **Tone**: Curious, insightful, slightly informal
- **Focus**: How it works, why it's interesting, what builders should care about
- **Format**:
  - What happened
  - Why it's interesting
  - What this unlocks

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `GNEWS_API_KEY`
4. Deploy!

### Other Platforms

Deploy to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

**Important**: Make sure to add your environment variables in your hosting platform's settings.

## 🔒 Security Notes

- Never commit `.env.local` or `.env` files to Git
- Keep your API keys secure
- Use environment variables in production
- Consider using Vercel's environment variable encryption

## 🐛 Troubleshooting

### "No articles found"
- Check your GNews API key is correct
- Verify your API key has available quota
- Check browser console for errors

### "Failed to summarize"
- Verify your OpenAI API key is correct
- Check your OpenAI account has available credits
- Ensure the API key has proper permissions

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [DeepSeek API Documentation](https://platform.deepseek.com/docs)
- [GNews API Documentation](https://gnews.io/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Next.js, OpenAI, and modern web technologies
