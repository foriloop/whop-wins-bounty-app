# Whop App Deployment Guide

This guide will help you deploy your app to Vercel and configure it properly with Whop authentication.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Code

```bash
# Add all changes to git
git add .

# Commit the changes
git commit -m "Fix Whop integration and add development mode"

# Push to GitHub
git push origin main
```

### 2. Deploy to Vercel

1. **Go to [Vercel](https://vercel.com/new)**
2. **Import your GitHub repository**
3. **Configure the project:**
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `pnpm build` (or leave default)
   - Output Directory: `.next` (or leave default)

### 3. Add Environment Variables

In your Vercel project settings, add these environment variables:

```bash
# Whop Configuration
NEXT_PUBLIC_WHOP_APP_ID=your_whop_app_id_here
WHOP_API_KEY=your_whop_api_key_here
NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_whop_agent_user_id_here
NEXT_PUBLIC_WHOP_COMPANY_ID=your_whop_company_id_here
WHOP_WEBHOOK_SECRET=your_whop_webhook_secret_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
```

### 4. Deploy

Click "Deploy" and wait for the build to complete. Note your deployment URL (e.g., `https://your-app.vercel.app`).

## 🔧 Configure Whop App Settings

### 1. Update Whop Developer Dashboard

1. **Go to [Whop Developer Dashboard](https://whop.com/dashboard/developer/)**
2. **Find your app and click "Edit"**
3. **Update these settings:**

   ```
   App Name: Win Rewards (or your preferred name)
   Base URL: https://your-app.vercel.app
   App Path: /
   Discover Path: /discover
   Webhook URL: https://your-app.vercel.app/api/webhooks
   ```

### 2. Get Your Credentials

From your Whop app dashboard, copy:
- **App ID**
- **API Key**
- **Webhook Secret**
- **Company ID** (from your company settings)

### 3. Update Environment Variables

Go back to Vercel and update the environment variables with your actual credentials.

### 4. Redeploy

After updating environment variables, redeploy your app in Vercel.

## 🧪 Test the Integration

### 1. Access Through Whop

1. **Go to your Whop company dashboard**
2. **Find your app in the experiences section**
3. **Click to access it**

### 2. Expected Behavior

- ✅ Users should be automatically authenticated
- ✅ No "Authentication Required" message
- ✅ Full access to all app features
- ✅ Real user data from Whop

## 🔍 Troubleshooting

### Common Issues

**Still seeing "Authentication Required"?**
- Check that App Path is set to `/` (not `/experiences/[experienceId]`)
- Verify all environment variables are set in Vercel
- Make sure your Whop app is added to your company

**App not loading in Whop?**
- Check Vercel deployment logs for errors
- Verify Base URL is correct in Whop dashboard
- Ensure webhook URL is accessible

**Authentication errors?**
- Verify Whop API keys are correct
- Check Firebase configuration
- Ensure webhook secret is set

### Debug Steps

1. **Check Vercel Logs**
   - Go to your Vercel dashboard
   - Check function logs for API errors

2. **Check Browser Console**
   - Open developer tools in Whop
   - Look for JavaScript errors

3. **Verify Environment Variables**
   - Make sure all variables are set in Vercel
   - Check for typos in values

## 🎯 Success Indicators

When working correctly, you should see:
- ✅ Automatic authentication when accessing through Whop
- ✅ Real user data (username, points, etc.)
- ✅ Full app functionality without development mode
- ✅ No authentication errors or warnings

## 📞 Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review Whop developer documentation
3. Check Vercel deployment logs
4. Verify all environment variables are set correctly

Your app should now work perfectly with real Whop authentication! 🎉
