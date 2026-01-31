// Quick test script to verify DeepSeek API key
require('dotenv').config({ path: '.env.local' });

const OpenAI = require('openai');

async function testDeepSeek() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    console.error('❌ DEEPSEEK_API_KEY not found in .env.local');
    console.error('💡 Please add DEEPSEEK_API_KEY to your .env.local file');
    console.error('   Get your API key from: https://platform.deepseek.com');
    process.exit(1);
  }
  
  console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');
  
  try {
    const deepseek = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.deepseek.com',
    });
    
    console.log('🔄 Testing DeepSeek API connection...');
    
    const completion = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say "Hello, DeepSeek API is working!"' }
      ],
      max_tokens: 20,
    });
    
    const response = completion.choices[0]?.message?.content;
    console.log('✅ API Response:', response);
    console.log('✅ DeepSeek API is working correctly!');
    
  } catch (error) {
    console.error('❌ DeepSeek API Error:');
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
      console.error('   - Check your DeepSeek account at https://platform.deepseek.com');
    }
    
    if (error.message.includes('429') || error.message.includes('rate limit')) {
      console.error('\n💡 This usually means:');
      console.error('   - You\'ve hit the rate limit');
      console.error('   - Wait a few minutes and try again');
      console.error('   - Check your usage at https://platform.deepseek.com');
    }
    
    process.exit(1);
  }
}

testDeepSeek();
