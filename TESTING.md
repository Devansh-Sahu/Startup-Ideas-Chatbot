# Startup Idea AI - Testing & Debugging Guide

## Overview
This guide helps you test the chatbot API and validate the complete system.

## Theme Updates
✓ Professional metallic black background (#0a0a0a)
✓ Off-white text (#f5f5f5)
✓ Metallic accents: Amber (#c0a080) and Gold (#d4af37)
✓ Futuristic fonts: Space Grotesk (headings) and JetBrains Mono (code)
✓ Glassmorphism effects with metallic borders
✓ Backdrop blur effects throughout

## Bug Fixes Applied
✓ API Route: Changed from `generateText` to `streamText`
✓ Model: Updated from `mixtral-8x7b-32768` (v1) to `llama-3.1-70b-versatile` (v2)
✓ Response Handling: Implemented proper streaming response parsing
✓ Error Handling: Added comprehensive error logging
✓ Chat Page: Updated to handle streaming content chunks

## Prerequisites
1. Ensure `GROQ_API_KEY` is set in your environment variables
2. Node.js 18+ installed
3. Next.js dev server running

## Testing Steps

### 1. Check Environment
```bash
echo $GROQ_API_KEY
# Should output your Groq API key (don't share publicly)
```

### 2. Start Development Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

### 3. Test Direct Groq API (Optional)
```bash
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-70b-versatile",
    "messages": [{"role": "user", "content": "Test"}],
    "max_tokens": 100
  }'
```

### 4. Test Local API Route
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [],
    "userMessage": "I have an idea for an AI-powered fitness app. Give me 2 sentences of feedback."
  }'
```

### 5. Test Full Chatbot UI
1. Navigate to http://localhost:3000
2. Click "Start Your Journey" or select an idea chip
3. Type a startup idea in the chat input
4. Verify:
   - Message appears immediately (user side)
   - Loading animation shows
   - AI response streams in
   - Formatting is correct
   - No "Sorry, I encountered an error" message

## Expected Behavior

### API Response
- Status: 200 OK
- Response type: Text stream (Content-Type: text/event-stream)
- Content: Structured startup feedback with sections:
  - Idea Summary
  - Market Potential
  - Target Users
  - Problem Solved
  - Solution Approach
  - Revenue Model
  - Competitive Landscape
  - Key Challenges
  - Go-to-Market Strategy
  - Next Steps

### Chat UI
- Messages slide in smoothly
- User messages appear in amber/gold gradient
- AI messages appear in gray with metallic borders
- Glassmorphism effect visible on all components
- Metallic scrollbar
- No console errors

## Common Issues & Solutions

### Issue: "GROQ_API_KEY is not set"
**Solution:** 
- Check Vercel project settings > Vars
- Ensure the key is added correctly
- Restart development server after adding env var

### Issue: "Unsupported model version"
**Solution:** Already fixed! Model changed to `llama-3.1-70b-versatile` which supports v2 spec.

### Issue: "Failed to get response"
**Solution:**
1. Check browser console for actual error
2. Check server logs for API errors
3. Verify Groq API key is valid
4. Ensure network request completes

### Issue: Empty or incomplete responses
**Solution:**
- Increase maxTokens in API route (currently 1500)
- Check that streaming is working (reader.read() loop)
- Verify response.body is not null

## Debugging

### Enable Debug Logging
The app includes `[v0]` prefixed logs for debugging:
- `[v0] API Error:` - API route errors
- `[v0] Error:` - Chat page errors
- Check browser DevTools Console and Terminal

### Check Response Streaming
Add this to `/app/chat/page.tsx` to debug streaming:
```javascript
console.log('[v0] Chunk received:', chunk);
```

## Performance Notes
- Streaming provides real-time feedback
- Messages appear instantly for users
- AI response appears progressively
- Glassmorphism effects are GPU-accelerated
- Animations run at 60fps

## Success Criteria
✓ App loads without errors
✓ Chatbot responds to user input
✓ AI feedback appears with proper formatting
✓ No error messages in console
✓ Metallic theme displays correctly
✓ All animations smooth (60fps)

## Support
If tests fail:
1. Check all error logs above
2. Verify GROQ_API_KEY is set
3. Confirm dev server is running
4. Review API route implementation
5. Check browser network tab for failed requests
