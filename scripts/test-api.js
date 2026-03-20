const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.error('[v0] ERROR: GROQ_API_KEY environment variable is not set');
  process.exit(1);
}

async function testGroqAPI() {
  console.log('[v0] Starting Groq API Test...');
  
  try {
    // Test direct Groq API call
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'user',
            content: 'Test startup idea: An AI-powered meal planning app. Give brief feedback in 2 sentences.',
          },
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[v0] Groq API Error Response:', error);
      return false;
    }

    const data = await response.json();
    console.log('[v0] Groq API Success!');
    console.log('[v0] Response:', data.choices[0].message.content);
    return true;
  } catch (error) {
    console.error('[v0] Groq API Test Failed:', error.message);
    return false;
  }
}

async function testLocalAPIRoute() {
  console.log('\n[v0] Testing Local API Route...');
  
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [],
        userMessage: 'Test: AI-powered fitness app that uses computer vision. Brief 2 sentence feedback.',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[v0] API Route Error:', error);
      return false;
    }

    // Handle streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullContent += decoder.decode(value);
    }

    console.log('[v0] API Route Success!');
    console.log('[v0] Streamed Response:', fullContent.substring(0, 200) + '...');
    return true;
  } catch (error) {
    console.error('[v0] API Route Test Failed:', error.message);
    console.error('[v0] Make sure the dev server is running on http://localhost:3000');
    return false;
  }
}

async function runTests() {
  console.log('========================================');
  console.log('Startup Idea AI - Test Suite');
  console.log('========================================\n');

  const groqTest = await testGroqAPI();
  const routeTest = await testLocalAPIRoute();

  console.log('\n========================================');
  console.log('Test Results:');
  console.log(`  Groq API: ${groqTest ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  Local API Route: ${routeTest ? '✓ PASS' : '✗ FAIL'}`);
  console.log('========================================\n');

  if (groqTest && routeTest) {
    console.log('[v0] All tests passed! Chatbot should be working.');
  } else {
    console.log('[v0] Some tests failed. Check the errors above.');
  }
}

runTests().catch(console.error);
