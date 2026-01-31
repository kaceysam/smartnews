#!/bin/bash
# Script to update .env.local to use DeepSeek instead of OpenAI

echo "🔄 Updating .env.local to use DeepSeek..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found"
    exit 1
fi

# Read current OpenAI key (if exists)
CURRENT_KEY=$(grep "^OPENAI_API_KEY=" .env.local | cut -d '=' -f2-)

if [ -z "$CURRENT_KEY" ]; then
    echo "⚠️  No OPENAI_API_KEY found in .env.local"
    echo "Please add your DeepSeek API key manually:"
    echo "DEEPSEEK_API_KEY=your_deepseek_key_here"
else
    # Backup original file
    cp .env.local .env.local.backup
    echo "✅ Created backup: .env.local.backup"
    
    # Remove OPENAI_API_KEY line and add DEEPSEEK_API_KEY
    sed -i.bak '/^OPENAI_API_KEY=/d' .env.local
    echo "DEEPSEEK_API_KEY=$CURRENT_KEY" >> .env.local
    
    echo "✅ Updated .env.local to use DEEPSEEK_API_KEY"
    echo "💡 Note: If you want to use a different DeepSeek key, edit .env.local manually"
fi

echo ""
echo "📝 Current .env.local contents:"
cat .env.local | grep -E "(DEEPSEEK|GNEWS|STYLE)" | sed 's/=.*/=***/'
