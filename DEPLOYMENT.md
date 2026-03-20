# Deployment Checklist - Startup Idea AI

## Pre-Deployment Verification

### 1. Local Testing
- [ ] Run `npm run dev`
- [ ] Navigate to http://localhost:3000
- [ ] Click through landing page
- [ ] Test chat with multiple ideas
- [ ] Verify no console errors (F12)
- [ ] Check all API responses stream correctly
- [ ] Verify metallic theme displays properly

### 2. Test API Directly
```bash
node scripts/test-api.js
```
- [ ] Both tests pass (Groq API and Local API)
- [ ] Responses contain expected structure

### 3. Build Locally
```bash
npm run build
npm run start
```
- [ ] Build completes without errors
- [ ] App runs on production server
- [ ] Test chat functionality works

## Environment Variables Required

Before deploying to Vercel, ensure these are set in your project:

### Required Variables
- `GROQ_API_KEY` - Your Groq API key from https://console.groq.com

### Steps to Add:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add:
   - Key: `GROQ_API_KEY`
   - Value: Your actual API key
5. Click Save
6. Redeploy

## Deployment Steps

### Option 1: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

### Option 2: Deploy via GitHub
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel
4. Deploy automatically on push

### Option 3: Deploy via Vercel Dashboard
1. Go to vercel.com
2. Click "New Project"
3. Import repository
4. Set environment variables
5. Click Deploy

## Post-Deployment Verification

### 1. Check Deployment Status
- [ ] Vercel shows "Ready"
- [ ] Deployment URL is live
- [ ] No build errors in logs

### 2. Test Live App
- [ ] Navigate to your deployment URL
- [ ] Test landing page loads
- [ ] Test chat functionality
- [ ] Verify responses stream correctly
- [ ] Check theme displays properly
- [ ] Test on mobile device

### 3. Monitor Logs
- [ ] Check Vercel Function Logs for errors
- [ ] No API errors appearing
- [ ] All requests completing successfully

### 4. Performance Check
- [ ] Page loads in < 3 seconds
- [ ] Chat responses appear within 5 seconds
- [ ] No timeout errors

## Troubleshooting Deployments

### Issue: "GROQ_API_KEY is not set"
**Solution:**
1. Go to Vercel Project Settings
2. Click "Environment Variables"
3. Add `GROQ_API_KEY` with your actual key
4. Redeploy using "Redeploy" button

### Issue: Build Fails with Dependencies
**Solution:**
1. Clear node_modules: `rm -rf node_modules`
2. Install fresh: `npm install`
3. Try building again: `npm run build`
4. If still fails, check package.json for conflicts

### Issue: API Returns 500 Errors
**Solution:**
1. Check Vercel Function Logs
2. Verify GROQ_API_KEY is set correctly
3. Check that API key hasn't expired
4. Try regenerating API key from Groq console

### Issue: Responses Don't Stream
**Solution:**
1. Check that response includes `Content-Type: text/event-stream`
2. Verify `result.toAIStreamResponse()` is being called
3. Check browser Network tab for successful response
4. Look for errors in Function Logs

## Monitoring & Maintenance

### Weekly Checks
- [ ] Review Vercel Analytics
- [ ] Check Function Logs for errors
- [ ] Monitor response times
- [ ] Verify Groq API quota usage

### Important Notes
- Groq API has rate limits (check documentation)
- Monitor your API usage to avoid charges
- Keep GROQ_API_KEY secret - never commit to Git
- Use environment variables for all sensitive data

## Rollback Procedure

If deployment has issues:
1. Go to Vercel Deployments
2. Find the last working deployment
3. Click "Redeploy"
4. Verify it works before keeping it

## Success Indicators

✓ App loads without errors
✓ All pages render with metallic theme
✓ Chat sends messages successfully
✓ AI responds within 5-10 seconds
✓ Responses contain proper formatting
✓ No 500 errors in Function Logs
✓ Performance is good (<3s page load)
✓ Mobile responsive layout works

## Production Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3s
- **API Response Time:** < 10s (for full response)
- **Chat Message Round-trip:** < 5s

## Support & Issues

If you encounter issues after deployment:

1. Check Vercel Function Logs
2. Verify environment variables are set
3. Test API endpoint directly with curl
4. Check browser console for errors
5. Review `/TESTING.md` for troubleshooting
6. Review `/CHANGES.md` for implementation details

## Final Checklist
- [ ] All environment variables set
- [ ] Local testing passed
- [ ] Build successful
- [ ] Deployment successful
- [ ] Live testing passed
- [ ] Monitor logs for 24 hours
- [ ] All systems operational

**Ready for production! 🚀**
