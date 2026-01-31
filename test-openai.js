// Quick test script to verify OpenAI API key
require('dotenv').config({ path: '.env.local' });

const OpenAI = require('openai');

async function testOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY not found in .env.local');
    process.exit(1);
  }
  
  console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');
  
  if (!apiKey.startsWith('sk-')) {
    console.warn('⚠️  Warning: API key format may be incorrect (should start with sk-)');
  }
  
  try {
    const openai = new OpenAI({ apiKey });
    
    console.log('🔄 Testing API connection...');
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say "Hello, API is working!"' }
      ],
      max_tokens: 20,
    });
    
    const response = completion.choices[0]?.message?.content;
    console.log('✅ API Response:', response);
    console.log('✅ OpenAI API is working correctly!');
    
  } catch (error) {
    console.error('❌ OpenAI API Error:');
    console.error('Message:', error.message);
    
    if (error.status) {
      console.error('Status:', error.status);
    }
    
    if (error.response) {
      console.error('Response:', error.response);
    }
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('\n💡 This usually means:');
      console.error('   - API key is invalid or expired');
      console.error('   - API key doesn\'t have proper permissions');
      console.error('   - Check your OpenAI account at https://platform.openai.com');
    }
    
    if (error.message.includes('429') || error.message.includes('rate limit')) {
      console.error('\n💡 This usually means:');
      console.error('   - You\'ve hit the rate limit');
      console.error('   - Wait a few minutes and try again');
      console.error('   - Check your usage at https://platform.openai.com/usage');
    }
    
    process.exit(1);
  }
}

testOpenAI();
