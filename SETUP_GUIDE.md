# Whop App Setup Guide

This guide will help you set up your Whop app to work properly for customers who want to post their wins for money.

## 🚀 Quick Start Checklist

- [ ] Set up Whop Developer Account
- [ ] Create Firebase Project
- [ ] Configure Environment Variables
- [ ] Deploy to Vercel
- [ ] Configure Whop App Settings
- [ ] Test the Integration

## 📋 Step-by-Step Setup

### 1. Whop Developer Setup

1. **Create Whop Developer Account**
   - Go to [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
   - Sign up for a developer account
   - Create a new app

2. **Configure Your App**
   - Set **App Name**: "Win Rewards" (or your preferred name)
   - Set **Base URL**: Your deployment URL (e.g., `https://your-app.vercel.app`)
   - **IMPORTANT**: Set **App Path** to `/` (not `/experiences/[experienceId]`)
   - Set **Discover Path**: `/discover`
   - Set **Webhook URL**: `https://your-app.vercel.app/api/webhooks`

3. **Get Your Credentials**
   - Copy your **App ID** from the dashboard
   - Copy your **API Key** from the dashboard
   - Copy your **Webhook Secret** from the dashboard
   - Note your **Company ID** (found in your company settings)

### 2. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Name your project (e.g., "whop-win-rewards")
   - Enable Google Analytics (optional)

2. **Enable Firestore Database**
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" for now
   - Select a location close to your users

3. **Get Firebase Config**
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Click the web icon (</>) to add a web app
   - Register your app and copy the config

4. **Set Up Security Rules**
   - Go to Firestore Database > Rules
   - Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if true;
    }
    
    // Wins are readable by all, writable by authenticated users
    match /wins/{winId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Bounties are readable by all, writable by authenticated users
    match /bounties/{bountyId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### 3. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

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

**Important Notes:**
- Replace all `your_*_here` values with your actual credentials
- For `NEXT_PUBLIC_WHOP_AGENT_USER_ID`, you can use your own Whop user ID or create a dedicated agent user
- Keep your `.env.local` file secure and never commit it to version control

### 4. Local Development

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   pnpm dev
   ```

3. **Test Locally**
   - Open `http://localhost:3000`
   - You should see the app with authentication required message
   - The app will work properly once deployed and accessed through Whop

### 5. Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Add all environment variables from your `.env.local` file
   - Deploy

3. **Get Your Deployment URL**
   - Note your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

### 6. Configure Whop App Settings

1. **Update Whop Dashboard**
   - Go back to your Whop Developer Dashboard
   - Update the **Base URL** to your Vercel deployment URL
   - **CRITICAL**: Make sure **App Path** is set to `/` (not `/experiences/[experienceId]`)
   - Update the **Webhook URL** to `https://your-app.vercel.app/api/webhooks`

2. **Test the Integration**
   - Go to your Whop company dashboard
   - Add the app to your company
   - Test the integration by accessing it through Whop

### 7. Create Your First Experience

1. **Access Through Whop**
   - Go to your Whop company dashboard
   - Find your app in the experiences section
   - Click to access it

2. **Test User Flow**
   - Users should be automatically authenticated
   - They should be able to submit wins
   - They should see the leaderboard and other features

## 🔧 Troubleshooting

### Common Issues

**App showing "Experience Access" page instead of your app?**
- **SOLUTION**: Make sure your Whop app's "App Path" is set to `/` (not `/experiences/[experienceId]`)
- This is the most common issue that causes the experience management page to show

**App not loading in Whop?**
- Check that your Base URL is correct in Whop dashboard
- Ensure all environment variables are set in Vercel
- Check Vercel deployment logs for errors

**Authentication not working?**
- Verify Whop API keys are correct
- Check Firebase configuration
- Ensure webhook secret is set correctly

**Database errors?**
- Verify Firebase project ID and API keys
- Check Firestore security rules
- Ensure Firestore is enabled

**Webhooks not working?**
- Verify webhook URL is correct
- Check webhook secret in environment variables
- Ensure webhook endpoint is accessible

### Debug Steps

1. **Check Browser Console**
   - Open developer tools
   - Look for any JavaScript errors
   - Check network requests

2. **Check Vercel Logs**
   - Go to your Vercel dashboard
   - Check function logs for API errors

3. **Check Firebase Console**
   - Go to Firebase console
   - Check Firestore for data
   - Look for any permission errors

## 🎯 How It Works

### User Flow
1. User accesses app through Whop
2. Whop provides authentication token
3. App validates token and creates/updates user
4. User can submit wins and earn points
5. Points can be converted to rewards

### Win Submission Process
1. User fills out win submission form
2. Win is stored in Firebase with "pending" status
3. Admin can review and approve/reject wins
4. Approved wins award points to user
5. Points contribute to leaderboard ranking

### Reward System
- Users earn points for approved wins
- Points can be converted to monetary rewards
- Leaderboard shows top performers
- Badge system provides additional motivation

## 📞 Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review Whop developer documentation
3. Check Firebase console for errors
4. Review browser console for client-side errors

## 🚀 Next Steps

Once your app is working:
1. Customize the UI and branding
2. Set up reward payout system
3. Configure admin review process
4. Add more features like challenges or competitions
5. Promote your app to your Whop community

Your app is now ready to help customers post their wins for money! 🎉
