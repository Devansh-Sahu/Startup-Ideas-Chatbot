# Quick Test Guide - Startup Idea AI

## 🚀 Fast Track to Verification

### 1. Start the App (30 seconds)
```bash
npm run dev
```
✅ Opens on http://localhost:3000

### 2. Test Landing Page (1 minute)
- Navigate to http://localhost:3000
- Look for:
  - Black background with amber glows
  - Off-white text
  - Glassmorphic components
  - Space Grotesk futuristic font
- Click "Start Your Journey" button

### 3. Test Chat (2 minutes)
1. Type in chat: "An AI-powered fitness app using computer vision"
2. Watch as:
   - User message appears in amber gradient
   - Loading animation shows
   - AI response streams in real-time
   - Content formats with sections
3. Send another message to test conversation history

### 4. Check Console (1 minute)
Press F12 → Console tab, look for:
```
[v0] API Route Called - User Message: ...
[v0] Building conversation history with...
[v0] Calling Groq API with streamText...
[v0] Stream initiated, returning response
```

✅ All logs present = API is working!

---

## 🧪 Full Test Suite

### Run Automated Tests
```bash
node scripts/test-api.js
```

Expected output:
```
========================================
Startup Idea AI - Test Suite
========================================

[v0] Starting Groq API Test...
[v0] Groq API Success!
[v0] Response: [Your response here]

[v0] Testing Local API Route...
[v0] API Route Success!
[v0] Streamed Response: [Response preview]

========================================
Test Results:
  Groq API: ✓ PASS
  Local API Route: ✓ PASS
========================================
```

---

## 🔍 Manual API Test (Using cURL)

### Test Local API Route
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [],
    "userMessage": "Quick test: AI-powered scheduling app idea"
  }'
```

Expected: Text streams back without errors

---

## ❌ Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "GROQ_API_KEY is not set" | Check env vars in Vercel settings, restart server |
| "Failed to get response" | Check console for [v0] logs, verify API key valid |
| Empty or slow response | Check Groq API status, verify network connection |
| No metallic theme visible | Clear browser cache (Ctrl+Shift+Delete) |
| Font looks wrong | Browser doesn't have Space Grotesk cached, refresh page |
| Errors in console | Check /TESTING.md for detailed troubleshooting |

---

## ✅ Success Checklist

After running tests, you should see:

- [ ] App loads on http://localhost:3000
- [ ] Metallic black theme visible
- [ ] No console errors
- [ ] [v0] logs in console
- [ ] Chat message sends successfully
- [ ] AI response appears and streams
- [ ] Test suite passes (or manual curl works)
- [ ] No "Failed to get response" errors

If all checked ✅ → **You're good to go!**

---

## 📊 Theme Verification

Visual checklist - Open http://localhost:3000 and verify:

```
Background:     Pure black ✓
Text:           Off-white/light gray ✓
Buttons:        Golden amber gradient ✓
Borders:        Metallic gold/bronze ✓
Glassmorphism:  Visible blur effects ✓
Font:           Space Grotesk (futuristic) ✓
Scrollbar:      Metallic bronze ✓
```

---

## 🎯 What Each Component Should Look Like

### Landing Page
- Black background with subtle golden orbs
- Large futuristic heading
- "Start Your Journey" button with shimmer effect
- Example idea chips with hover glow

### Chat Page
- Clean chat interface
- User messages: Amber/gold gradient boxes
- AI messages: Gray semi-transparent boxes
- Both with metallic borders
- Smooth streaming animation

### Messages
- User: Right-aligned, golden gradient
- AI: Left-aligned, dark semi-transparent
- Both with backdrop blur visible

---

## 🚀 Deployment Ready?

Once all tests pass:

1. ✅ App works locally
2. ✅ Theme looks professional
3. ✅ API responds correctly
4. ✅ No errors in console

Ready to deploy! See /DEPLOYMENT.md for next steps.

---

## 📱 Mobile Testing

Test on phone/tablet:
- [ ] Responsive layout works
- [ ] Messages display properly
- [ ] Can still send/receive
- [ ] Touch interactions smooth
- [ ] Theme looks good

---

## 💡 Pro Tips

**View Real API Calls:**
Open DevTools → Network tab → Filter by "chat"
See the request/response in real-time

**Debug Streaming:**
In Console: Right-click → Store as global variable
Examine the response object

**Profile Performance:**
DevTools → Performance tab → Record → Chat → Stop
Check 60fps animation performance

---

## 📞 Still Having Issues?

1. Check `/TESTING.md` for detailed troubleshooting
2. Review `/CHANGES.md` for what was fixed
3. Read `/README.md` for full documentation
4. Run `node scripts/test-api.js` for automated diagnostics

---

## ✨ Summary

This quick test takes ~5 minutes and verifies:
- ✅ App loads and displays correctly
- ✅ Metallic theme applied
- ✅ Chatbot sends/receives messages
- ✅ AI API works properly
- ✅ No critical errors

**That's it! Your Startup Idea AI is ready to use.** 🎉
