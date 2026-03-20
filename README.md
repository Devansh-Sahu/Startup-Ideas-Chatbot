# Startup Idea AI - Professional Chatbot

## Overview
An AI-powered startup mentor chatbot with a professional metallic black interface and futuristic design. Get instant feedback on your startup ideas with intelligent, structured analysis.

## Features
- ✨ **Real-time Streaming:** AI responses appear progressively as they're generated
- 🎨 **Professional Metallic Theme:** Dark background with golden accents and glassmorphism
- 📱 **Responsive Design:** Works seamlessly on desktop and mobile
- 🚀 **Fast API:** Powered by Groq's LLaMA model for rapid inference
- 💬 **Structured Feedback:** Ideas analyzed across market, competition, revenue, and strategy
- ✅ **Production Ready:** Error handling, logging, and comprehensive testing

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variable
Add to your `.env.local`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Get your key from: https://console.groq.com

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to http://localhost:3000

## Theme
- **Background:** Professional metallic black (#0a0a0a)
- **Text:** Off-white (#f5f5f5)
- **Accents:** Metallic bronze (#c0a080) and gold (#d4af37)
- **Typography:** Space Grotesk (UI) + JetBrains Mono (code)
- **Effects:** Glassmorphism with backdrop blur

## How to Use

1. **On Homepage:**
   - Click "Start Your Journey" to begin
   - Or select one of the example idea chips

2. **In Chat:**
   - Type your startup idea
   - Watch as the AI analyzes it in real-time
   - Get structured feedback with:
     - Market Analysis
     - Target Audience
     - Problem Statement
     - Solution Approach
     - Revenue Models
     - Competitive Analysis
     - Key Challenges
     - Go-to-Market Strategy

## File Structure
```
/app
  ├── page.tsx                 # Landing page
  ├── chat/page.tsx           # Chat interface
  ├── api/chat/route.ts       # AI API endpoint
  ├── layout.tsx              # App layout with fonts
  └── globals.css             # Global styles & theme

/components
  ├── animated-button.tsx     # Metallic button component
  ├── message-bubble.tsx      # Chat message component
  ├── idea-chip.tsx          # Idea suggestion component
  ├── animated-background.tsx # Background effects
  ├── formatted-response.tsx   # Response formatter
  └── ... other components

/scripts
  └── test-api.js            # API testing script
```

## API Endpoint

### POST `/api/chat`
Sends a message to the AI chatbot.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ],
  "userMessage": "New startup idea to analyze"
}
```

**Response:**
Streaming text response with structured feedback (Server-Sent Events)

**Error Response:**
```json
{
  "error": "Error description"
}
```

## Testing

### Run Test Suite
```bash
node scripts/test-api.js
```

This tests:
- ✓ Groq API connectivity
- ✓ Local API route functionality
- ✓ Streaming response handling

See `/TESTING.md` for detailed testing guide.

## Debugging

### Check Logs
Open browser DevTools (F12) and look for `[v0]` prefixed logs:
- `[v0] API Route Called` - Request received
- `[v0] Calling Groq API` - API call initiated
- `[v0] Chunk received` - Response streaming
- `[v0] Error` - Any errors encountered

### Common Issues

**"GROQ_API_KEY is not set"**
- Add key to environment variables
- Restart dev server

**"Failed to get response"**
- Check Groq API key is valid
- Verify internet connection
- Check browser console for details

**No response appears**
- Check that dev server is running
- Verify `/api/chat` endpoint is accessible
- Check network tab in DevTools

## Configuration

### Model
Currently using: `llama-3.1-70b-versatile` (Fast, accurate)

To change, edit `/app/api/chat/route.ts`:
```typescript
model: groq('llama-3.1-70b-versatile'), // Change this
```

### Max Tokens
Default: 1500 tokens per response

To change, edit `/app/api/chat/route.ts`:
```typescript
maxTokens: 1500, // Increase for longer responses
```

### System Prompt
Edit the `systemPrompt` in `/app/api/chat/route.ts` to customize AI behavior.

## Deployment

### Deploy to Vercel
```bash
vercel deploy
```

Make sure to:
1. Add `GROQ_API_KEY` in Vercel Project Settings > Environment Variables
2. Set the value to your Groq API key

## Production Checklist
- ✓ API error handling
- ✓ Streaming response support
- ✓ Real-time message updates
- ✓ Comprehensive logging
- ✓ Professional UI/UX
- ✓ Mobile responsive
- ✓ WCAG accessibility standards

## Technologies Used
- **Framework:** Next.js 16
- **Styling:** Tailwind CSS v4
- **AI/LLM:** Groq + AI SDK 6
- **Animations:** Framer Motion
- **State:** React Hooks
- **Fonts:** Google Fonts (Space Grotesk, JetBrains Mono)

## Support & Troubleshooting
See `/TESTING.md` for comprehensive testing guide.
See `/CHANGES.md` for detailed implementation notes.

## License
MIT

## Author
Built with v0 by Vercel
