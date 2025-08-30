# Whop Setup Checklist

Use this checklist to ensure your app works with real Whop authentication.

## ✅ Prerequisites

- [ ] Whop Developer Account created
- [ ] Firebase Project created
- [ ] GitHub repository with your code

## 🔧 Whop App Configuration

### 1. Whop Developer Dashboard
- [ ] Go to [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
- [ ] Create new app or edit existing app
- [ ] Set App Name: "Win Rewards" (or your preferred name)
- [ ] **CRITICAL**: Set App Path to `/` (not `/experiences/[experienceId]`)
- [ ] Set Discover Path to `/discover`
- [ ] Note your App ID, API Key, and Webhook Secret

### 2. Get Your Credentials
- [ ] Copy App ID from Whop dashboard
- [ ] Copy API Key from Whop dashboard  
- [ ] Copy Webhook Secret from Whop dashboard
- [ ] Get Company ID from your Whop company settings

## 🚀 Deployment

### 1. Deploy to Vercel
- [ ] Push code to GitHub
- [ ] Go to [Vercel](https://vercel.com/new)
- [ ] Import your GitHub repository
- [ ] Deploy the app
- [ ] Note your deployment URL (e.g., `https://your-app.vercel.app`)

### 2. Configure Environment Variables
- [ ] Go to Vercel project settings
- [ ] Add all Whop environment variables:
  - [ ] `NEXT_PUBLIC_WHOP_APP_ID`
  - [ ] `WHOP_API_KEY`
  - [ ] `NEXT_PUBLIC_WHOP_AGENT_USER_ID`
  - [ ] `NEXT_PUBLIC_WHOP_COMPANY_ID`
  - [ ] `WHOP_WEBHOOK_SECRET`
- [ ] Add all Firebase environment variables:
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

### 3. Update Whop Settings
- [ ] Go back to Whop Developer Dashboard
- [ ] Update Base URL to your Vercel deployment URL
- [ ] Update Webhook URL to `https://your-app.vercel.app/api/webhooks`
- [ ] Save the changes

### 4. Redeploy
- [ ] Redeploy your app in Vercel after adding environment variables

## 🧪 Testing

### 1. Test in Whop
- [ ] Go to your Whop company dashboard
- [ ] Find your app in experiences section
- [ ] Click to access the app
- [ ] Verify automatic authentication
- [ ] Test win submission functionality
- [ ] Check leaderboard and other features

### 2. Expected Results
- [ ] ✅ No "Authentication Required" message
- [ ] ✅ User automatically logged in
- [ ] ✅ Real user data displayed
- [ ] ✅ All app features working
- [ ] ✅ No development mode needed

## 🔍 Troubleshooting

If you see "Authentication Required":
- [ ] Check App Path is set to `/` in Whop dashboard
- [ ] Verify all environment variables in Vercel
- [ ] Check Vercel deployment logs for errors
- [ ] Ensure app is added to your Whop company

## 🎯 Success!

When everything works:
- Users access your app through Whop
- Automatic authentication with real user data
- Full win submission and rewards system
- No development mode or authentication errors

Your app is now fully functional with real Whop authentication! 🎉
