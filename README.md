# Whop NextJS App Template - Functional Version

This is a fully functional Whop app template built with Next.js, featuring user authentication, win submissions, leaderboards, and bounty systems. The app is now ready for production use on Whop.

## 🚀 Quick Start

1. **Setup Environment**
   ```bash
   pnpm setup
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Credentials**
   - Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
   - Update `.env.local` with your Whop and Firebase credentials

4. **Run Development Server**
   ```bash
   pnpm dev
   ```

5. **Deploy to Vercel**
   - Push to GitHub
   - Deploy on Vercel with environment variables
   - Configure Whop app settings

## 🎯 What This App Does

This app allows your Whop customers to:
- **Submit Wins**: Share their achievements with proof
- **Earn Points**: Get rewarded for their accomplishments
- **Compete**: See their ranking on the leaderboard
- **Get Rewarded**: Convert points to monetary rewards

Perfect for communities that want to incentivize and reward member achievements!

## 🛠️ Features

- **Whop Integration**: Full authentication and user management through Whop
- **User Dashboard**: Personalized dashboard with stats and recent activity
- **Win Submissions**: Users can submit achievements with proof and categories
- **Leaderboard System**: Track user rankings and points
- **Bounty System**: Create and manage challenges with rewards
- **Real-time Data**: Firebase integration for data persistence
- **Modern UI**: Built with Tailwind CSS and FrostedUI design principles
- **Responsive Design**: Works on all devices

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Whop Developer Account
- Firebase Project
- Git

## 🔧 Setup Instructions

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

### Quick Setup Checklist

- [ ] Run `pnpm setup` to create environment file
- [ ] Get Whop credentials from [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
- [ ] Get Firebase credentials from [Firebase Console](https://console.firebase.google.com/)
- [ ] Update `.env.local` with your credentials
- [ ] Deploy to Vercel
- [ ] Configure Whop app settings
- [ ] Test the integration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Add all environment variables from `.env.local`
5. Deploy

### Update Whop Settings

After deployment, update your Whop app settings:
- Update Base URL to your Vercel domain
- Update webhook URL to `https://yourapp.vercel.app/api/webhooks`

## 🔐 Authentication Flow

1. User visits app through Whop
2. Whop provides access token
3. App validates token with Whop API
4. User data is stored/updated in Firebase
5. Session is maintained locally
6. Protected routes check authentication status

## 📊 Data Models

### User
- `userId`: Unique identifier
- `username`: Display name
- `role`: User role (creator/member)
- `points`: Accumulated points
- `badge`: Achievement tier
- `createdAt/updatedAt`: Timestamps

### Win Submission
- `id`: Unique identifier
- `userId`: Submitter ID
- `title/description`: Win details
- `category`: Achievement category
- `status`: Approval status
- `createdAt/updatedAt`: Timestamps

### Bounty
- `id`: Unique identifier
- `title/description`: Challenge details
- `rewardPoints`: Point reward
- `rewardUsd`: USD reward (optional)
- `status`: Active/archived
- `createdByUserId`: Creator ID

## 🎨 Customization

### Colors
The app uses Whop's brand color `#1754d8` for primary elements. You can customize this in:
- `tailwind.config.ts`
- Component files
- CSS variables

### Styling
- Built with Tailwind CSS
- Follows FrostedUI design principles
- Responsive design for all screen sizes

## 🐛 Troubleshooting

### Common Issues

**App not loading properly?**
- Ensure "App path" is set to `/experiences/[experienceId]` in Whop dashboard
- Check that all environment variables are set correctly

**Authentication not working?**
- Verify Whop API keys are correct
- Check Firebase configuration
- Ensure webhook secret is set

**Database errors?**
- Verify Firebase project ID and API keys
- Check Firestore security rules
- Ensure Firestore is enabled

**Webhooks not working?**
- Verify webhook URL is correct
- Check webhook secret in environment variables
- Ensure webhook endpoint is accessible

### Debug Mode

Enable debug logging by adding to your environment:
```bash
DEBUG=whop:*
```

## 📚 Additional Resources

- [Whop Developer Documentation](https://dev.whop.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Whop developer documentation
3. Check Firebase console for errors
4. Review browser console for client-side errors

## 📄 License

This template is provided as-is for Whop app development. Customize and use according to your needs.
